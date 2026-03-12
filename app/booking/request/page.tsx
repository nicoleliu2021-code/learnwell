'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { TutorProfile } from '@/types'
import { DAYS_OF_WEEK, TIME_SLOTS } from '@/lib/constants'
import { sendBookingRequestEmail } from '@/lib/email'

function BookingRequestContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tutorId = searchParams.get('tutor')
  const { user, loading: authLoading } = useAuth()

  const [tutor, setTutor] = useState<TutorProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    childAge: '',
    subject: '',
    needsDescription: '',
    preferredDays: [] as string[],
    preferredTimes: [] as string[],
    locationPreference: 'both' as 'virtual' | 'in-person' | 'both',
  })

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push(`/login?redirect=/booking/request?tutor=${tutorId}`)
      } else if (tutorId) {
        loadTutor()
      }
    }
  }, [user, authLoading, tutorId])

  const loadTutor = async () => {
    if (!tutorId) return

    const supabase = createClient()
    try {
      const { data, error } = await supabase
        .from('tutor_profiles')
        .select('*')
        .eq('id', tutorId)
        .single()

      if (error) throw error
      setTutor(data)
      if (data.subjects.length > 0) {
        setFormData(prev => ({ ...prev, subject: data.subjects[0] }))
      }
    } catch (err) {
      console.error('Error loading tutor:', err)
      setError('Could not load tutor profile')
    } finally {
      setLoading(false)
    }
  }

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDays: prev.preferredDays.includes(day)
        ? prev.preferredDays.filter(d => d !== day)
        : [...prev.preferredDays, day]
    }))
  }

  const toggleTime = (time: string) => {
    setFormData(prev => ({
      ...prev,
      preferredTimes: prev.preferredTimes.includes(time)
        ? prev.preferredTimes.filter(t => t !== time)
        : [...prev.preferredTimes, time]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !tutorId || !tutor) return

    setError('')
    setSubmitting(true)

    const supabase = createClient()

    try {
      const { error: insertError } = await supabase
        .from('bookings')
        .insert({
          tutor_id: tutorId,
          parent_id: user.id,
          child_age: parseInt(formData.childAge),
          subject: formData.subject,
          needs_description: formData.needsDescription,
          preferred_days: formData.preferredDays,
          preferred_times: formData.preferredTimes,
          location_preference: formData.locationPreference,
          status: 'pending',
        })

      if (insertError) throw insertError

      // Get tutor's email from users table
      const { data: tutorUser } = await supabase
        .from('users')
        .select('email, full_name')
        .eq('id', tutor.user_id)
        .single()

      // Send email notification to tutor
      if (tutorUser?.email) {
        await sendBookingRequestEmail({
          tutorEmail: tutorUser.email,
          tutorName: tutor.headline,
          parentName: user.user_metadata?.full_name || user.email || 'A parent',
          childAge: parseInt(formData.childAge),
          subject: formData.subject,
          needsDescription: formData.needsDescription,
          preferredDays: formData.preferredDays,
          preferredTimes: formData.preferredTimes,
          dashboardUrl: `${window.location.origin}/tutor/dashboard`
        })
      }

      // Success - redirect to dashboard
      router.push('/parent/dashboard?success=booking-sent')
    } catch (err: any) {
      console.error('Error creating booking:', err)
      setError(err.message || 'Failed to send booking request')
      setSubmitting(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tutor Not Found</h1>
          <p className="text-gray-600 mb-8">The tutor you're trying to book could not be found.</p>
          <Link href="/browse">
            <Button>Browse Tutors</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link href={`/tutor/${tutorId}`} className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block">
            ← Back to tutor profile
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Request a Lesson</h1>
          <p className="text-gray-600">Send a booking request to {tutor.headline}</p>
        </div>

        {/* Tutor Info */}
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{tutor.headline}</h3>
              <p className="text-sm text-gray-600">
                ${tutor.hourly_rate}/hr · {tutor.location_type}
              </p>
            </div>
          </div>
        </Card>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Booking Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Child Age */}
            <Input
              label="Child's Age *"
              type="number"
              required
              min="3"
              max="18"
              value={formData.childAge}
              onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
              placeholder="10"
            />

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {tutor.subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Needs Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What does your child need help with? *
              </label>
              <textarea
                required
                rows={4}
                value={formData.needsDescription}
                onChange={(e) => setFormData({ ...formData, needsDescription: e.target.value })}
                placeholder="Describe your child's learning needs, goals, and any specific areas they need help with..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Preferred Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Days * (Select at least one)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-3 py-2 rounded-lg border-2 text-sm transition-all ${
                      formData.preferredDays.includes(day)
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Times */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Times * (Select at least one)
              </label>
              <div className="grid grid-cols-1 gap-2">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => toggleTime(time)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                      formData.preferredTimes.includes(time)
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Location Preference *
              </label>
              <div className="space-y-2">
                {tutor.location_type === 'both' || tutor.location_type === 'virtual' ? (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      value="virtual"
                      checked={formData.locationPreference === 'virtual'}
                      onChange={(e) => setFormData({ ...formData, locationPreference: e.target.value as any })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Virtual (Online)</span>
                  </label>
                ) : null}

                {tutor.location_type === 'both' || tutor.location_type === 'in-person' ? (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      value="in-person"
                      checked={formData.locationPreference === 'in-person'}
                      onChange={(e) => setFormData({ ...formData, locationPreference: e.target.value as any })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">In-Person</span>
                  </label>
                ) : null}

                {tutor.location_type === 'both' && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      value="both"
                      checked={formData.locationPreference === 'both'}
                      onChange={(e) => setFormData({ ...formData, locationPreference: e.target.value as any })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Either works</span>
                  </label>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-gray-200">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={submitting || formData.preferredDays.length === 0 || formData.preferredTimes.length === 0}
              >
                {submitting ? 'Sending Request...' : 'Send Booking Request'}
              </Button>
              <p className="text-sm text-gray-500 text-center mt-3">
                The tutor will receive your request and respond within 24-48 hours
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default function BookingRequestPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <BookingRequestContent />
    </Suspense>
  )
}
