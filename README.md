# LearnWell - Tutoring Marketplace MVP

A modern marketplace platform for parents to find and book private tutors, coaches, and extracurricular instructors for their children.

## 🎯 Project Overview

LearnWell is a two-sided marketplace that connects parents with vetted tutors for K-8 children. The platform covers both academic tutoring (math, reading, writing, test prep) and enrichment activities (music, art, coding, chess).

### Key Features (MVP)

**For Parents:**
- Browse and search tutors by subject, age group, location, and price
- View detailed tutor profiles with credentials, reviews, and teaching approach
- Save/shortlist favorite tutors
- Request trial lessons and communicate via in-platform messaging
- Read verified reviews from other parents

**For Tutors:**
- Create comprehensive teaching profiles
- Set own rates and availability
- Receive booking inquiries from interested parents
- Manage communications through the platform
- Get verified credentials and background check badges

**For Admins:**
- Manual tutor vetting and approval workflow
- Content moderation
- Basic analytics and monitoring

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Icons:** Lucide React
- **Deployment:** Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ and npm
- A Supabase account ([sign up free](https://supabase.com))
- Git

## 🚀 Getting Started

### Quick Start (15 minutes total)

Follow these steps to get LearnWell running locally:

### 1. Install Dependencies (2 minutes)

\`\`\`bash
cd learnwell
npm install
\`\`\`

### 2. Set Up Supabase (10 minutes)

**🆕 New to Supabase?** Follow our detailed beginner-friendly guide:

👉 **[Complete Supabase Setup Guide](./SUPABASE_SETUP_GUIDE.md)** 👈

This guide walks you through:
- Creating a Supabase account
- Setting up your database project
- Getting your API keys
- Creating all the tables
- Adding test data
- Testing your connection

**Quick Summary (if you know Supabase already):**

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase-schema.sql` in SQL Editor
3. Copy your Project URL and API keys from Settings → API
4. Update `.env.local` with your credentials

### 3. Configure Environment Variables (2 minutes)

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edit `.env.local` and add your Supabase credentials:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CITY_NAME=Your City
\`\`\`

### 4. Test Your Supabase Connection (1 minute)

\`\`\`bash
node scripts/test-supabase-connection.js
\`\`\`

You should see: `✅ Successfully connected to Supabase!`

If you see errors, check the [Supabase Setup Guide](./SUPABASE_SETUP_GUIDE.md) troubleshooting section.

### 5. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see LearnWell! 🎉

## 📂 Project Structure

\`\`\`
learnwell/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Landing page
│   ├── layout.tsx           # Root layout with header
│   ├── browse/              # Search and filter page
│   ├── tutor/[id]/          # Individual tutor profile
│   ├── become-tutor/        # Tutor application form
│   └── api/                 # API routes (to be added)
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Input.tsx
│   ├── layout/              # Layout components
│   │   └── Header.tsx
│   └── tutor/               # Tutor-specific components
│       └── TutorCard.tsx
├── lib/
│   ├── supabase/            # Supabase client setup
│   │   ├── client.ts        # Browser client
│   │   └── server.ts        # Server client
│   └── constants.ts         # App constants
├── types/                   # TypeScript type definitions
│   └── index.ts
├── scripts/                 # Helper scripts
│   └── test-supabase-connection.js
├── public/                  # Static assets
├── supabase-schema.sql      # Database schema
├── SUPABASE_SETUP_GUIDE.md  # Detailed Supabase tutorial
└── .env.local              # Environment variables (not in git)
\`\`\`

## 🗃️ Database Schema

The application uses the following main tables:

- **users**: Extends Supabase auth with role (parent/tutor/admin)
- **tutor_profiles**: Complete tutor information and status
- **bookings**: Lesson requests and their status
- **reviews**: Structured parent reviews with dimension ratings
- **messages**: In-platform communication
- **saved_tutors**: Parent shortlists

All tables include Row Level Security (RLS) policies for data protection.

See `supabase-schema.sql` for the complete schema.

## 🎨 Design System

### Colors

- **Primary Blue:** `#2563EB` (blue-600)
- **Success Green:** `#10B981` (green-600)
- **Warning Yellow:** `#F59E0B` (yellow-600)
- **Gray Scale:** Tailwind gray palette

### Components

- Consistent spacing using Tailwind's spacing scale
- Rounded corners (lg = 8px)
- Shadow system: sm, md for depth
- Mobile-first responsive design

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add your environment variables in the Vercel dashboard
4. Deploy!

Vercel will automatically:
- Build and deploy your app
- Set up SSL/HTTPS
- Provide a production URL
- Enable automatic deployments on git push

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL` (your production URL)
- `NEXT_PUBLIC_CITY_NAME`

## 📝 Development Roadmap

### ✅ Phase 0: Foundation (Complete)

- [x] Next.js project setup with TypeScript & Tailwind
- [x] Database schema design
- [x] Landing page with hero and categories
- [x] Browse page with filters
- [x] Tutor profile page
- [x] Tutor application form
- [x] UI component library
- [x] Supabase setup guide

### Phase 1: Authentication (Next)

- [ ] Implement Supabase Auth (sign up, login, logout)
- [ ] Create protected routes for authenticated users
- [ ] Add user role management (parent/tutor/admin)
- [ ] Build parent dashboard
- [ ] Build tutor dashboard

### Phase 2: Data Integration

- [ ] Connect browse page to Supabase
- [ ] Implement search and filter logic
- [ ] Load tutor profiles from database
- [ ] Create tutor profile submission endpoint
- [ ] Add real-time data updates

### Phase 3: Messaging & Bookings

- [ ] Build messaging system
- [ ] Create booking request flow
- [ ] Add email notifications
- [ ] Implement booking status management
- [ ] Add calendar integration

### Phase 4: Reviews & Ratings

- [ ] Add review submission form
- [ ] Calculate and display tutor ratings
- [ ] Implement review moderation
- [ ] Add review verification

### Phase 5: Admin Dashboard

- [ ] Create admin authentication
- [ ] Build tutor approval interface
- [ ] Add analytics and reporting
- [ ] Content moderation tools
- [ ] User management

### Phase 6: Payments (V1.5+)

- [ ] Integrate Stripe Connect
- [ ] Handle payment processing
- [ ] Implement 15-20% platform fee
- [ ] Build tutor payout system
- [ ] Add invoicing

## 🎯 Product Strategy

This MVP follows the LearnWell product strategy:

- **Target Market:** K-8 families in affluent suburbs
- **Niche:** Academic tutoring + enrichment (music, art, coding)
- **Differentiation:** Trust, vetting, structured reviews, concierge matching
- **Monetization:** 15-20% take rate on bookings (V1.5+)
- **Go-to-Market:** Manual supply recruitment → parent Facebook groups → word of mouth

## 🔒 Security & Trust

- All sensitive data is protected with Supabase Row Level Security
- Authentication required for booking and messaging
- Manual tutor vetting before profile approval
- ID verification and credential checks
- Optional background check integration (Checkr)

## 🐛 Troubleshooting

### "Can't connect to Supabase"

1. Check your `.env.local` file has correct keys (no extra spaces)
2. Verify your Supabase project is running in the dashboard
3. Run `node scripts/test-supabase-connection.js` to diagnose
4. Restart your dev server: `npm run dev`

### "Tables don't exist" error

1. Go to Supabase SQL Editor
2. Re-run the `supabase-schema.sql` script
3. Check Table Editor to verify tables were created

### Page shows no data

- The browse page isn't connected to the database yet (Phase 2)
- Add test data following [SUPABASE_SETUP_GUIDE.md Step 7](./SUPABASE_SETUP_GUIDE.md#step-7-add-sample-tutor-data-optional---5-minutes)

For more help, see [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)

## 🤝 Contributing

This is an MVP for a startup concept. If you're interested in contributing or learning more, feel free to explore the code and suggest improvements.

## 📄 License

This project is for educational and startup development purposes.

## 💬 Support

For questions or issues:

1. Check [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) for Supabase help
2. Review the [Supabase documentation](https://supabase.com/docs)
3. Check the [Next.js documentation](https://nextjs.org/docs)
4. Open an issue in this repository

## 📚 Additional Resources

- [Complete Supabase Setup Guide](./SUPABASE_SETUP_GUIDE.md) - Beginner-friendly walkthrough
- [Product Strategy Document](./PRODUCT_STRATEGY.md) - Full market analysis (if created)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Built with ❤️ for parents and educators**

🚀 Ready to launch? Start with the [Supabase Setup Guide](./SUPABASE_SETUP_GUIDE.md)!
