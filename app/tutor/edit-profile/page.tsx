'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SUBJECTS, AGE_GROUPS, TEACHING_APPROACHES } from '@/lib/constants'
import { useAuth } from '@/lib/auth/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { TutorProfile } from '@/types'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function EditProfilePage() {
  const router = useRouter()
  const { user, userRole, loading: authLoading } = useAuth()
  const [profile, setProfile] = useState<TutorProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    headline: '',
    bio: '',
    yearsExperience: '',
    subjects: [] as string[],
    ageGroups: [] as string[],
    teachingApproach: [] as string[],
    locationType: 'both',
    hourlyRate: '',
    zipCode: '',
    credentials: [] as string[],
    credentialInput: '',
  })

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login')
      } else if (userRole !== 'tutor') {
        router.push('/dashboard')
      } else {
        loadProfile()
      }
    }
  }, [user, userRole, authLoading, router])

  const loadProfile = async () => {
    if (!user) return

    const supabase = createClient()
    setLoading(true)

    try {
      const { data: profileData, error: profileError } = await supabase
        .from('tutor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (profileError) throw profileError

      setProfile(profileData)

      // Populate form with existing data
      setFormData({
        headline: profileData.headline || '',
        bio: profileData.bio || '',
        yearsExperience: profileData.years_experience?.toString() || '',
        subjects: profileData.subjects || [],
        ageGroups: profileData.age_groups || [],
        teachingApproach: profileData.teaching_approach || [],
        locationType: profileData.location_type || 'both',
        hourlyRate: profileData.hourly_rate?.toString() || '',
        zipCode: profileData.zip_code || '',
        credentials: profileData.credentials || [],
        credentialInput: '',
      })
    } catch (error) {
      console.error('Error loading profile:', error)
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayField = (field: 'subjects' | 'ageGroups' | 'teachingApproach', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }))
  }

  const addCredential = () => {
    if (formData.credentialInput.trim()) {
      setFormData(prev => ({
        ...prev,
        credentials: [...prev.credentials, prev.credentialInput.trim()],
        credentialInput: ''
      }))
    }
  }

  const removeCredential = (index: number) => {
    setFormData(prev => ({
      ...prev,
      credentials: prev.credentials.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !profile) {
      return
    }

    setError('')
    setSuccess(false)
    setSubmitting(true)

    const supabase = createClient()

    try {
      const { error: updateError } = await supabase
        .from('tutor_profiles')
        .update({
          headline: formData.headline,
          bio: formData.bio,
          subjects: formData.subjects,
          age_groups: formData.ageGroups,
          teaching_approach: formData.teachingApproach,
          credentials: formData.credentials,
          years_experience: parseInt(formData.yearsExperience) || 0,
          hourly_rate: parseFloat(formData.hourlyRate) || 0,
          location_type: formData.locationType,
          zip_code: formData.zipCode,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id)

      if (updateError) throw updateError

      setSuccess(true)
      setTimeout(() => router.push('/tutor/dashboard'), 1500)
    } catch (err: any) {
      console.error('Error updating profile:', err)
      setError(err.message || 'Failed to update profile. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Profile Found</h1>
          <p className="text-gray-600 mb-8">
            You need to create a tutor profile first.
          </p>
          <Link href="/become-tutor">
            <Button size="lg">Create Tutor Profile</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/tutor/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Your Profile</h1>
          <p className="text-gray-600">Update your tutor information</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                Profile updated successfully! Redirecting...
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {/* Profile Headline */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Headline</h2>
              <Input
                label="Headline"
                type="text"
                required
                value={formData.headline}
                onChange={(e) => updateField('headline', e.target.value)}
                placeholder="e.g., Experienced Math Tutor | Former Teacher | K-8"
                maxLength={60}
              />
              <p className="mt-1 text-sm text-gray-500">
                This is the first thing parents see (60 characters max)
              </p>
            </div>

            {/* Bio */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About You</h2>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                placeholder="Tell parents about your teaching philosophy, experience, and what makes you a great tutor..."
                rows={6}
                maxLength={1000}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.bio.length}/1000 characters
              </p>
            </div>

            {/* Subjects */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Subjects You Teach</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SUBJECTS.map((subject) => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => toggleArrayField('subjects', subject)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      formData.subjects.includes(subject)
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Groups */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Age Groups You Work With</h2>
              <div className="grid grid-cols-2 gap-3">
                {AGE_GROUPS.map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => toggleArrayField('ageGroups', age)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      formData.ageGroups.includes(age)
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience & Rate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Years of Experience"
                type="number"
                required
                min="0"
                value={formData.yearsExperience}
                onChange={(e) => updateField('yearsExperience', e.target.value)}
                placeholder="5"
              />
              <div>
                <Input
                  label="Hourly Rate (USD)"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.hourlyRate}
                  onChange={(e) => updateField('hourlyRate', e.target.value)}
                  placeholder="50"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Your take-home rate (we don't charge yet)
                </p>
              </div>
            </div>

            {/* Location Type */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Teaching Location</h2>
              <div className="grid grid-cols-3 gap-4">
                {['virtual', 'in-person', 'both'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateField('locationType', type)}
                    className={`p-4 rounded-lg border-2 text-sm font-medium transition-all ${
                      formData.locationType === type
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {type === 'in-person' ? 'In-Person' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Zip Code */}
            <Input
              label="Zip Code"
              type="text"
              required
              value={formData.zipCode}
              onChange={(e) => updateField('zipCode', e.target.value)}
              placeholder="94102"
              maxLength={10}
            />

            {/* Teaching Approach */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Teaching Approach</h2>
              <div className="grid grid-cols-2 gap-3">
                {TEACHING_APPROACHES.map((approach) => (
                  <button
                    key={approach}
                    type="button"
                    onClick={() => toggleArrayField('teachingApproach', approach)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      formData.teachingApproach.includes(approach)
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {approach}
                  </button>
                ))}
              </div>
            </div>

            {/* Credentials */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Credentials</h2>
              <div className="flex gap-2 mb-4">
                <Input
                  value={formData.credentialInput}
                  onChange={(e) => updateField('credentialInput', e.target.value)}
                  placeholder="e.g., BA in Mathematics from UC Berkeley"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addCredential}
                  disabled={!formData.credentialInput.trim()}
                >
                  Add
                </Button>
              </div>
              {formData.credentials.length > 0 && (
                <div className="space-y-2">
                  {formData.credentials.map((cred, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">{cred}</span>
                      <button
                        type="button"
                        onClick={() => removeCredential(index)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                size="lg"
                className="flex-1"
                disabled={submitting}
              >
                {submitting ? (
                  'Saving...'
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              <Link href="/tutor/dashboard">
                <Button type="button" variant="outline" size="lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
