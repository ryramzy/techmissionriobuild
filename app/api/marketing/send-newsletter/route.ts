import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/resend"
import { renderBiweeklyNewsletterEmail, BiweeklyNewsletterData } from "@/lib/email-templates/biweekly-newsletter"
import { adminDb } from "@/lib/firebase-admin"
import { FieldValue } from "firebase-admin/firestore"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      mode = "test", // "test" | "broadcast"
      testEmail,
      issueNumber,
      issueDate,
      issueTitle,
      foundersNote,
      classroomHighlights,
      studentSpotlight,
      prayerAndSupportRequests,
      ctaText,
      ctaUrl,
    } = body

    if (!issueTitle || !foundersNote) {
      return NextResponse.json(
        { error: "issueTitle and foundersNote are required to dispatch the newsletter." },
        { status: 400 }
      )
    }

    const templateData: BiweeklyNewsletterData = {
      issueNumber,
      issueDate,
      issueTitle,
      foundersNote,
      classroomHighlights,
      studentSpotlight,
      prayerAndSupportRequests,
      ctaText,
      ctaUrl,
    }

    const { html, text, subject } = renderBiweeklyNewsletterEmail(templateData)

    // Mode 1: Test dispatch to a single recipient
    if (mode === "test") {
      const recipient = testEmail?.trim() || "admin@techmissionrio.org"
      const result = await sendEmail({
        to: recipient,
        subject: `[TEST] ${subject}`,
        html,
        text,
        tags: [{ name: "category", value: "newsletter_test" }],
      })

      return NextResponse.json({
        success: result.success,
        mode: "test",
        recipient,
        messageId: result.id,
        simulated: result.simulated,
        error: result.error,
      })
    }

    // Mode 2: Broadcast to all subscribers and active donors
    const recipientsSet = new Set<string>()

    if (adminDb) {
      try {
        // 1. Gather from dedicated subscribers collection
        const subSnap = await adminDb.collection("subscribers").where("active", "!=", false).get()
        subSnap.forEach((doc) => {
          const email = doc.data().email
          if (email && email.includes("@")) recipientsSet.add(email.trim().toLowerCase())
        })

        // 2. Gather from registered user donors/stakeholders
        const usersSnap = await adminDb.collection("users").get()
        usersSnap.forEach((doc) => {
          const u = doc.data()
          if (u.email && (u.profileType === "individual" || u.profileType === "organization")) {
            recipientsSet.add(u.email.trim().toLowerCase())
          }
        })
      } catch (err) {
        console.warn("Could not retrieve recipients from Firestore:", err)
      }
    }

    // Fallback if database has no records yet
    if (recipientsSet.size === 0) {
      if (testEmail) {
        recipientsSet.add(testEmail.trim().toLowerCase())
      } else {
        recipientsSet.add("updates@techmissionrio.org")
      }
    }

    const recipientList = Array.from(recipientsSet)
    let successfulCount = 0
    let failureCount = 0

    // Send in batches of 50 to respect provider batch limits
    const BATCH_SIZE = 50
    for (let i = 0; i < recipientList.length; i += BATCH_SIZE) {
      const batch = recipientList.slice(i, i + BATCH_SIZE)
      const result = await sendEmail({
        to: batch,
        subject,
        html,
        text,
        tags: [
          { name: "category", value: "biweekly_newsletter" },
          { name: "issue", value: String(issueNumber || "1") },
        ],
      })

      if (result.success) {
        successfulCount += batch.length
      } else {
        failureCount += batch.length
      }
    }

    // Record issue in Firestore archive
    let issueArchiveId = null
    if (adminDb) {
      try {
        const issueRef = await adminDb.collection("newsletter_issues").add({
          issueNumber: issueNumber || null,
          issueTitle,
          subject,
          foundersNote,
          recipientsCount: recipientList.length,
          deliveredCount: successfulCount,
          sentAt: FieldValue.serverTimestamp(),
        })
        issueArchiveId = issueRef.id
      } catch (err) {
        console.warn("Could not archive newsletter issue in Firestore:", err)
      }
    }

    return NextResponse.json({
      success: true,
      mode: "broadcast",
      recipientsCount: recipientList.length,
      successfulCount,
      failureCount,
      issueArchiveId,
    })
  } catch (error: any) {
    console.error("Error in /api/marketing/send-newsletter:", error)
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}
