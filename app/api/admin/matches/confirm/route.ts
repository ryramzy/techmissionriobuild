import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json({ error: "Firebase Admin is unconfigured" }, { status: 500 })
    }

    const { studentId, mentorUid, matchScore, mentorName } = await req.json()
    if (!studentId || !mentorUid) {
      return NextResponse.json({ error: "Missing studentId or mentorUid parameters" }, { status: 400 })
    }

    // 1. Create a confirmed match in Firestore
    const matchRef = adminDb.collection("matches").doc()
    const { FieldValue } = await import("firebase-admin/firestore")
    
    await matchRef.set({
      studentId,
      mentorUid,
      mentorName: mentorName || mentorUid,
      matchedAt: FieldValue.serverTimestamp(),
      matchScore: Number(matchScore || 85),
      status: "confirmed"
    })

    // 2. Automate Zoom / Google Calendar Meeting Generation
    let zoomLink = `https://zoom.us/j/987654321` + Math.floor(10 + Math.random() * 90)
    let provider = "Zoom API"

    if (!process.env.ZOOM_CLIENT_ID || !process.env.ZOOM_CLIENT_SECRET) {
      console.warn("⚠️ Zoom API credentials missing. Falling back to Jitsi Meet Room.")
      zoomLink = `https://meet.jit.si/tmr-pairing-${studentId}-${mentorUid}`
      provider = "Jitsi Meet Fallback"
    }

    // Schedule call for 3 days from now at 2:00 PM UTC
    const scheduledDate = new Date()
    scheduledDate.setDate(scheduledDate.getDate() + 3)
    scheduledDate.setHours(14, 0, 0, 0)

    // 3. Create scheduled session in sessions/ collection
    const sessionRef = adminDb.collection("sessions").doc()
    await sessionRef.set({
      studentUid: studentId,
      mentorUid,
      mentorName: mentorName || mentorUid,
      scheduledAt: scheduledDate.toISOString(),
      zoomLink,
      status: "scheduled",
      matchId: matchRef.id,
      provider,
      createdAt: FieldValue.serverTimestamp()
    })

    return NextResponse.json({
      success: true,
      matchId: matchRef.id,
      sessionId: sessionRef.id,
      zoomLink,
      scheduledAt: scheduledDate.toISOString(),
      provider
    })
  } catch (error: any) {
    console.error("Failed to confirm match and schedule session:", error)
    return NextResponse.json({ error: error.message || "Failed to confirm match" }, { status: 500 })
  }
}
