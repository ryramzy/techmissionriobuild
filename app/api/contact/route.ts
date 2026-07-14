import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"
import { contactFormSchema } from "@/lib/schemas/contact"
import { FieldValue } from "firebase-admin/firestore"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate request data
    const parseResult = contactFormSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.flatten() }, { status: 400 })
    }

    const { name, email, subject, message } = parseResult.data

    if (adminDb) {
      // 1. Record contact submission
      const contactRef = await adminDb.collection("contacts").add({
        name,
        email,
        subject,
        message,
        createdAt: FieldValue.serverTimestamp(),
      })

      // 2. Trigger appropriate email trigger based on subject
      if (subject === "volunteer") {
        // Volunteer Onboarding Email Trigger
        await adminDb.collection("mail").add({
          to: email,
          template: {
            name: "volunteer-onboarding",
            data: {
              name,
              date: new Date().toLocaleDateString("en-US"),
              steps: [
                "1. Complete the volunteer code of conduct.",
                "2. Schedule a 15-minute briefing zoom session.",
                "3. Join the TMR discord community channel.",
              ],
            },
          },
        })
      } else {
        // General Inquiry Auto-Acknowledgment
        await adminDb.collection("mail").add({
          to: email,
          template: {
            name: "contact-acknowledgment",
            data: {
              name,
              subject,
              date: new Date().toLocaleDateString("en-US"),
            },
          },
        })
      }

      return NextResponse.json({ success: true, contactId: contactRef.id })
    } else {
      console.warn("Firebase Admin uninitialized. Simulating contact submission: ", { name, email, subject })
      return NextResponse.json({ success: true, simulated: true })
    }
  } catch (err: any) {
    console.error("Error inside contact API route:", err)
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 })
  }
}
