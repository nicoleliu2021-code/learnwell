import { createClient } from '@/lib/supabase/client'
import { Review } from '@/types'

export async function fetchReviewsByTutorId(tutorId: string): Promise<Review[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('tutor_id', tutorId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reviews:', error)
    throw error
  }

  return data as Review[]
}
