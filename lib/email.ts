import { Resend } from 'resend'

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

interface BookingRequestEmailParams {
  tutorEmail: string
  tutorName: string
  parentName: string
  childAge: number
  subject: string
  needsDescription: string
  preferredDays: string[]
  preferredTimes: string[]
  dashboardUrl: string
}

interface BookingAcceptedEmailParams {
  parentEmail: string
  parentName: string
  tutorName: string
  tutorEmail: string
  subject: string
}

interface BookingDeclinedEmailParams {
  parentEmail: string
  parentName: string
  tutorName: string
  subject: string
  reason?: string
}

export async function sendBookingRequestEmail({
  tutorEmail,
  tutorName,
  parentName,
  childAge,
  subject,
  needsDescription,
  preferredDays,
  preferredTimes,
  dashboardUrl
}: BookingRequestEmailParams) {
  try {
    await getResend().emails.send({
      from: 'LearnWell <noreply@learnwell.com>',
      to: tutorEmail,
      subject: `New Booking Request from ${parentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">You have a new booking request!</h2>

          <p>Hi ${tutorName},</p>

          <p>A parent is interested in booking lessons with you.</p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Booking Details:</h3>
            <ul style="line-height: 1.8;">
              <li><strong>Parent:</strong> ${parentName}</li>
              <li><strong>Child Age:</strong> ${childAge}</li>
              <li><strong>Subject:</strong> ${subject}</li>
              <li><strong>Preferred Days:</strong> ${preferredDays.join(', ')}</li>
              <li><strong>Preferred Times:</strong> ${preferredTimes.join(', ')}</li>
            </ul>

            <h4>What the parent is looking for:</h4>
            <p style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0;">
              "${needsDescription}"
            </p>
          </div>

          <p style="text-align: center; margin: 30px 0;">
            <a href="${dashboardUrl}"
               style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              View Request & Respond
            </a>
          </p>

          <p style="color: #6b7280; font-size: 14px;">
            Log in to your dashboard to accept or decline this request. Parents expect a response within 24-48 hours.
          </p>
        </div>
      `
    })
  } catch (error) {
    console.error('Error sending booking request email:', error)
    // Don't throw - we don't want email failures to break the booking flow
  }
}

export async function sendBookingAcceptedEmail({
  parentEmail,
  parentName,
  tutorName,
  tutorEmail,
  subject
}: BookingAcceptedEmailParams) {
  try {
    await getResend().emails.send({
      from: 'LearnWell <noreply@learnwell.com>',
      to: parentEmail,
      subject: `${tutorName} Accepted Your Booking Request!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Great news!</h2>

          <p>Hi ${parentName},</p>

          <p><strong>${tutorName}</strong> has accepted your booking request for <strong>${subject}</strong>.</p>

          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="margin-top: 0;">Next Steps:</h3>
            <ol style="line-height: 1.8;">
              <li>Reach out to ${tutorName} to schedule your first session</li>
              <li>Discuss session format (virtual or in-person)</li>
              <li>Confirm pricing and payment method</li>
            </ol>
          </div>

          <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Tutor's Email:</strong> <a href="mailto:${tutorEmail}">${tutorEmail}</a></p>
          </div>

          <p style="color: #6b7280; font-size: 14px;">
            We recommend scheduling a brief introductory call before the first session to ensure a good fit.
          </p>

          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Questions? Reply to this email or contact us at support@learnwell.com
          </p>
        </div>
      `
    })
  } catch (error) {
    console.error('Error sending booking accepted email:', error)
  }
}

export async function sendBookingDeclinedEmail({
  parentEmail,
  parentName,
  tutorName,
  subject,
  reason
}: BookingDeclinedEmailParams) {
  try {
    await getResend().emails.send({
      from: 'LearnWell <noreply@learnwell.com>',
      to: parentEmail,
      subject: `Update on Your Booking Request`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6b7280;">Booking Request Update</h2>

          <p>Hi ${parentName},</p>

          <p>Unfortunately, <strong>${tutorName}</strong> is not available for <strong>${subject}</strong> lessons at this time.</p>

          ${reason ? `
            <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Message from tutor:</strong> "${reason}"</p>
            </div>
          ` : ''}

          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h3 style="margin-top: 0;">Don't worry - we have other great options!</h3>
            <p style="margin-bottom: 0;">Browse our other qualified tutors to find the perfect match for your child.</p>
          </div>

          <p style="text-align: center; margin: 30px 0;">
            <a href="https://learnwell.com/browse"
               style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Browse More Tutors
            </a>
          </p>

          <p style="color: #6b7280; font-size: 14px;">
            Need help finding the right tutor? Reply to this email and we'll personally recommend some options for you.
          </p>
        </div>
      `
    })
  } catch (error) {
    console.error('Error sending booking declined email:', error)
  }
}
