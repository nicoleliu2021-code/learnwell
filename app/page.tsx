'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CATEGORIES } from '@/lib/constants'
import { Search, CheckCircle, Users, Star, Shield, Award } from 'lucide-react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if (searchQuery) {
      window.location.href = `/browse?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Find the perfect tutor for your child
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Vetted local tutors and teachers for academics, music, coding, and more — all in one trusted place
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-2 flex items-center gap-2 max-w-2xl mx-auto mb-8">
              <Search className="ml-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="What does your child need help with?"
                className="flex-1 px-3 py-3 outline-none text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} size="md">
                Search
              </Button>
            </div>

            {/* Trust Bar */}
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600 flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                <span>All tutors vetted</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-green-600" />
                <span>Background checked</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-green-600" />
                <span>Real parent reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-green-600" />
                <span>Try risk-free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Browse Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            What are you looking for?
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Browse tutors and teachers by subject area
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <Link key={category.id} href={`/browse?category=${category.id}`}>
                <Card hover className="p-6 text-center h-full">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {category.subjects.join(', ')}
                  </p>
                  <span className="text-blue-600 text-sm font-medium">
                    Browse tutors →
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Search & Compare
              </h3>
              <p className="text-gray-600">
                Filter by subject, age, location, and price. View credentials, reviews, and teaching styles.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Review Profiles
              </h3>
              <p className="text-gray-600">
                See detailed profiles with credentials, parent reviews, and teaching approach.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Book a Trial
              </h3>
              <p className="text-gray-600">
                Request a lesson, meet the tutor, and find the right fit for your child.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your child's safety is our priority
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            All tutors complete identity verification and credential checks. Many have completed background screenings.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="success" icon={<CheckCircle size={14} />}>
              ID Verified
            </Badge>
            <Badge variant="success" icon={<CheckCircle size={14} />}>
              Credentials Checked
            </Badge>
            <Badge variant="success" icon={<CheckCircle size={14} />}>
              Background Screened
            </Badge>
          </div>
          <Link href="/safety" className="inline-block mt-6">
            <Button variant="outline">Learn about our vetting process</Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Parents trust LearnWell
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                Finding a piano teacher used to mean hours on Facebook groups. LearnWell made it so easy to compare options and find the perfect fit for my daughter.
              </p>
              <p className="text-sm text-gray-500">— Sarah M., mom of 2</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                My son was struggling with math. Within a week of using LearnWell, we found an amazing tutor who really understands how to explain concepts clearly.
              </p>
              <p className="text-sm text-gray-500">— Michael T., dad of 3</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                I love that I can see reviews from other parents and verify credentials before booking. The peace of mind is worth everything.
              </p>
              <p className="text-sm text-gray-500">— Jennifer L., mom of 1</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA for Tutors */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Are you a tutor or instructor?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join LearnWell and connect with local families
          </p>
          <Link href="/become-tutor">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Apply to Teach
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">LearnWell</div>
              <p className="text-sm">
                Find trusted tutors and teachers for your child — from homework help to piano lessons.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">For Parents</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/browse" className="hover:text-white">Find Tutors</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/safety" className="hover:text-white">Safety</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">For Tutors</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/become-tutor" className="hover:text-white">Become a Tutor</Link></li>
                <li><Link href="/tutor-resources" className="hover:text-white">Resources</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 LearnWell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
