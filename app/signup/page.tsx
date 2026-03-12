'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthContext'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { User, Briefcase } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [role, setRole] = useState<'parent' | 'tutor'>('parent')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    const { error: signUpError } = await signUp(
      formData.email,
      formData.password,
      formData.fullName,
      role
    )

    if (signUpError) {
      setError(signUpError.message || 'Failed to sign up')
      setLoading(false)
    } else {
      // Redirect based on role
      if (role === 'tutor') {
        router.push('/tutor/dashboard')
      } else {
        router.push('/parent/dashboard')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join LearnWell today</p>
        </div>

        {/* Role Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            I am a...
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole('parent')}
              className={`p-4 rounded-lg border-2 transition-all ${
                role === 'parent'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <User className={`mx-auto mb-2 ${role === 'parent' ? 'text-blue-600' : 'text-gray-400'}`} size={32} />
              <div className={`font-medium ${role === 'parent' ? 'text-blue-600' : 'text-gray-700'}`}>
                Parent
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Find tutors for my child
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRole('tutor')}
              className={`p-4 rounded-lg border-2 transition-all ${
                role === 'tutor'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Briefcase className={`mx-auto mb-2 ${role === 'tutor' ? 'text-blue-600' : 'text-gray-400'}`} size={32} />
              <div className={`font-medium ${role === 'tutor' ? 'text-blue-600' : 'text-gray-700'}`}>
                Tutor
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Offer my services
              </div>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="John Smith"
          />

          <Input
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
          />

          <Input
            label="Password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="At least 6 characters"
          />

          <Input
            label="Confirm Password"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Re-enter password"
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Log In
          </Link>
        </div>
      </Card>
    </div>
  )
}
