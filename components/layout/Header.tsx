'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'
import { Button } from '@/components/ui/Button'
import { User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'

export function Header() {
  const pathname = usePathname()
  const { user, userRole, signOut, loading } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">LearnWell</div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/browse"
              className={`text-sm font-medium transition-colors ${
                pathname === '/browse'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Find Tutors
            </Link>
            <Link
              href="/how-it-works"
              className={`text-sm font-medium transition-colors ${
                pathname === '/how-it-works'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              How It Works
            </Link>
            {!user && (
              <Link
                href="/become-tutor"
                className={`text-sm font-medium transition-colors ${
                  pathname === '/become-tutor'
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Become a Tutor
              </Link>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : user ? (
              /* Logged In - Show User Menu */
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={16} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.email?.split('@')[0]}
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <div className="text-sm font-medium text-gray-900">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {userRole} Account
                        </div>
                      </div>

                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <LayoutDashboard size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">Dashboard</span>
                      </Link>

                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <LogOut size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">Log Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Logged Out - Show Auth Buttons */
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
