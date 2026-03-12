'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TutorProfile, Review } from '@/types'
import { fetchTutorById } from '@/lib/api/tutors'
import { fetchReviewsByTutorId } from '@/lib/api/reviews'
import { useAuth } from '@/lib/auth/AuthContext'
import { createClient } from '@/lib/supabase/client'
import {
  Star,
  CheckCircle,
  MapPin,
  Clock,
  Award,
  Heart,
  MessageCircle,
  Calendar,
  Shield,
} from 'lucide-react'

export default function TutorProfilePage() {
  const params = useParams()
  const router = useRouter()
  const tutorId = params.id as string
  const { user } = useAuth()

  const [tutor, setTutor] = useState<TutorProfile | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [savingState, setSavingState] = useState(false)

  useEffect(() => {
    loadTutorData()
  }, [tutorId])

  useEffect(() => {
    checkIfSaved()
  }, [user, tutorId])

  const loadTutorData = async () => {
    try {
      setLoading(true)
      const [tutorData, reviewsData] = await Promise.all([
        fetchTutorById(tutorId),
        fetchReviewsByTutorId(tutorId)
      ])

      setTutor(tutorData)
      setReviews(reviewsData)
    } catch (error) {
      console.error('Error loading tutor:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkIfSaved = async () => {
    if (!user) {
      setIsSaved(false)
      return
    }

    const supabase = createClient()
    try {
      const { data } = await supabase
        .from('saved_tutors')
        .select('id')
        .eq('parent_id', user.id)
        .eq('tutor_id', tutorId)
        .single()

      setIsSaved(!!data)
    } catch (error) {
      // No saved record found, that's okay
      setIsSaved(false)
    }
  }

  const handleSaveToggle = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    if (savingState) return

    setSavingState(true)
    const supabase = createClient()

    try {
      if (isSaved) {
        // Unsave
        const { error } = await supabase
          .from('saved_tutors')
          .delete()
          .eq('parent_id', user.id)
          .eq('tutor_id', tutorId)

        if (error) throw error
        setIsSaved(false)
      } else {
        // Save
        const { error } = await supabase
          .from('saved_tutors')
          .insert({
            parent_id: user.id,
            tutor_id: tutorId
          })

        if (error) throw error
        setIsSaved(true)
      }
    } catch (error) {
      console.error('Error toggling save:', error)
      alert('Failed to save tutor. Please try again.')
    } finally {
      setSavingState(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading tutor profile...</p>
        </div>
      </div>
    )
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tutor not found</h1>
          <p className="text-gray-600 mb-8">
            This tutor profile does not exist or has been removed.
          </p>
          <Link href="/browse">
            <Button>Browse All Tutors</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          {' '}/{' '}
          <Link href="/browse" className="hover:text-blue-600">Browse Tutors</Link>
          {' '}/{' '}
          <span className="text-gray-900">{tutor.headline}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card className="p-6">
              <div className="flex gap-6">
                {/* Photo */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                    {tutor.photo_url ? (
                      <img
                        src={tutor.photo_url}
                        alt={tutor.headline}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl text-gray-400">👤</span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {tutor.headline}
                  </h1>

                  {/* Rating */}
                  {tutor.review_count > 0 && (
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        <Star size={20} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-xl font-bold text-gray-900">
                          {tutor.rating_average.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-gray-600">
                        ({tutor.review_count} {tutor.review_count === 1 ? 'review' : 'reviews'})
                      </span>
                    </div>
                  )}

                  {/* Verification Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutor.id_verified && (
                      <Badge variant="success" icon={<CheckCircle size={14} />}>
                        ID Verified
                      </Badge>
                    )}
                    {tutor.credentials_verified && (
                      <Badge variant="success" icon={<CheckCircle size={14} />}>
                        Credentials Verified
                      </Badge>
                    )}
                    {tutor.background_check_completed && (
                      <Badge variant="success" icon={<CheckCircle size={14} />}>
                        Background Check
                      </Badge>
                    )}
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{tutor.years_experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span className="capitalize">{tutor.location_type}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* About */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-700 whitespace-pre-line">{tutor.bio}</p>
            </Card>

            {/* Subjects & Age Groups */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                What I Teach
              </h2>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Subjects</h3>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map((subject, idx) => (
                    <Badge key={idx} variant="info">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Age Groups</h3>
                <div className="flex flex-wrap gap-2">
                  {tutor.age_groups.map((age, idx) => (
                    <Badge key={idx} variant="default">
                      {age} years
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Teaching Approach */}
            {tutor.teaching_approach.length > 0 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Teaching Approach
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tutor.teaching_approach.map((approach, idx) => (
                    <Badge key={idx} variant="default">
                      {approach}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Credentials */}
            {tutor.credentials.length > 0 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award size={20} />
                  Credentials
                </h2>
                <ul className="space-y-2">
                  {tutor.credentials.map((credential, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                      <span>{credential}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Reviews */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Reviews ({tutor.review_count})
              </h2>

              {reviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Star size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No reviews yet. Be the first to book and review!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                      {/* Review Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i <= review.overall_rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          Parent of {review.child_age}-year-old
                        </span>
                      </div>

                      {/* Review Text */}
                      {review.review_text && (
                        <p className="text-gray-700 mb-3">{review.review_text}</p>
                      )}

                      {/* Dimension Ratings */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">Patience:</span>
                          <span className="font-medium">{review.patience_rating}/5</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">Communication:</span>
                          <span className="font-medium">{review.communication_rating}/5</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">Engagement:</span>
                          <span className="font-medium">{review.engagement_rating}/5</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              {/* Price */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  ${tutor.hourly_rate}
                </div>
                <div className="text-gray-600">per hour</div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mb-6">
                <Link href={`/booking/request?tutor=${tutorId}`} className="block">
                  <Button size="lg" className="w-full">
                    <Calendar size={20} className="mr-2" />
                    Request Lesson
                  </Button>
                </Link>
                <Link href={`/messages/new?tutor=${tutorId}`} className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    <MessageCircle size={20} className="mr-2" />
                    Send Message
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full"
                  onClick={handleSaveToggle}
                  disabled={savingState}
                >
                  <Heart
                    size={20}
                    className={`mr-2 ${isSaved ? 'fill-red-500 text-red-500' : ''}`}
                  />
                  {savingState ? 'Saving...' : isSaved ? 'Saved' : 'Save for Later'}
                </Button>
              </div>

              {/* Safety Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">
                      Safety Tips
                    </h3>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Meet in a public place first</li>
                      <li>• Have a parent present initially</li>
                      <li>• Communicate via platform</li>
                    </ul>
                    <Link href="/safety" className="text-xs text-blue-600 hover:text-blue-700 mt-2 inline-block">
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
