import { NextRequest, NextResponse } from "next/server"
import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore, FieldValue } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"

let adminDb: any = null
let adminAuth: any = null

try {
  const serviceAccountEnv = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON
  const serviceAccount = serviceAccountEnv ? JSON.parse(serviceAccountEnv) : null

  if (serviceAccount) {
    const adminApp = getApps().length === 0
      ? initializeApp({ credential: cert(serviceAccount) })
      : getApps()[0]
    adminDb = getFirestore(adminApp)
    adminAuth = getAuth(adminApp)
  } else {
    console.warn("FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON is missing. API operates in simulation mode.")
  }
} catch (err) {
  console.error("Failed to initialize Firebase Admin SDK in nomination-action route:", err)
}

export async function POST(req: NextRequest) {
  try {
    const { nominationId, fellowId, action, idToken } = await req.json()

    if (!action || !idToken) {
      return NextResponse.json({ error: "Missing required parameters (action, idToken)" }, { status: 400 })
    }

    if (action !== "approve" && action !== "archive" && action !== "toggle-visibility") {
      return NextResponse.json({ error: "Invalid action. Supported actions: 'approve', 'archive', or 'toggle-visibility'" }, { status: 400 })
    }

    let decodedToken: any = null

    if (adminAuth) {
      try {
        decodedToken = await adminAuth.verifyIdToken(idToken)
      } catch (err) {
        console.error("Failed to verify Firebase ID Token server-side:", err)
        return NextResponse.json({ error: "Invalid or expired authentication credentials" }, { status: 401 })
      }

      // Check UID against secure server-only variable
      const adminUid = process.env.ADMIN_UID || "mock-admin-uid-123"
      if (decodedToken.uid !== adminUid) {
        return NextResponse.json({ error: "Forbidden: Administrative credentials required" }, { status: 403 })
      }
    } else {
      console.warn("Firebase Admin Auth uninitialized. Running in simulation mode without verification check.")
    }

    if (!adminDb) {
      console.warn(`Simulating action: '${action}' for ID: ${nominationId || fellowId}`)
      return NextResponse.json({ success: true, simulated: true, isVisible: false })
    }

    const operatorUid = decodedToken ? decodedToken.uid : "mock-admin-uid-123"

    if (action === "toggle-visibility") {
      if (!fellowId) {
        return NextResponse.json({ error: "Missing required parameter 'fellowId'" }, { status: 400 })
      }
      const fellowRef = adminDb.collection("fellows").doc(fellowId)
      const snap = await fellowRef.get()
      if (!snap.exists) {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
      }
      const current = snap.data()!.isVisible ?? true
      await fellowRef.update({
        isVisible: !current,
        visibilityUpdatedAt: FieldValue.serverTimestamp(),
        visibilityUpdatedBy: operatorUid,
      })
      return NextResponse.json({ success: true, isVisible: !current })
    }

    // Otherwise, we require nominationId for approve or archive
    if (!nominationId) {
      return NextResponse.json({ error: "Missing required parameter 'nominationId'" }, { status: 400 })
    }

    // Fetch original nomination
    const nomRef = adminDb.collection("nominations").doc(nominationId)
    const nomSnap = await nomRef.get()
    if (!nomSnap.exists) {
      return NextResponse.json({ error: "Nomination not found" }, { status: 404 })
    }
    const nom = nomSnap.data()!

    const batch = adminDb.batch()

    if (action === "approve") {
      // Build fellows document schema matching Month 3 specs
      const fellowDoc = {
        name:          nom.studentName || "Anonymous Fellow",
        schoolCampus:  nom.schoolCampus || "FAETEC Santa Cruz",
        grade:         nom.grade || "2nd Year High School",
        itTracks:      nom.itTracks || [],
        isEndorsed:    true,
        nominatedBy:   nom.submittedBy || null,
        approvedBy:    operatorUid,
        approvedAt:    FieldValue.serverTimestamp(),
        status:        "active",
        donorId:       null,
        videoUrl:      null,
        githubUrl:     null,
        linkedinUrl:   null,
        portfolioUrl:  null,
        isVisible:     true, // Default visibility is true
      }

      const fellowRef = adminDb.collection("fellows").doc()
      
      batch.set(fellowRef, fellowDoc)
      batch.update(nomRef, {
        status: "approved",
        approvedAt: FieldValue.serverTimestamp(),
        fellowId: fellowRef.id,
      })

      await batch.commit()
      return NextResponse.json({ success: true, fellowId: fellowRef.id })
    } else {
      // Archive / Reject
      batch.update(nomRef, {
        status: "archived",
        archivedAt: FieldValue.serverTimestamp(),
        archivedBy: operatorUid,
      })

      await batch.commit()
      return NextResponse.json({ success: true, archived: true })
    }

  } catch (err: any) {
    console.error("Error inside nomination-action serverless route:", err)
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 })
  }
}
