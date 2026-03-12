'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Clock, Mail, CheckCircle } from 'lucide-react'

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="max-w-2xl w-full p-8">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Clock size={32} className="text-blue-600" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Profile Under Review
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Thank you for applying to become a tutor on LearnWell!
          </p>

          {/* What Happens Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-blue-600" />
              What Happens Next
            </h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span>
                  <strong>Profile Review:</strong> We'll review your profile within 24 hours to ensure it meets our quality standards.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span>
                  <strong>Verification:</strong> We may email you to request ID verification and credential documents.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span>
                  <strong>Approval:</strong> Once approved, your profile will go live and you'll start receiving booking requests from parents!
                </span>
              </li>
            </ol>
          </div>

          {/* Contact */}
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-8">
            <Mail size={20} />
            <p className="text-sm">
              Questions? Email us at{' '}
              <a href="mailto:support@learnwell.com" className="text-blue-600 hover:text-blue-700 font-medium">
                support@learnwell.com
              </a>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
            <Link href="/browse">
              <Button size="lg">
                Browse Tutors
              </Button>
            </Link>
          </div>

          {/* Timeline */}
          <p className="text-xs text-gray-500 mt-8">
            Most applications are reviewed within 24 hours. You'll receive an email when your profile is approved.
          </p>
        </div>
      </Card>
    </div>
  )
}
