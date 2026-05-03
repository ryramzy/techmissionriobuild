import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20' as any,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { amount, isMonthly } = await request.json()

    // Create Stripe Checkout Session
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: isMonthly ? 'subscription' : 'payment',
      
      line_items: isMonthly ? [
        {
          price_data: {
            currency: 'usd',
            unit_amount: amount * 100, // Convert to cents
            recurring: {
              interval: 'month',
            },
            product_data: {
              name: 'Monthly TechMission Rio Support',
              description: `Monthly donation of $${amount} to support Rio's youth tech education`,
              images: ['https://techmissionrio.org/icon.png'],
            },
          },
        },
      ] : [
        {
          price_data: {
            currency: 'usd',
            unit_amount: amount * 100, // Convert to cents
            product_data: {
              name: 'TechMission Rio Donation',
              description: `One-time donation of $${amount} to support Rio's youth tech education`,
              images: ['https://techmissionrio.org/icon.png'],
            },
          },
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/donate?cancelled=true`,

      metadata: {
        donation_type: isMonthly ? 'monthly' : 'one-time',
        amount: amount.toString(),
      },

      customer_email: undefined, // Let Stripe collect email

      billing_address_collection: 'auto',
      allow_promotion_codes: true,

      custom_text: {
        submit: {
          message: 'Your donation supports tech education for Rio\'s youth',
        },
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
