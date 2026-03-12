# Stripe Payment Integration Setup

This guide will help you integrate Stripe payment processing into LearnWell.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Node.js installed
3. LearnWell app running locally

## Step 1: Install Stripe Dependencies

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

## Step 2: Get Your Stripe API Keys

1. Go to https://dashboard.stripe.com
2. Click on **Developers** → **API keys**
3. Copy your **Publishable key** and **Secret key**

For testing:
- Use **Test mode** keys (they start with `pk_test_` and `sk_test_`)
- Never commit secret keys to git!

## Step 3: Add Stripe Keys to Environment Variables

Edit your `.env.local` file:

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Platform Fee (in percentage)
STRIPE_PLATFORM_FEE_PERCENT=18
```

## Step 4: Enable Stripe Connect (Optional - for V1.5)

For now, payments go directly to tutors. In V1.5, you can enable Stripe Connect to take a platform fee:

1. Go to https://dashboard.stripe.com/settings/connect
2. Enable **Connect**
3. Set up your connected account onboarding

## Step 5: Test the Integration

### Test with Stripe Test Cards

Use these test card numbers in development:

**Successful payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

**Declined payment:**
- Card: `4000 0000 0000 0002`

**More test cards:** https://stripe.com/docs/testing

## Step 6: How Payment Flow Works

### Current Implementation (V1):

1. **Parent browses tutors** → Finds a tutor they like
2. **Parent books a lesson** → Fills out booking form
3. **Tutor accepts booking** → Parents coordinate payment directly
4. **Payment happens offline** → Via Venmo, Zelle, cash, etc.

### Future Implementation (V1.5 - Stripe Integrated):

1. **Parent browses tutors** → Finds a tutor they like
2. **Parent books a lesson** → Fills out booking form
3. **Tutor accepts booking** → Parent receives payment link
4. **Parent pays through Stripe** → Money held in escrow
5. **After session completes** → Money released to tutor (minus 18% platform fee)

## Step 7: Update Database Schema (V1.5)

When you're ready to enable payments, add this to your Supabase SQL editor:

```sql
-- Add payment fields to bookings table
ALTER TABLE public.bookings
ADD COLUMN payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
ADD COLUMN payment_intent_id TEXT,
ADD COLUMN amount_paid DECIMAL(10, 2),
ADD COLUMN payment_date TIMESTAMP WITH TIME ZONE;

-- Create transactions table for accounting
CREATE TABLE public.transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  stripe_payment_intent_id TEXT NOT NULL,
  amount_total DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  tutor_payout DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Step 8: Stripe Webhook Setup (V1.5)

To receive real-time payment updates:

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Run locally: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
3. Copy the webhook signing secret to `.env.local`

```bash
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

For production:
1. Add webhook endpoint: `https://your-domain.com/api/webhooks/stripe`
2. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`

## Security Best Practices

1. **Never expose secret keys** - Keep them in `.env.local` only
2. **Validate webhooks** - Always verify webhook signatures
3. **Use HTTPS** - Required for production
4. **PCI Compliance** - Stripe handles this for you (never store card details)

## Pricing Structure

### Current (V1 - No Payments Yet):
- Parents pay tutors directly
- No platform fees
- Coordinate via Venmo, Zelle, cash

### Future (V1.5):
- Platform takes 18% of each booking
- Tutor sets rate (e.g., $50/hr)
- Parent pays $50/hr
- Tutor receives $41/hr (82% of booking)
- Platform keeps $9/hr (18% fee)

## Testing Checklist

- [ ] Stripe keys added to `.env.local`
- [ ] Test card payment succeeds
- [ ] Payment appears in Stripe Dashboard
- [ ] Booking status updates to "paid"
- [ ] Webhook events received correctly
- [ ] Refunds work properly

## Support

- Stripe Docs: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- Test your integration: https://stripe.com/docs/testing

---

**Current Status:** Payment integration is ready for V1.5. For now, use the manual coordination flow.
