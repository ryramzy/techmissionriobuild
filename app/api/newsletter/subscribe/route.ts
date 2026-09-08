import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"
import { sendEmail } from "@/lib/resend"
import { FieldValue } from "firebase-admin/firestore"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name } = body

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      )
    }

    const cleanEmail = email.trim().toLowerCase()
    const cleanName = name ? String(name).trim() : null

    // 1. Save or update subscriber in Firestore
    if (adminDb) {
      try {
        const subRef = adminDb.collection("subscribers").doc(cleanEmail)
        await subRef.set(
          {
            email: cleanEmail,
            name: cleanName,
            active: true,
            source: "website_footer_signup",
            subscribedAt: FieldValue.serverTimestamp(),
            lastUpdated: FieldValue.serverTimestamp(),
          },
          { merge: true }
        )
      } catch (dbErr) {
        console.warn("Could not record subscriber in Firestore:", dbErr)
      }
    }

    // 2. Send warm welcome confirmation email via Resend
    const welcomeHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 24px; }
    .card { max-width: 540px; margin: 0 auto; background: #0d1322; border: 1px solid #1e293b; border-radius: 14px; padding: 32px; }
    .badge { display: inline-block; background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 99px; text-transform: uppercase; margin-bottom: 16px; }
    h1 { color: #ffffff; font-size: 22px; margin: 0 0 16px 0; }
    p { color: #cbd5e1; font-size: 14.5px; line-height: 1.65; margin: 0 0 14px 0; }
    .link { color: #10b981; text-decoration: none; font-weight: 600; }
    .box { background: #111827; border-left: 3px solid #10b981; padding: 14px 18px; border-radius: 0 8px 8px 0; margin: 20px 0; font-size: 13.5px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">TechMission Rio</span>
    <h1>Welcome to Bi-Weekly Field Updates</h1>
    <p>
      ${cleanName ? `Hi ${cleanName},` : "Hello,"} thank you for subscribing to our bi-weekly updates from Rio de Janeiro.
    </p>
    <p>
      Every two weeks, our founder writes a personal dispatch covering the progress of our student fellows, milestones from the computer labs in Santa Cruz and Quintino, and ways you can partner with us.
    </p>
    <div class="box">
      <strong>What to expect:</strong>
      <br>&bull; Real student project showcases and live coding demos.
      <br>&bull; Updates on laptop distribution and school partnerships.
      <br>&bull; Meaningful prayer and support requests from our Rio team.
    </div>
    <p>
      In the meantime, feel free to explore our live impact map or view our student fellows catalog:
    </p>
    <p>
      <a href="https://techmissionrio.org/fellows" class="link">Browse Active Fellows &rarr;</a>
    </p>
    <p style="margin-top: 24px; font-size: 13px; color: #64748b;">
      TechMission Rio &bull; Non-Profit Technology Education
    </p>
  </div>
</body>
</html>
`

    await sendEmail({
      to: cleanEmail,
      subject: "Welcome to TechMission Rio Bi-Weekly Updates",
      html: welcomeHtml,
      tags: [{ name: "category", value: "newsletter_welcome" }],
    })

    return NextResponse.json({
      success: true,
      email: cleanEmail,
      message: "Successfully subscribed to bi-weekly updates.",
    })
  } catch (error: any) {
    console.error("Error in /api/newsletter/subscribe:", error)
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}
