export type UserRole = 'parent' | 'tutor' | 'admin'

export type SubjectCategory =
  | 'Math & Reading'
  | 'Test Prep'
  | 'Music Lessons'
  | 'Coding & STEM'
  | 'Languages'
  | 'Art & Enrichment'
  | 'Sports & Fitness'
  | 'Special Education'

export type AgeGroup = '5-7' | '8-10' | '11-13' | '14+'

export type LocationType = 'virtual' | 'in-person' | 'both'

export type BookingStatus = 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled'

export type TutorStatus = 'pending' | 'approved' | 'rejected' | 'suspended'

export interface User {
  id: string
  email: string
  full_name: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface TutorProfile {
  id: string
  user_id: string
  headline: string
  bio: string
  subjects: string[]
  age_groups: AgeGroup[]
  hourly_rate: number
  location_type: LocationType
  zip_code: string
  years_experience: number
  credentials: string[]
  teaching_approach: string[]
  availability: Record<string, string[]> // { "monday": ["9am-12pm", "2pm-5pm"] }
  photo_url?: string
  status: TutorStatus
  id_verified: boolean
  credentials_verified: boolean
  background_check_completed: boolean
  rating_average: number
  review_count: number
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  tutor_id: string
  parent_id: string
  booking_id: string
  overall_rating: number
  patience_rating: number
  communication_rating: number
  engagement_rating: number
  punctuality_rating: number
  knowledge_rating: number
  review_text?: string
  child_age: number
  would_book_again: boolean
  created_at: string
}

export interface Booking {
  id: string
  tutor_id: string
  parent_id: string
  child_age: number
  subject: string
  needs_description: string
  preferred_days: string[]
  preferred_times: string[]
  location_preference: LocationType
  status: BookingStatus
  tutor_response?: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  sender_id: string
  recipient_id: string
  booking_id?: string
  content: string
  read: boolean
  created_at: string
}

export interface SavedTutor {
  id: string
  parent_id: string
  tutor_id: string
  created_at: string
}

export interface SearchFilters {
  subjects?: string[]
  age_groups?: AgeGroup[]
  location_type?: LocationType | 'all'
  zip_code?: string
  price_min?: number
  price_max?: number
  has_background_check?: boolean
  has_teaching_license?: boolean
  min_rating?: number
}
