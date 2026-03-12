import { createClient } from '@/lib/supabase/client'
import { TutorProfile, SearchFilters } from '@/types'

export async function fetchTutors(filters?: SearchFilters): Promise<TutorProfile[]> {
  const supabase = createClient()

  let query = supabase
    .from('tutor_profiles')
    .select('*')
    .eq('status', 'approved') // Only show approved tutors

  // Apply filters
  if (filters?.subjects && filters.subjects.length > 0) {
    query = query.overlaps('subjects', filters.subjects)
  }

  if (filters?.age_groups && filters.age_groups.length > 0) {
    query = query.overlaps('age_groups', filters.age_groups)
  }

  if (filters?.location_type && filters.location_type !== 'all') {
    query = query.or(`location_type.eq.${filters.location_type},location_type.eq.both`)
  }

  if (filters?.zip_code) {
    query = query.eq('zip_code', filters.zip_code)
  }

  if (filters?.price_min) {
    query = query.gte('hourly_rate', filters.price_min)
  }

  if (filters?.price_max) {
    query = query.lte('hourly_rate', filters.price_max)
  }

  if (filters?.min_rating) {
    query = query.gte('rating_average', filters.min_rating)
  }

  if (filters?.has_background_check) {
    query = query.eq('background_check_completed', true)
  }

  if (filters?.has_teaching_license) {
    query = query.eq('credentials_verified', true)
  }

  // Sort by rating by default
  query = query.order('rating_average', { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error('Error fetching tutors:', error)
    throw error
  }

  return data as TutorProfile[]
}

export async function fetchTutorById(id: string): Promise<TutorProfile | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('tutor_profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching tutor:', error)
    return null
  }

  return data as TutorProfile
}

export async function searchTutors(query: string): Promise<TutorProfile[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('tutor_profiles')
    .select('*')
    .eq('status', 'approved')
    .or(`headline.ilike.%${query}%,bio.ilike.%${query}%`)
    .order('rating_average', { ascending: false })

  if (error) {
    console.error('Error searching tutors:', error)
    throw error
  }

  return data as TutorProfile[]
}
