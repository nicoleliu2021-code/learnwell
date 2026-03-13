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
  DollarSign,
  Zap
} from 'lucide-react'
import Link from 'next/link'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-green-100 text-sm font-medium mb-6">
            <span className="flex items-center gap-1.5">
              <Zap size={14} />
              Find tutors in hours
            </span>
            <span className="text-green-200">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} />
              100% free
            </span>
            <span className="text-green-200">•</span>
            <span className="flex items-center gap-1.5">
              <Star size={14} />
              500+ happy families
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100">
            How LearnWell Works
          </h1>
          <p className="text-xl md:text-2xl text-green-50 max-w-2xl mx-auto leading-relaxed mb-6">
            Connecting parents with 200+ trusted tutors in three simple steps
          </p>
          <div className="flex items-center justify-center gap-6 text-green-100 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} />
              <span>Free for parents</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} />
              <span>500+ families served</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={18} />
              <span>Responses within hours</span>
            </div>
          </div>
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
                <p className="text-gray-600 leading-relaxed mb-4">
                  Search by subject, location, price range, and age group. View detailed profiles with credentials, reviews, and teaching approaches.
                </p>
                <ul className="text-left text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Compare 200+ tutors in one place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>See real parent reviews & ratings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Filter by price, location & subject</span>
                  </li>
                </ul>
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
                <p className="text-gray-600 leading-relaxed mb-4">
                  Send a booking request with your child's needs, preferred schedule, and any special requirements. Tutors respond within 24-48 hours.
                </p>
                <ul className="text-left text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>No commitment — just ask questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Most tutors respond within 2-4 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>100% free — no platform fees</span>
                  </li>
                </ul>
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
                <p className="text-gray-600 leading-relaxed mb-4">
                  Once accepted, message the tutor to finalize details. Coordinate payment, schedule, and location. Your child begins learning!
                </p>
                <ul className="text-left text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Schedule that fits your family</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Virtual or in-person — your choice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Pay tutors directly (no middleman)</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/browse">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Find a Tutor Now — It's Free
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-3">No platform fees • Pay tutors directly</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-semibold mb-4">
              What Parents Say
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Real Stories from Real Families
            </h2>
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <Zap size={14} className="text-green-600" />
              Most parents find a tutor within 24-48 hours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border-l-4 border-green-500">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic leading-relaxed">
                "Found a piano teacher for my daughter in less than 24 hours. She got 3 responses the same day we posted. So much easier than Facebook groups!"
              </p>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Sarah M.</p>
                <p className="text-gray-500">Parent of 8-year-old, San Francisco</p>
              </div>
            </Card>

            <Card className="p-6 bg-white border-l-4 border-emerald-500">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic leading-relaxed">
                "Being able to compare tutors side-by-side with actual parent reviews made the decision so easy. Found the perfect math tutor for my son's SAT prep."
              </p>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Jennifer K.</p>
                <p className="text-gray-500">Parent of 16-year-old, Boston</p>
              </div>
            </Card>

            <Card className="p-6 bg-white border-l-4 border-teal-500">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic leading-relaxed">
                "Love that it's free and I can message multiple tutors to find the right fit. We tried 2 trial lessons before committing. No pressure!"
              </p>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Michael R.</p>
                <p className="text-gray-500">Parent of 6-year-old twins, Austin</p>
              </div>
            </Card>
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
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-3">
              Join our trusted platform and connect with motivated families
            </p>
            <p className="text-emerald-700 font-semibold text-sm">
              ⚡ Get approved in 24-48 hours • Start receiving requests immediately
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
                <p className="text-gray-600 leading-relaxed mb-4">
                  Sign up and complete your tutor profile. Share your experience, credentials, subjects you teach, and set your own rates.
                </p>
                <ul className="text-left text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Free to join — no listing fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Set your own rates & schedule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Profile live in 1-2 days</span>
                  </li>
                </ul>
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
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our team reviews your profile to ensure quality. We verify credentials and check references. Approval typically takes 1-2 days.
                </p>
                <ul className="text-left text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Quick review (24-48 hours)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Build trust with verified badge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Join a trusted marketplace</span>
                  </li>
                </ul>
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
                <p className="text-gray-600 leading-relaxed mb-4">
                  Parents find you and send booking requests. Review each request, accept what works for you, and coordinate directly with families.
                </p>
                <ul className="text-left text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Get discovered by 500+ local families</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Accept only students you want</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Keep 100% of your earnings</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/become-tutor">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Become a Tutor — Free
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-3 flex items-center justify-center gap-2">
              <Zap size={14} className="text-green-600" />
              Get approved in 24-48 hours
            </p>
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
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-3">
              We take comprehensive measures to ensure a secure and trusted environment
            </p>
            <p className="text-green-700 font-semibold text-sm">
              ⚡ Average tutor response time: 2-4 hours
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
              <p className="text-gray-600 leading-relaxed mb-3">
                <span className="font-bold text-green-600">100% free for parents.</span> LearnWell charges no platform fees, subscription costs, or booking fees. Parents pay tutors directly at their posted rates. Over 500 families have already connected with tutors at no cost.
              </p>
              <p className="text-sm text-gray-500">
                We may introduce optional premium features in the future, but the core marketplace will always be free.
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
            Join 500+ families and 200+ tutors building brighter futures together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/browse">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50 border-0 px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Find a Tutor — Free
              </Button>
            </Link>
            <Link href="/become-tutor">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Become a Tutor — Free
              </Button>
            </Link>
          </div>
          <p className="text-green-100 text-sm mt-4">No platform fees • No subscription • No commitment</p>
        </div>
      </section>
    </div>
  )
}
