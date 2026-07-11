import { NextRequest, NextResponse } from "next/server"
import { adminDb, adminMessaging } from "@/lib/firebase-admin"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { uid, title, body, data } = await req.json()

    if (!uid || !title || !body) {
      return NextResponse.json({ error: "Missing required parameters: uid, title, or body" }, { status: 400 })
    }

    // 1. Simulation mode check if Firebase Admin SDK is uninitialized
    if (!adminDb || !adminMessaging) {
      console.log(`[FCM SIMULATION] Send Push to User: ${uid}`)
      console.log(`[FCM SIMULATION] Title: "${title}" | Body: "${body}"`)
      if (data) console.log(`[FCM SIMULATION] Data:`, data)
      return NextResponse.json({
        status: "simulated",
        message: "FCM Push simulated successfully. Server operates in simulation mode.",
      })
    }

    // 2. Fetch all active device tokens for the user from Firestore
    const tokensRef = adminDb.collection("device_tokens").doc(uid).collection("tokens")
    const snapshot = await tokensRef.get()

    if (snapshot.empty) {
      console.log(`No registered push notification tokens found for user: ${uid}`)
      return NextResponse.json({ status: "skipped", message: "User has no registered notification tokens." })
    }

    const tokens: string[] = []
    const docIds: string[] = []
    snapshot.forEach((doc) => {
      const data = doc.data()
      if (data.token) {
        tokens.push(data.token)
        docIds.push(doc.id)
      }
    })

    const results = []
    const staleDocIds: string[] = []

    // 3. Send notifications to each registered token
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      const docId = docIds[i]

      try {
        const response = await adminMessaging.send({
          token,
          notification: {
            title,
            body,
          },
          data: data ? Object.keys(data).reduce((acc: Record<string, string>, key) => {
            acc[key] = typeof data[key] === "string" ? data[key] : JSON.stringify(data[key])
            return acc
          }, {}) : undefined,
        })
        results.push({ token: token.slice(-10), status: "success", messageId: response })
      } catch (err: any) {
        console.error(`FCM send failed for token segment: ${token.slice(-10)}`, err)
        results.push({ token: token.slice(-10), status: "failed", error: err.message })

        // Check for stale tokens to clean them automatically
        if (
          err.code === "messaging/registration-token-not-registered" ||
          err.code === "messaging/invalid-registration-token"
        ) {
          staleDocIds.push(docId)
        }
      }
    }

    // 4. Prune stale tokens asynchronously
    if (staleDocIds.length > 0) {
      const batch = adminDb.batch()
      staleDocIds.forEach((id) => {
        batch.delete(tokensRef.doc(id))
      })
      await batch.commit()
      console.log(`Cleaned up ${staleDocIds.length} stale FCM device tokens for user: ${uid}`)
    }

    return NextResponse.json({
      status: "completed",
      results,
      prunedCount: staleDocIds.length,
    })
  } catch (error: any) {
    console.error("FCM dispatch API error:", error)
    return NextResponse.json({ error: error.message || "Failed to process push dispatch request" }, { status: 500 })
  }
}
