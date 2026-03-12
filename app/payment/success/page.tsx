'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CheckCircle, Home } from 'lucide-react'
import Link from 'next/link'

function PaymentSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading: authLoading } = useAuth()
  const [updating, setUpdating] = useState(true)

  const bookingId = searchParams.get('booking_id')
  const paymentIntentId = searchParams.get('payment_intent')

  useEffect(() => {
    if (!authLoading && user && bookingId && paymentIntentId) {
      updateBookingStatus()
    }
  }, [user, authLoading, bookingId, paymentIntentId])

  const updateBookingStatus = async () => {
    if (!bookingId || !paymentIntentId) return

    const supabase = createClient()

    try {
      // Update booking with payment information
      await supabase
        .from('bookings')
        .update({
          payment_status: 'paid',
          payment_intent_id: paymentIntentId,
          payment_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId)

      // You could also create a transaction record here
      // for accounting purposes
    } catch (error) {
      console.error('Error updating booking:', error)
    } finally {
      setUpdating(false)
    }
  }

  if (authLoading || updating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Confirming payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>

        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. The tutor will be notified and you can
          coordinate the session details via messages.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
          <ul className="text-sm text-blue-700 text-left space-y-1">
            <li>• The tutor will reach out to schedule your session</li>
            <li>• Check your messages for coordination</li>
            <li>• Payment is held securely until session completion</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link href="/parent/dashboard" className="block">
            <Button size="lg" className="w-full">
              <Home size={16} className="mr-2" />
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/messages" className="block">
            <Button size="lg" variant="outline" className="w-full">
              View Messages
            </Button>
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Receipt sent to your email • Payment ID: {paymentIntentId?.substring(0, 20)}...
        </p>
      </Card>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
