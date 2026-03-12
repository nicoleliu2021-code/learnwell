'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Booking, TutorProfile } from '@/types'
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

// Initialize Stripe (only if key exists)
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

function PaymentForm({ booking, tutor }: { booking: Booking; tutor: TutorProfile }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)
    setError('')

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        throw new Error(submitError.message)
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success?booking_id=${booking.id}`
        }
      })

      if (confirmError) {
        throw new Error(confirmError.message)
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.')
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <PaymentElement />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!stripe || processing || success}
      >
        {processing ? (
          'Processing...'
        ) : success ? (
          <>
            <CheckCircle size={16} className="mr-2" />
            Payment Successful
          </>
        ) : (
          <>
            <Lock size={16} className="mr-2" />
            Pay ${tutor.hourly_rate}
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <Lock size={14} />
        <span>Secured by Stripe</span>
      </div>
    </form>
  )
}

function PaymentPageContent() {
  const params = useParams()
  const router = useRouter()
  const { user, userRole, loading: authLoading } = useAuth()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [tutor, setTutor] = useState<TutorProfile | null>(null)
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const bookingId = params.bookingId as string

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login')
      } else if (userRole !== 'parent') {
        router.push('/dashboard')
      } else {
        loadBookingAndInitiatePayment()
      }
    }
  }, [user, userRole, authLoading, router, bookingId])

  const loadBookingAndInitiatePayment = async () => {
    if (!user) return

    const supabase = createClient()
    setLoading(true)

    try {
      // Load booking details
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .eq('parent_id', user.id)
        .single()

      if (bookingError) throw bookingError

      setBooking(bookingData)

      // Load tutor details
      const { data: tutorData, error: tutorError } = await supabase
        .from('tutor_profiles')
        .select('*')
        .eq('id', bookingData.tutor_id)
        .single()

      if (tutorError) throw tutorError

      setTutor(tutorData)

      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: bookingData.id,
          amount: tutorData.hourly_rate,
          tutorId: tutorData.id
        })
      })

      if (!response.ok) {
        throw new Error('Failed to initialize payment')
      }

      const { clientSecret: secret } = await response.json()
      setClientSecret(secret)
    } catch (err: any) {
      console.error('Error loading payment:', err)
      setError(err.message || 'Failed to load payment page')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading payment...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full p-8 text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push('/parent/dashboard')}>
            Return to Dashboard
          </Button>
        </Card>
      </div>
    )
  }

  if (!booking || !tutor || !clientSecret || !stripePromise) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full p-8 text-center">
          <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payments Not Enabled</h1>
          <p className="text-gray-600 mb-6">
            Stripe payment processing is not configured yet. Please coordinate payment directly with your tutor.
          </p>
          <Button onClick={() => router.push('/parent/dashboard')}>
            Return to Dashboard
          </Button>
        </Card>
      </div>
    )
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Secure payment powered by Stripe</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Summary */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>

            <div className="space-y-3 mb-6">
              <div>
                <div className="text-sm text-gray-600">Tutor</div>
                <div className="font-medium text-gray-900">{tutor.headline}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Subject</div>
                <div className="font-medium text-gray-900">{booking.subject}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Rate</div>
                <div className="font-medium text-gray-900">${tutor.hourly_rate}/hour</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Status</div>
                <Badge variant="success">Accepted by Tutor</Badge>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${tutor.hourly_rate}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Payment will be held securely until session completion
              </p>
            </div>
          </Card>

          {/* Payment Form */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard size={20} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
            </div>

            <Elements stripe={stripePromise} options={options}>
              <PaymentForm booking={booking} tutor={tutor} />
            </Elements>
          </Card>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            Your payment information is encrypted and secure
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <span>PCI Compliant</span>
            <span>•</span>
            <span>256-bit SSL</span>
            <span>•</span>
            <span>Powered by Stripe</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return <PaymentPageContent />
}
