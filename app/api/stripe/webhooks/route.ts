import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { adminDb } from "@/lib/firebase-admin"

// Force dynamic — disable static caching on this route
export const dynamic = "force-dynamic"

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not configured")
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20" as any,
  })
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const sig = req.headers.get("stripe-signature")

    if (!sig) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    let event: Stripe.Event
    try {
      const stripe = getStripe()
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret!)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Log webhook event
    console.log("Stripe webhook received:", {
      type: event.type,
      id: event.id,
      created: new Date(event.created * 1000).toISOString(),
    })

    if (!adminDb) {
      console.warn("⚠️ Firebase Admin credentials missing. Skipping Firestore operations.")
      return NextResponse.json({ received: true, mocked: true })
    }

    // Idempotency guard — prevents duplicate processing on Stripe retries
    const eventRef = adminDb.collection("stripe_events").doc(event.id)
    const existing = await eventRef.get()
    if (existing.exists) {
      return NextResponse.json({ received: true, duplicate: true })
    }
    
    const { FieldValue } = await import("firebase-admin/firestore")
    await eventRef.set({ processedAt: FieldValue.serverTimestamp() })

    // Handle event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId || session.metadata?.user_id
        const amount = (session.amount_total ?? 0) / 100

        if (userId) {
          const donationRef = adminDb
            .collection("users")
            .doc(userId)
            .collection("donations")
            .doc(session.id)

          const donationType = session.metadata?.donation_type ?? "general"

          await donationRef.set({
            amount,
            currency: session.currency?.toUpperCase() ?? "USD",
            stripeSessionId: session.id,
            paymentMethod: "stripe",
            donationType,
            frequency: donationType === "monthly" ? "monthly" : "one-time",
            status: "Processed", // Keep "Processed" to match existing dashboard queries
            receiptSent: false,
            createdAt: FieldValue.serverTimestamp(),
            date: new Date().toISOString().split("T")[0],
            type: donationType === "monthly" ? "Monthly Support" : "One-Time Donation",
          })

          // Trigger email receipt via Firebase Trigger Email extension
          await adminDb.collection("mail").add({
            to: session.customer_details?.email || session.customer_email,
            template: {
              name: "donation-receipt",
              data: {
                donorName: session.customer_details?.name ?? "Donor",
                amount: `$${amount.toFixed(2)} USD`,
                donationId: session.id,
                date: new Date().toLocaleDateString("en-US"),
              },
            },
          })

          await donationRef.update({ receiptSent: true })
          console.log(`Successfully processed checkout session ${session.id} for user ${userId}`)
        }
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        const userId = invoice.metadata?.userId || invoice.metadata?.user_id
        const amount = (invoice.amount_paid ?? 0) / 100

        if (userId && invoice.subscription) {
          const donationRef = adminDb
            .collection("users")
            .doc(userId)
            .collection("donations")
            .doc(invoice.charge as string || invoice.id)

          await donationRef.set({
            amount,
            currency: invoice.currency?.toUpperCase() ?? "USD",
            stripeInvoiceId: invoice.id,
            stripeSubscriptionId: invoice.subscription as string,
            paymentMethod: "stripe",
            donationType: "monthly",
            frequency: "monthly",
            status: "Processed",
            receiptSent: false,
            createdAt: FieldValue.serverTimestamp(),
            date: new Date().toISOString().split("T")[0],
            type: "Monthly Support",
          })

          // Trigger email receipt via Firebase Trigger Email extension
          await adminDb.collection("mail").add({
            to: invoice.customer_email || invoice.customer_details?.email,
            template: {
              name: "donation-receipt",
              data: {
                donorName: invoice.customer_details?.name ?? "Donor",
                amount: `$${amount.toFixed(2)} USD`,
                donationId: invoice.id,
                date: new Date().toLocaleDateString("en-US"),
              },
            },
          })

          await donationRef.update({ receiptSent: true })
          console.log(`Successfully processed recurring invoice payment ${invoice.id} for user ${userId}`)
        }
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        const userId = invoice.metadata?.userId || invoice.metadata?.user_id

        if (userId) {
          await adminDb
            .collection("users")
            .doc(userId)
            .collection("donations")
            .add({
              amount: (invoice.amount_due ?? 0) / 100,
              currency: invoice.currency?.toUpperCase() ?? "USD",
              stripeInvoiceId: invoice.id,
              paymentMethod: "stripe",
              status: "failed",
              createdAt: FieldValue.serverTimestamp(),
              date: new Date().toISOString().split("T")[0],
              type: "Monthly Support",
            })
          console.log(`Successfully processed failed invoice payment ${invoice.id} for user ${userId}`)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
