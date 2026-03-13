'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SUBJECTS, AGE_GROUPS, TEACHING_APPROACHES, DAYS_OF_WEEK } from '@/lib/constants'
import { CheckCircle, Users, DollarSign, Calendar, Shield, Zap, TrendingUp } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthContext'
import { createClient } from '@/lib/supabase/client'

export default function BecomeTutorPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    zipCode: '',

    // Profile
    headline: '',
    bio: '',
    yearsExperience: '',
    subjects: [] as string[],
    ageGroups: [] as string[],
    teachingApproach: [] as string[],

    // Logistics
    locationType: 'both',
    hourlyRate: '',
    availability: {} as Record<string, boolean>,

    // Credentials
    credentials: [] as string[],
    credentialInput: '',
  })

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

    if (!user) {
      router.push('/login')
      return
    }

    setError('')
    setSubmitting(true)

    const supabase = createClient()

    try {
      // Create tutor profile
      const { error: insertError } = await supabase
        .from('tutor_profiles')
        .insert({
          user_id: user.id,
          headline: formData.headline,
          bio: formData.bio,
          subjects: formData.subjects,
          age_groups: formData.ageGroups,
          teaching_approach: formData.teachingApproach,
          credentials: formData.credentials,
          years_experience: parseInt(formData.yearsExperience) || 0,
          hourly_rate: parseFloat(formData.hourlyRate) || 0,
          location_type: formData.locationType,
          status: 'pending', // Admin must approve
          rating_average: 0,
          review_count: 0,
          id_verified: false,
          credentials_verified: false,
          background_check_completed: false
        })

      if (insertError) throw insertError

      // Redirect to pending approval page
      router.push('/tutor/pending-approval')
    } catch (err: any) {
      console.error('Error creating profile:', err)
      setError(err.message || 'Failed to create profile. Please try again.')
      setSubmitting(false)
    }
  }

  const totalSteps = 4

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Teach More Students. Keep 100% of Your Earnings.</h1>
          <p className="text-xl text-blue-100 mb-6">
            Join 200+ tutors connecting with 500+ local families every month—completely free
          </p>
          <div className="flex items-center justify-center gap-8 text-blue-100 text-sm flex-wrap mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} />
              <span>No platform fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={18} />
              <span>Approved in 24-48 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={18} />
              <span>Average 3-8 students/month</span>
            </div>
          </div>
          <p className="text-sm text-blue-200">
            💰 Tutors earn $800-2,500/month on average
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">High Demand for Quality Tutors</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">🔥 45</div>
                <div className="text-xs text-gray-600">Math requests/week</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">🎹 32</div>
                <div className="text-xs text-gray-600">Piano requests/week</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">💻 28</div>
                <div className="text-xs text-gray-600">Coding requests/week</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">📚 21</div>
                <div className="text-xs text-gray-600">Test prep requests/week</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Get Discovered by 500+ Families
              </h3>
              <p className="text-gray-600 text-sm">
                Parents actively searching for tutors will find you—no more hunting for students yourself
              </p>
            </div>
            <div>
              <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Keep 100% of Your Earnings
              </h3>
              <p className="text-gray-600 text-sm">
                No commissions, no fees. Set your rates, parents pay you directly. Unlike Wyzant (25% fee) or Care.com (subscription fees)
              </p>
            </div>
            <div>
              <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Get Approved in 24-48 Hours
              </h3>
              <p className="text-gray-600 text-sm">
                Quick verification process. Start receiving parent inquiries within days, not weeks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {step} of {totalSteps}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round((step / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit}>
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Personal Information
                    </h2>
                    <p className="text-gray-600">
                      Tell us a bit about yourself
                    </p>
                  </div>

                  <Input
                    label="Full Name *"
                    type="text"
                    placeholder="John Smith"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    required
                  />

                  <Input
                    label="Email Address *"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    required
                  />

                  <Input
                    label="Phone Number *"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    required
                  />

                  <Input
                    label="Zip Code *"
                    type="text"
                    placeholder="12345"
                    value={formData.zipCode}
                    onChange={(e) => updateField('zipCode', e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Step 2: Teaching Profile */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Teaching Profile
                    </h2>
                    <p className="text-gray-600">
                      Help parents understand your teaching style
                    </p>
                  </div>

                  <Input
                    label="Profile Headline *"
                    type="text"
                    placeholder="Experienced Math Tutor for Elementary Students"
                    value={formData.headline}
                    onChange={(e) => updateField('headline', e.target.value)}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      About You *
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={6}
                      placeholder="Tell parents about your teaching experience, philosophy, and what makes you a great tutor..."
                      value={formData.bio}
                      onChange={(e) => updateField('bio', e.target.value)}
                      required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {formData.bio.length} / 500 characters
                    </p>
                  </div>

                  <Input
                    label="Years of Experience *"
                    type="number"
                    placeholder="5"
                    value={formData.yearsExperience}
                    onChange={(e) => updateField('yearsExperience', e.target.value)}
                    required
                    min="0"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Subjects You Teach * (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                      {SUBJECTS.map((subject) => (
                        <label key={subject} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.subjects.includes(subject)}
                            onChange={() => toggleArrayField('subjects', subject)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{subject}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Age Groups * (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {AGE_GROUPS.map((age) => (
                        <label key={age} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.ageGroups.includes(age)}
                            onChange={() => toggleArrayField('ageGroups', age)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{age} years</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Teaching Approach (Optional)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {TEACHING_APPROACHES.map((approach) => (
                        <label key={approach} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.teachingApproach.includes(approach)}
                            onChange={() => toggleArrayField('teachingApproach', approach)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{approach}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Logistics */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Logistics & Availability
                    </h2>
                    <p className="text-gray-600">
                      Set your rate and availability
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Location Type *
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'virtual', label: 'Virtual Only (Online)' },
                        { value: 'in-person', label: 'In-Person Only' },
                        { value: 'both', label: 'Both Virtual and In-Person' },
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="locationType"
                            value={option.value}
                            checked={formData.locationType === option.value}
                            onChange={(e) => updateField('locationType', e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Input
                    label="Hourly Rate * (USD)"
                    type="number"
                    placeholder="50"
                    value={formData.hourlyRate}
                    onChange={(e) => updateField('hourlyRate', e.target.value)}
                    required
                    min="10"
                    max="300"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      General Availability (You can update this later)
                    </label>
                    <p className="text-sm text-gray-600 mb-3">
                      Select the days you're typically available
                    </p>
                    <div className="space-y-2">
                      {DAYS_OF_WEEK.map((day) => (
                        <label key={day} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.availability[day] || false}
                            onChange={(e) =>
                              updateField('availability', {
                                ...formData.availability,
                                [day]: e.target.checked,
                              })
                            }
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Credentials */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Credentials & Qualifications
                    </h2>
                    <p className="text-gray-600">
                      List your education, certifications, and relevant experience
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add Credentials (e.g., Bachelor's in Education, Teaching License, etc.)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="e.g., B.A. in Mathematics from University of..."
                        value={formData.credentialInput}
                        onChange={(e) => updateField('credentialInput', e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addCredential()
                          }
                        }}
                      />
                      <Button type="button" onClick={addCredential}>
                        Add
                      </Button>
                    </div>
                  </div>

                  {formData.credentials.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Your Credentials:
                      </h3>
                      <ul className="space-y-2">
                        {formData.credentials.map((credential, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg"
                          >
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="flex-1 text-sm text-gray-700">{credential}</span>
                            <button
                              type="button"
                              onClick={() => removeCredential(idx)}
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm mb-1">
                          Verification Process
                        </h3>
                        <p className="text-xs text-gray-600">
                          After you submit, we'll verify your credentials and may ask for supporting documents.
                          Background checks are optional but recommended.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={() => setStep(step + 1)}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button type="submit" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </section>
    </div>
  )
}
