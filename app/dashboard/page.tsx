'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'

export default function DashboardPage() {
  const router = useRouter()
  const { user, userRole, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
      } else if (userRole === 'tutor') {
        router.push('/tutor/dashboard')
      } else if (userRole === 'parent') {
        router.push('/parent/dashboard')
      } else if (userRole === 'admin') {
        router.push('/admin/dashboard')
      }
    }
  }, [user, userRole, loading, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}
