import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-02-25.clover'
})

export async function POST(request: NextRequest) {
  try {
    const { bookingId, amount, tutorId } = await request.json()

    if (!bookingId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify booking exists and user is authorized
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*, tutor_id')
      .eq('id', bookingId)
      .eq('parent_id', user.id)
      .single()

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Calculate platform fee (18% default)
    const platformFeePercent = parseInt(process.env.STRIPE_PLATFORM_FEE_PERCENT || '18')
    const totalAmount = Math.round(amount * 100) // Convert to cents
    const platformFee = Math.round(totalAmount * (platformFeePercent / 100))
    const tutorPayout = totalAmount - platformFee

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      metadata: {
        bookingId,
        tutorId: tutorId || booking.tutor_id,
        parentId: user.id,
        platformFee: platformFee.toString(),
        tutorPayout: tutorPayout.toString()
      },
      description: `LearnWell Tutoring Session - ${booking.subject}`
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
  } catch (error: any) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
