import { NextRequest, NextResponse } from "next/server"
import { renderToBuffer } from "@react-pdf/renderer"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"
import { adminApp } from "@/lib/firebase-admin"
import { ReceiptDocument } from "@/components/pdf/ReceiptDocument"
import React from "react"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { donationId, userId, idToken } = await req.json()

    if (!donationId || !userId || !idToken) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Verify caller owns this donation
    if (!adminApp) {
      // Mock PDF in development if credentials are missing
      const mockBuffer = Buffer.from("Mock PDF Receipt (Simulation Mode)")
      return new NextResponse(mockBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="receipt-mock-${donationId}.pdf"`,
        },
      })
    }

    const adminAuth = getAuth(adminApp)
    let decoded
    try {
      decoded = await adminAuth.verifyIdToken(idToken)
    } catch (err) {
      console.error("Token verification failed:", err)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (decoded.uid !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const adminDb = getFirestore(adminApp)
    const donationSnap = await adminDb
      .collection("users")
      .doc(userId)
      .collection("donations")
      .doc(donationId)
      .get()

    if (!donationSnap.exists) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 })
    }

    const donation = donationSnap.data()!
    const userSnap = await adminDb.collection("users").doc(userId).get()
    const user = userSnap.data()!

    // Parse date safely
    let dateStr = new Date().toLocaleDateString("en-US")
    if (donation.createdAt) {
      if (typeof donation.createdAt.toDate === "function") {
        dateStr = donation.createdAt.toDate().toLocaleDateString("en-US")
      } else if (donation.createdAt.seconds) {
        dateStr = new Date(donation.createdAt.seconds * 1000).toLocaleDateString("en-US")
      } else {
        dateStr = new Date(donation.createdAt).toLocaleDateString("en-US")
      }
    } else if (donation.date) {
      dateStr = new Date(donation.date).toLocaleDateString("en-US")
    }

    const pdfBuffer = await renderToBuffer(
      React.createElement(ReceiptDocument, {
        donorName: user.name ?? "Donor",
        donorEmail: user.email || "donor@example.com",
        amount: donation.amount,
        currency: donation.currency ?? "USD",
        date: dateStr,
        donationId: donationId,
        paymentMethod: donation.paymentMethod ?? "stripe",
        disclaimer: "TechMission Rio is currently pending 501(c)(3) status. This donation is not tax-deductible until IRS approval is confirmed.",
      })
    )

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${donationId}.pdf"`,
      },
    })
  } catch (error: any) {
    console.error("PDF generation endpoint error:", error)
    return NextResponse.json({ error: error.message || "Failed to generate receipt PDF" }, { status: 500 })
  }
}
