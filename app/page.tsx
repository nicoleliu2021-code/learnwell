'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CATEGORIES } from '@/lib/constants'
import { Search, CheckCircle, Users, Star, Shield, Award, Zap } from 'lucide-react'

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
              Find a Tutor in Hours, Not Days
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Stop searching Facebook groups. Compare 200+ verified tutors side-by-side, read real parent reviews, and book with confidence—all in one place.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-2 flex items-center gap-2 max-w-2xl mx-auto mb-8">
              <Search className="ml-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Try: piano teacher, math tutor, or coding for kids"
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
                <span>100% free for parents</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-green-600" />
                <span>500+ families served</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-green-600" />
                <span>85% respond within 4 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-green-600" />
                <span>All tutors verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-blue-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">200+ Tutors</div>
              <div className="text-gray-600">All subjects covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">500+ Families</div>
              <div className="text-gray-600">Successfully matched</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4.8★ Average</div>
              <div className="text-gray-600">Parent satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                <Zap size={28} className="text-blue-600" />2-4 Hours
              </div>
              <div className="text-gray-600">Average response time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Browse Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 text-center mb-12">
            From homework help to extracurriculars — find the right tutor for any subject
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <Link key={category.id} href={`/browse?category=${category.id}`}>
                <Card hover className="p-6 text-center h-full transition-all hover:shadow-lg">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {category.subjects.join(', ')}
                  </p>
                  <span className="text-blue-600 text-sm font-semibold inline-flex items-center gap-1">
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
                Search all subjects in one place
              </h3>
              <p className="text-gray-600">
                No more Facebook groups or Google searches. Browse tutors for academics, music, coding, sports, and more — all in one marketplace.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Compare profiles & read reviews
              </h3>
              <p className="text-gray-600">
                See credentials, parent reviews, teaching styles, and rates side-by-side. Find the perfect match for your child's needs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Book a lesson with confidence
              </h3>
              <p className="text-gray-600">
                Request a trial lesson, message the tutor, and schedule your first session. Most tutors respond within hours.
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
            Trust and transparency built in
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Browse verified profiles, read honest parent reviews, and see credentials before you book. Many tutors have completed additional background screenings for extra peace of mind.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <div className="text-left">
              <CheckCircle className="text-green-600 mb-2" size={24} />
              <h3 className="font-semibold text-gray-900 mb-1">Verified Profiles</h3>
              <p className="text-sm text-gray-600">Identity and credentials confirmed</p>
            </div>
            <div className="text-left">
              <Star className="text-green-600 mb-2" size={24} />
              <h3 className="font-semibold text-gray-900 mb-1">Real Reviews</h3>
              <p className="text-sm text-gray-600">Honest feedback from real parents</p>
            </div>
            <div className="text-left">
              <Shield className="text-green-600 mb-2" size={24} />
              <h3 className="font-semibold text-gray-900 mb-1">Background Checks</h3>
              <p className="text-sm text-gray-600">Many tutors screened (optional)</p>
            </div>
          </div>
          <Link href="/safety" className="inline-block mt-2">
            <Button variant="outline">Learn about safety & vetting</Button>
          </Link>
        </div>
      </section>

      {/* Why LearnWell Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Why parents choose LearnWell
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Stop juggling Facebook groups, Google searches, and word-of-mouth recommendations. Find everyone in one place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                All subjects, one search
              </h3>
              <p className="text-gray-600">
                No more hunting across Facebook, Nextdoor, and Google. Browse tutors for math, piano, coding, Spanish, and everything in between.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Compare side-by-side
              </h3>
              <p className="text-gray-600">
                See rates, reviews, credentials, and availability all in one place. Make an informed decision without the back-and-forth.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Verified & reviewed
              </h3>
              <p className="text-gray-600">
                Read honest reviews from real parents. See verified credentials. Book with confidence knowing you're making the right choice.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA for Tutors */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Teach More Students. Keep 100% of Your Earnings.
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 200+ tutors connecting with 500+ local families every month—completely free
          </p>
          <div className="flex justify-center gap-8 mb-8 text-blue-50">
            <div className="text-center">
              <CheckCircle className="mx-auto mb-2" size={24} />
              <p className="text-sm">No platform fees</p>
            </div>
            <div className="text-center">
              <Zap className="mx-auto mb-2" size={24} />
              <p className="text-sm">Approved in 24-48 hours</p>
            </div>
            <div className="text-center">
              <Award className="mx-auto mb-2" size={24} />
              <p className="text-sm">Keep 100% earnings</p>
            </div>
          </div>
          <Link href="/become-tutor">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg"
            >
              Apply to Teach on LearnWell
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
