import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/resend"
import { renderDonorMarketingEmail, DonorMarketingEmailData } from "@/lib/email-templates/donor-marketing"
import { adminDb } from "@/lib/firebase-admin"
import { FieldValue } from "firebase-admin/firestore"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      recipientEmail,
      donorName,
      organizationName,
      customNote,
      featuredFellowName,
      featuredFellowTrack,
      featuredFellowStory,
      donateUrl,
    } = body

    if (!recipientEmail || typeof recipientEmail !== "string" || !recipientEmail.includes("@")) {
      return NextResponse.json(
        { error: "A valid recipientEmail is required." },
        { status: 400 }
      )
    }

    const templateData: DonorMarketingEmailData = {
      donorName,
      organizationName,
      customNote,
      featuredFellowName,
      featuredFellowTrack,
      featuredFellowStory,
      donateUrl,
    }

    const { html, text, subject } = renderDonorMarketingEmail(templateData)

    // Dispatch via Resend
    const result = await sendEmail({
      to: recipientEmail.trim(),
      subject,
      html,
      text,
      tags: [
        { name: "category", value: "donor_marketing" },
        { name: "recipient", value: recipientEmail.trim() },
      ],
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to dispatch donor marketing email" },
        { status: 500 }
      )
    }

    // Log to Firestore if adminDb is initialized
    let logId = null
    if (adminDb) {
      try {
        const logRef = await adminDb.collection("donor_outreach_logs").add({
          recipientEmail: recipientEmail.trim(),
          donorName: donorName || null,
          organizationName: organizationName || null,
          resendMessageId: result.id || null,
          simulated: Boolean(result.simulated),
          subject,
          createdAt: FieldValue.serverTimestamp(),
        })
        logId = logRef.id
      } catch (logErr) {
        console.warn("Could not log outreach dispatch to Firestore:", logErr)
      }
    }

    return NextResponse.json({
      success: true,
      messageId: result.id,
      simulated: result.simulated,
      logId,
    })
  } catch (error: any) {
    console.error("Error in /api/marketing/send-donor-outreach:", error)
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}
