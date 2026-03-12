import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TutorProfile } from '@/types'
import { MapPin, Star, CheckCircle, Heart } from 'lucide-react'

interface TutorCardProps {
  tutor: TutorProfile
  onSave?: (tutorId: string) => void
  isSaved?: boolean
}

export function TutorCard({ tutor, onSave, isSaved = false }: TutorCardProps) {
  return (
    <Card hover className="p-6">
      <div className="flex gap-4">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            {tutor.photo_url ? (
              <img
                src={tutor.photo_url}
                alt={`${tutor.headline}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl text-gray-400">👤</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <Link href={`/tutor/${tutor.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  {tutor.headline}
                </h3>
              </Link>

              {/* Rating */}
              {tutor.review_count > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-gray-900">
                      {tutor.rating_average.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({tutor.review_count} {tutor.review_count === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}
            </div>

            {/* Save Button */}
            {onSave && (
              <button
                onClick={() => onSave(tutor.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={isSaved ? 'Unsave tutor' : 'Save tutor'}
              >
                <Heart
                  size={20}
                  className={isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                />
              </button>
            )}
          </div>

          {/* Bio excerpt */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {tutor.bio}
          </p>

          {/* Subjects */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tutor.subjects.slice(0, 3).map((subject, idx) => (
              <Badge key={idx} variant="default">
                {subject}
              </Badge>
            ))}
            {tutor.subjects.length > 3 && (
              <Badge variant="default">+{tutor.subjects.length - 3} more</Badge>
            )}
          </div>

          {/* Age Groups */}
          <div className="text-sm text-gray-600 mb-3">
            <span className="font-medium">Ages:</span>{' '}
            {tutor.age_groups.join(', ')}
          </div>

          {/* Verification Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {tutor.id_verified && (
              <Badge variant="success" icon={<CheckCircle size={12} />}>
                ID Verified
              </Badge>
            )}
            {tutor.credentials_verified && (
              <Badge variant="success" icon={<CheckCircle size={12} />}>
                Credentials Verified
              </Badge>
            )}
            {tutor.background_check_completed && (
              <Badge variant="success" icon={<CheckCircle size={12} />}>
                Background Check
              </Badge>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${tutor.hourly_rate}
              </span>
              <span className="text-gray-600">/hr</span>
              <div className="text-xs text-gray-500 mt-1">
                <MapPin size={12} className="inline" /> {tutor.location_type}
              </div>
            </div>
            <Link href={`/tutor/${tutor.id}`}>
              <Button size="md">View Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
