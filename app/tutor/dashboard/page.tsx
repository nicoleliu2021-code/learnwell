'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Booking, TutorProfile } from '@/types'
import { Calendar, Star, Eye, MessageCircle } from 'lucide-react'
import { sendBookingAcceptedEmail, sendBookingDeclinedEmail } from '@/lib/email'

export default function TutorDashboardPage() {
  const router = useRouter()
  const { user, userRole, loading: authLoading } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [profile, setProfile] = useState<TutorProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login')
      } else if (userRole !== 'tutor') {
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
      // Load tutor profile
      const { data: profileData } = await supabase
        .from('tutor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      setProfile(profileData)

      // Load booking requests
      if (profileData) {
        const { data: bookingsData } = await supabase
          .from('bookings')
          .select('*')
          .eq('tutor_id', profileData.id)
          .order('created_at', { ascending: false })

        setBookings(bookingsData || [])
      }
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptBooking = async (bookingId: string) => {
    const supabase = createClient()

    try {
      // Get booking details before updating
      const { data: booking } = await supabase
        .from('bookings')
        .select('*, parent_id')
        .eq('id', bookingId)
        .single()

      if (!booking) throw new Error('Booking not found')

      // Update booking status
      const { error } = await supabase
        .from('bookings')
        .update({
          status: 'accepted',
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId)

      if (error) throw error

      // Get parent's email
      const { data: parentUser } = await supabase
        .from('users')
        .select('email, full_name')
        .eq('id', booking.parent_id)
        .single()

      // Get tutor's email for parent to contact
      const { data: tutorUser } = await supabase
        .from('users')
        .select('email')
        .eq('id', user?.id)
        .single()

      // Send email notification to parent
      if (parentUser?.email && profile) {
        await sendBookingAcceptedEmail({
          parentEmail: parentUser.email,
          parentName: parentUser.full_name || 'Parent',
          tutorName: profile.headline,
          tutorEmail: tutorUser?.email || '',
          subject: booking.subject
        })
      }

      // Refresh bookings
      await loadDashboardData()
    } catch (error) {
      console.error('Error accepting booking:', error)
      alert('Failed to accept booking. Please try again.')
    }
  }

  const handleDeclineBooking = async (bookingId: string) => {
    const reason = prompt('Optional: Why are you declining this request? (This helps parents understand)')

    const supabase = createClient()

    try {
      // Get booking details before updating
      const { data: booking } = await supabase
        .from('bookings')
        .select('*, parent_id')
        .eq('id', bookingId)
        .single()

      if (!booking) throw new Error('Booking not found')

      // Update booking status
      const { error } = await supabase
        .from('bookings')
        .update({
          status: 'declined',
          tutor_response: reason || 'Not available',
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId)

      if (error) throw error

      // Get parent's email
      const { data: parentUser } = await supabase
        .from('users')
        .select('email, full_name')
        .eq('id', booking.parent_id)
        .single()

      // Send email notification to parent
      if (parentUser?.email && profile) {
        await sendBookingDeclinedEmail({
          parentEmail: parentUser.email,
          parentName: parentUser.full_name || 'Parent',
          tutorName: profile.headline,
          subject: booking.subject,
          reason: reason || undefined
        })
      }

      // Refresh bookings
      await loadDashboardData()
    } catch (error) {
      console.error('Error declining booking:', error)
      alert('Failed to decline booking. Please try again.')
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

  // If no profile, prompt to create one
  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Profile</h1>
          <p className="text-gray-600 mb-8">
            Before you can start receiving booking requests, you need to complete your tutor profile.
          </p>
          <Link href="/become-tutor">
            <Button size="lg">Create Tutor Profile</Button>
          </Link>
        </div>
      </div>
    )
  }

  const pendingBookings = bookings.filter(b => b.status === 'pending')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tutor Dashboard</h1>
          <p className="text-gray-600">Manage your bookings and profile</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {pendingBookings.length}
                </div>
                <div className="text-sm text-gray-600">Pending Requests</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {profile.review_count}
                </div>
                <div className="text-sm text-gray-600">Reviews</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1 flex items-center justify-center gap-1">
                  <Star size={20} className="fill-yellow-600" />
                  {profile.rating_average.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Rating</div>
              </Card>
            </div>

            {/* Booking Requests */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Booking Requests</h2>
                <Badge variant="info">{bookings.length}</Badge>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No booking requests yet</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Parents will find you when they search for tutors
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{booking.subject}</h3>
                          <p className="text-sm text-gray-600">
                            Child age: {booking.child_age} | {booking.location_preference}
                          </p>
                        </div>
                        <Badge
                          variant={
                            booking.status === 'accepted' ? 'success' :
                            booking.status === 'declined' ? 'warning' :
                            booking.status === 'pending' ? 'info' :
                            'default'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-700 mb-3">{booking.needs_description}</p>

                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span>Preferred: {booking.preferred_days.join(', ')}</span>
                      </div>

                      {booking.status === 'pending' && (
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleAcceptBooking(booking.id)}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleDeclineBooking(booking.id)}
                          >
                            Decline
                          </Button>
                        </div>
                      )}

                      {booking.tutor_response && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Your response:</span> {booking.tutor_response}
                          </p>
                        </div>
                      )}

                      <div className="text-xs text-gray-400 mt-3">
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
            {/* Profile Status */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Profile</h3>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant={profile.status === 'approved' ? 'success' : 'warning'}>
                    {profile.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rate:</span>
                  <span className="font-medium">${profile.hourly_rate}/hr</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium capitalize">{profile.location_type}</span>
                </div>
              </div>

              <Link href={`/tutor/${profile.id}`}>
                <Button variant="outline" size="sm" className="w-full mb-2">
                  <Eye size={14} className="mr-2" />
                  View Public Profile
                </Button>
              </Link>

              <Link href="/tutor/edit-profile">
                <Button variant="outline" size="sm" className="w-full">
                  Edit Profile
                </Button>
              </Link>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/messages">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <MessageCircle size={14} className="mr-2" />
                    Messages
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
