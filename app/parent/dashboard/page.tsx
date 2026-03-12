'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Booking, TutorProfile } from '@/types'
import { Calendar, Heart, MessageCircle, User, CheckCircle } from 'lucide-react'

function ParentDashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const successMessage = searchParams.get('success')
  const { user, userRole, loading: authLoading } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [savedTutors, setSavedTutors] = useState<TutorProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(!!successMessage)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login')
      } else if (userRole !== 'parent') {
        router.push('/dashboard')
      } else {
        loadDashboardData()
      }
    }
  }, [user, userRole, authLoading, router])

  const loadDashboardData = async () => {
    if (!user) return

    const supabase = createClient()

    try {
      // Load bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .eq('parent_id', user.id)
        .order('created_at', { ascending: false })

      setBookings(bookingsData || [])

      // Load saved tutors
      const { data: savedData } = await supabase
        .from('saved_tutors')
        .select('tutor_id')
        .eq('parent_id', user.id)

      if (savedData && savedData.length > 0) {
        const tutorIds = savedData.map(s => s.tutor_id)
        const { data: tutorsData } = await supabase
          .from('tutor_profiles')
          .select('*')
          .in('id', tutorIds)

        setSavedTutors(tutorsData || [])
      }
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Parent Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your bookings and saved tutors.</p>
        </div>

        {/* Success Message */}
        {showSuccess && successMessage === 'booking-sent' && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-green-900 mb-1">
                Booking Request Sent!
              </h3>
              <p className="text-sm text-green-700">
                The tutor will receive your request and respond within 24-48 hours. We'll notify you when they reply.
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="text-green-600 hover:text-green-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/browse">
                  <Button variant="outline" className="w-full">
                    Find Tutors
                  </Button>
                </Link>
                <Link href="/messages">
                  <Button variant="outline" className="w-full">
                    <MessageCircle size={16} className="mr-2" />
                    Messages
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Booking Requests */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Your Booking Requests</h2>
                <Badge variant="info">{bookings.length}</Badge>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">No booking requests yet</p>
                  <Link href="/browse">
                    <Button>Find a Tutor</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">{booking.subject}</h3>
                          <p className="text-sm text-gray-600">Child age: {booking.child_age}</p>
                        </div>
                        <Badge
                          variant={
                            booking.status === 'accepted' ? 'success' :
                            booking.status === 'declined' ? 'warning' :
                            'default'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{booking.needs_description}</p>
                      <div className="text-xs text-gray-500">
                        Requested {new Date(booking.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Profile</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={24} className="text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{user?.email}</div>
                  <div className="text-sm text-gray-500">Parent Account</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Edit Profile
              </Button>
            </Card>

            {/* Saved Tutors */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Saved Tutors</h3>
                <Heart size={16} className="text-red-500" />
              </div>

              {savedTutors.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No saved tutors yet
                </p>
              ) : (
                <div className="space-y-3">
                  {savedTutors.slice(0, 3).map((tutor) => (
                    <Link
                      key={tutor.id}
                      href={`/tutor/${tutor.id}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <div className="font-medium text-sm text-gray-900 mb-1">
                        {tutor.headline}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${tutor.hourly_rate}/hr
                      </div>
                    </Link>
                  ))}
                  {savedTutors.length > 3 && (
                    <button className="text-sm text-blue-600 hover:text-blue-700 w-full text-center">
                      View all {savedTutors.length} saved
                    </button>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ParentDashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ParentDashboardContent />
    </Suspense>
  )
}
