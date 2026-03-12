import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  UserPlus,
  Search,
  Calendar,
  MessageCircle,
  CheckCircle,
  Shield,
  Star,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-green-100 text-sm font-medium mb-6">
            Simple • Trusted • Effective
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100">
            How LearnWell Works
          </h1>
          <p className="text-xl md:text-2xl text-green-50 max-w-2xl mx-auto leading-relaxed">
            Connecting parents with trusted tutors in three simple steps
          </p>
        </div>
      </section>

      {/* For Parents */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-semibold mb-4">
              For Parents
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect Tutor
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Three simple steps to connect with vetted, experienced tutors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
              <Card className="relative p-8 text-center hover:shadow-2xl transition-all duration-300 bg-white border-2 border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-10 h-10 text-white" />
                </div>
                <div className="inline-block px-3 py-1 bg-green-100 rounded-full text-green-700 font-bold text-sm mb-3">
                  Step 1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Browse Tutors
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Search by subject, location, price range, and age group. View detailed profiles with credentials, reviews, and teaching approaches.
                </p>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
              <Card className="relative p-8 text-center hover:shadow-2xl transition-all duration-300 bg-white border-2 border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <div className="inline-block px-3 py-1 bg-green-100 rounded-full text-green-700 font-bold text-sm mb-3">
                  Step 2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Request a Lesson
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Send a booking request with your child's needs, preferred schedule, and any special requirements. Tutors respond within 24-48 hours.
                </p>
              </Card>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
              <Card className="relative p-8 text-center hover:shadow-2xl transition-all duration-300 bg-white border-2 border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <div className="inline-block px-3 py-1 bg-green-100 rounded-full text-green-700 font-bold text-sm mb-3">
                  Step 3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Coordinate & Start
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Once accepted, message the tutor to finalize details. Coordinate payment, schedule, and location. Your child begins learning!
                </p>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/browse">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Find a Tutor Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Tutors */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-semibold mb-4">
              For Tutors
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Grow Your Business
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Join our trusted platform and connect with motivated families
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
              <Card className="relative p-8 text-center hover:shadow-2xl transition-all duration-300 bg-white border-2 border-emerald-100">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <UserPlus className="w-10 h-10 text-white" />
                </div>
                <div className="inline-block px-3 py-1 bg-emerald-100 rounded-full text-emerald-700 font-bold text-sm mb-3">
                  Step 1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Create Your Profile
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Sign up and complete your tutor profile. Share your experience, credentials, subjects you teach, and set your own rates.
                </p>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
              <Card className="relative p-8 text-center hover:shadow-2xl transition-all duration-300 bg-white border-2 border-emerald-100">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <div className="inline-block px-3 py-1 bg-emerald-100 rounded-full text-emerald-700 font-bold text-sm mb-3">
                  Step 2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Get Approved
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our team reviews your profile to ensure quality. We verify credentials and check references. Approval typically takes 1-2 days.
                </p>
              </Card>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
              <Card className="relative p-8 text-center hover:shadow-2xl transition-all duration-300 bg-white border-2 border-emerald-100">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <div className="inline-block px-3 py-1 bg-emerald-100 rounded-full text-emerald-700 font-bold text-sm mb-3">
                  Step 3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Receive Requests
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Parents find you and send booking requests. Review each request, accept what works for you, and coordinate directly with families.
                </p>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/become-tutor">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Become a Tutor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/50"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />
              Trust & Safety
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Safety is Our Priority
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              We take comprehensive measures to ensure a secure and trusted environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 bg-gradient-to-br from-white to-green-50/30">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Verified Tutors
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                All tutors are manually reviewed and credentials verified before approval
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 bg-gradient-to-br from-white to-green-50/30">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Parent Reviews
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Real feedback from families helps you make informed decisions
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 bg-gradient-to-br from-white to-green-50/30">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Secure Messaging
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Communicate securely through our platform without sharing personal info
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 bg-gradient-to-br from-white to-green-50/30">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Secure Payments
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Optional payment processing keeps transactions safe and transparent
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-semibold mb-4">
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Common Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to know about LearnWell
            </p>
          </div>

          <div className="space-y-4">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 bg-white">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                How much does LearnWell cost?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                LearnWell is free to use for both parents and tutors. Parents pay tutors directly at their posted rates. We may introduce a small platform fee in the future to support ongoing improvements.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-emerald-500 bg-white">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                How do I pay tutors?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Currently, parents coordinate payment directly with tutors (via Venmo, Zelle, cash, or check). Secure in-platform payments will be available soon for added convenience.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-teal-500 bg-white">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                What subjects are available?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                LearnWell covers academic subjects (math, reading, writing, science, test prep) and enrichment activities (music, art, coding, chess, sports coaching). Browse to see available tutors in your area.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 bg-white">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                Can tutors teach virtually?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! Many tutors offer virtual, in-person, or both. You can filter by location preference when browsing.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-emerald-500 bg-white">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                What if I'm not satisfied with a tutor?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You're never locked in. Try a trial session first, and if it's not the right fit, you can search for another tutor at no cost. We want every family to find their perfect match.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-green-100 font-semibold mb-6">
            Join Our Community Today
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl text-green-50 mb-10 max-w-2xl mx-auto">
            Join thousands of families and tutors building brighter futures together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/browse">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50 border-0 px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Find a Tutor
              </Button>
            </Link>
            <Link href="/become-tutor">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Become a Tutor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
