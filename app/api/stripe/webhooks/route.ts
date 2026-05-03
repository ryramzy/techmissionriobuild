import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20' as any,
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Log all webhook events for debugging
    console.log('Stripe webhook received:', {
      type: event.type,
      id: event.id,
      created: new Date(event.created * 1000).toISOString(),
    })

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        console.log('Payment completed:', {
          sessionId: session.id,
          amount: session.amount_total,
          currency: session.currency,
          customerEmail: session.customer_email,
          metadata: session.metadata,
        })
        
        // TODO: Save to database, send confirmation email, etc.
        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice
        console.log('Monthly payment succeeded:', {
          invoiceId: invoice.id,
          amount: invoice.amount_paid,
          customerEmail: invoice.customer_email,
        })
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        console.log('Monthly payment failed:', {
          invoiceId: failedInvoice.id,
          amount: failedInvoice.amount_due,
          customerEmail: failedInvoice.customer_email,
        })
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
