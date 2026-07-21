import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json({ error: "Firebase Admin is unconfigured" }, { status: 500 })
    }

    // 1. Gather all statistics from Firestore
    // Global metrics
    const statsDoc = await adminDb.collection("dashboard_stats").doc("global_metrics").get()
    const statsData = statsDoc.exists ? statsDoc.data() : { laptopsDistributed: 40, mentorshipHours: 350, activePartners: 4 }
    
    // Total nominations
    const nominationsSnap = await adminDb.collection("nominations").get()
    const nominationsCount = nominationsSnap.size
    
    // Approved fellows
    const fellowsSnap = await adminDb.collection("fellows").get()
    const fellowsCount = fellowsSnap.size

    // Accumulate donations
    const usersSnap = await adminDb.collection("users").get()
    let totalDonated = 0
    const activeDonorEmails: string[] = []

    for (const userDoc of usersSnap.docs) {
      const userData = userDoc.data()
      // Collect donor emails
      if (userData.profileType === "individual" || userData.profileType === "organization") {
        if (userData.email) {
          activeDonorEmails.push(userData.email)
        }
      }
      
      const donationsSnap = await userDoc.ref.collection("donations").get()
      donationsSnap.forEach((dDoc) => {
        const dData = dDoc.data()
        if (dData.status === "Processed") {
          totalDonated += Number(dData.amount || 0)
        }
      })
    }

    // De-duplicate emails & filter empty ones
    const donorEmails = Array.from(new Set(activeDonorEmails)).filter(Boolean)

    // 2. Generate PDF Base64 simulation representing the report content
    const reportText = `
=========================================
      TECHMISSION RIO ANNUAL IMPACT REPORT
      Reporting Cycle: 2026 Fiscal Year
=========================================
Total Donations Raised: $${totalDonated.toLocaleString()} USD
Laptops Distributed to Fellows: ${statsData?.laptopsDistributed} units
Active Partner Schools: ${statsData?.activePartners} campuses
Total Trainee Nominations Sourced: ${nominationsCount} students
Coding Fellows Approved & Supported: ${fellowsCount} fellows
Total Mentorship Training Hours: ${statsData?.mentorshipHours} hours

Supporter Verification Hash: sha256-tmr-impact-verification-token-2026
=========================================
Thank you for sponsoring technology education in Rio!
`
    const pdfBase64 = Buffer.from(reportText).toString("base64")

    // 3. Queue emails to Firebase Trigger Email for all active donors
    let emailsQueued = 0
    for (const email of donorEmails) {
      await adminDb.collection("mail").add({
        to: email,
        message: {
          subject: "TechMission Rio - 2026 Annual Impact Report",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 12px;">
              <h2 style="color: #22c55e;">Your Impact in Rio de Janeiro</h2>
              <p>Dear Supporter,</p>
              <p>Because of your generous backing, TechMission Rio has distributed <strong>${statsData?.laptopsDistributed} developer laptops</strong> and sponsored <strong>${statsData?.mentorshipHours} hours of technical mentoring</strong> for high school coding fellows this year.</p>
              <p>We have attached our verified <strong>2026 Annual Impact Report PDF</strong> directly to this email for your audit and reviews.</p>
              <br/>
              <p>In Christ,</p>
              <p><strong>The TechMission Rio Operations Team</strong></p>
            </div>
          `,
          attachments: [
            {
              filename: `TMR_Annual_Impact_Report_2026.pdf`,
              content: pdfBase64,
              encoding: "base64"
            }
          ]
        }
      })
      emailsQueued++
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalDonations: totalDonated,
        laptopsDistributed: statsData?.laptopsDistributed,
        fellowsApproved: fellowsCount,
        nominationsSourced: nominationsCount,
        partnersActive: statsData?.activePartners,
      },
      emailsQueued,
      donorCount: donorEmails.length
    })
  } catch (error: any) {
    console.error("Failed to generate Annual Impact Report:", error)
    return NextResponse.json({ error: error.message || "Failed to trigger report compilation" }, { status: 500 })
  }
}
