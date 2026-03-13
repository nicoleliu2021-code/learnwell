import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TutorProfile } from '@/types'
import { Star, CheckCircle, Heart, Clock, Zap } from 'lucide-react'

interface TutorCardProps {
  tutor: TutorProfile
  onSave?: (tutorId: string) => void
  isSaved?: boolean
}

export function TutorCard({ tutor, onSave, isSaved = false }: TutorCardProps) {
  // Simulate response time based on tutor rating (for demo purposes)
  const getResponseBadge = () => {
    if (tutor.rating_average >= 4.8 && tutor.review_count >= 10) {
      return { text: 'Usually responds in 2 hours', variant: 'success' as const, icon: <Zap size={12} /> }
    } else if (tutor.rating_average >= 4.5 && tutor.review_count >= 5) {
      return { text: 'Responds within 24 hours', variant: 'default' as const, icon: <Clock size={12} /> }
    }
    return null
  }

  const responseBadge = getResponseBadge()

  return (
    <Card hover className="p-6">
      <div className="flex gap-6">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="w-28 h-28 rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
            {tutor.photo_url ? (
              <img
                src={tutor.photo_url}
                alt={`${tutor.headline}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl text-gray-400">👤</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <Link href={`/tutor/${tutor.id}`}>
                <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-1">
                  {tutor.headline}
                </h3>
              </Link>

              {/* Rating and response time in one line */}
              <div className="flex items-center gap-3 flex-wrap mb-2">
                {tutor.review_count > 0 && (
                  <div className="flex items-center gap-1">
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">
                      {tutor.rating_average.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({tutor.review_count})
                    </span>
                  </div>
                )}
                {responseBadge && (
                  <Badge variant={responseBadge.variant} icon={responseBadge.icon} className="text-xs">
                    {responseBadge.text}
                  </Badge>
                )}
              </div>
            </div>

            {/* Save Button */}
            {onSave && (
              <button
                onClick={() => onSave(tutor.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={isSaved ? 'Unsave tutor' : 'Save tutor'}
              >
                <Heart
                  size={22}
                  className={isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                />
              </button>
            )}
          </div>

          {/* Experience badge */}
          <div className="text-sm text-gray-600 mb-3">
            <span className="font-medium">{tutor.years_experience} years teaching</span>
            {' • '}
            <span className="capitalize">{tutor.location_type}</span>
          </div>

          {/* Bio excerpt */}
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">
            {tutor.bio}
          </p>

          {/* Subjects */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tutor.subjects.slice(0, 4).map((subject, idx) => (
              <Badge key={idx} variant="info" className="text-xs">
                {subject}
              </Badge>
            ))}
            {tutor.subjects.length > 4 && (
              <Badge variant="default" className="text-xs">+{tutor.subjects.length - 4}</Badge>
            )}
          </div>

          {/* Age Groups */}
          <div className="text-sm text-gray-600 mb-3">
            <span className="font-medium">Ages:</span>{' '}
            {tutor.age_groups.join(', ')} years
          </div>

          {/* Verification Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {tutor.id_verified && (
              <Badge variant="success" icon={<CheckCircle size={12} />} className="text-xs">
                Verified
              </Badge>
            )}
            {tutor.credentials_verified && (
              <Badge variant="success" icon={<CheckCircle size={12} />} className="text-xs">
                Credentials
              </Badge>
            )}
            {tutor.background_check_completed && (
              <Badge variant="success" icon={<CheckCircle size={12} />} className="text-xs">
                Background Check
              </Badge>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">
                  ${tutor.hourly_rate}
                </span>
                <span className="text-gray-600">/hour</span>
              </div>
            </div>
            <Link href={`/tutor/${tutor.id}`}>
              <Button size="lg" className="px-6">View Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
