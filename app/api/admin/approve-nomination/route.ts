import { NextRequest, NextResponse } from "next/server"
import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore, FieldValue } from "firebase-admin/firestore"

let adminDb: any = null

try {
  const serviceAccountEnv = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON
  const serviceAccount = serviceAccountEnv ? JSON.parse(serviceAccountEnv) : null

  if (serviceAccount) {
    const adminApp = getApps().length === 0
      ? initializeApp({ credential: cert(serviceAccount) })
      : getApps()[0]
    adminDb = getFirestore(adminApp)
  } else {
    console.warn("FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON is missing. API operates in simulation mode.")
  }
} catch (err) {
  console.error("Failed to initialize Firebase Admin SDK in approve-nomination route:", err)
}

export async function POST(req: NextRequest) {
  try {
    const { nominationId, adminUid } = await req.json()

    // Server-side Admin UID Guard (do not trust client)
    if (adminUid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    if (!adminDb) {
      console.warn("Firebase Admin SDK uninitialized. Simulating nomination approval for ID:", nominationId)
      return NextResponse.json({ fellowId: `simulated_fellow_${Date.now()}` })
    }

    // Fetch the nomination
    const nomRef = adminDb.collection("nominations").doc(nominationId)
    const nomSnap = await nomRef.get()
    if (!nomSnap.exists) {
      return NextResponse.json({ error: "Nomination not found" }, { status: 404 })
    }
    const nom = nomSnap.data()!

    // Fellows document schema matching Month 3 specs
    const fellowDoc = {
      name:          nom.studentName || "Anonymous Fellow",
      schoolCampus:  nom.schoolCampus || "FAETEC Santa Cruz",
      grade:         nom.grade || "2nd Year High School",
      itTracks:      nom.itTracks || [],
      isEndorsed:    true,
      nominatedBy:   nom.submittedBy || null,
      approvedBy:    adminUid,
      approvedAt:    FieldValue.serverTimestamp(),
      status:        "active",
      donorId:       null,
      videoUrl:      null,
      githubUrl:     null,
      linkedinUrl:   null,
      portfolioUrl:  null,
    }

    // Atomic transaction batch write
    const batch = adminDb.batch()
    const fellowRef = adminDb.collection("fellows").doc()
    
    batch.set(fellowRef, fellowDoc)
    batch.update(nomRef, {
      status: "approved",
      approvedAt: FieldValue.serverTimestamp(),
      fellowId: fellowRef.id,
    })
    
    await batch.commit()

    return NextResponse.json({ fellowId: fellowRef.id })
  } catch (err: any) {
    console.error("Error in approve-nomination API endpoint:", err)
    return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 })
  }
}
