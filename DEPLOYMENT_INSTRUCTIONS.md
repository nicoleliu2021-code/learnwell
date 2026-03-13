# 🚀 Deploy LearnWell to Production

Your code is committed and ready to deploy! Follow these steps:

---

## Step 1: Push to GitHub (2 minutes)

### Option A: Create New Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `learnwell`
3. Description: "LearnWell - Tutoring Marketplace Platform"
4. Make it **Public** (or Private if you prefer)
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click "Create repository"

### Option B: Use Existing Repository

If you already have a repo, skip to the push commands below.

---

## Step 2: Connect and Push (1 minute)

Run these commands in your terminal:

```bash
cd /Users/nliu/learnwell

# Add your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/learnwell.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## Step 3: Deploy to Vercel (3 minutes)

### 3.1 Sign Up / Log In to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" (or "Log In" if you have an account)
3. **Sign in with GitHub** (easiest option)
4. Authorize Vercel to access your GitHub repos

### 3.2 Import Your Project

1. Click "Add New..." → "Project"
2. Find `learnwell` in your repo list
3. Click "Import"

### 3.3 Configure Project

**Framework Preset:** Next.js (should auto-detect)

**Root Directory:** `./` (leave as default)

**Build Command:** `npm run build` (auto-configured)

**Output Directory:** `.next` (auto-configured)

### 3.4 Add Environment Variables

Click "Environment Variables" and add these:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_CITY_NAME=Your City
```

**Get these values from your .env.local file or Supabase dashboard.**

**Important:**
- After deployment, update `NEXT_PUBLIC_APP_URL` with your actual Vercel URL
- Optionally add `RESEND_API_KEY` for email notifications (get from https://resend.com)

### 3.5 Deploy!

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll get a live URL like: `https://learnwell-abc123.vercel.app`

---

## Step 4: Update App URL (1 minute)

After deployment:

1. Copy your production URL from Vercel
2. Go back to Vercel → Your Project → Settings → Environment Variables
3. Edit `NEXT_PUBLIC_APP_URL` → Replace with your actual URL
4. Click "Save"
5. Go to "Deployments" tab → Click "..." → "Redeploy"

---

## Step 5: Update Supabase CORS (Optional but Recommended)

Allow your production domain in Supabase:

1. Go to https://supabase.com/dashboard
2. Select your project
3. Settings → API
4. Under "CORS Settings" add your Vercel URL:
   ```
   https://your-app.vercel.app
   ```

---

## 🎉 You're Live!

Your LearnWell marketplace is now deployed!

### Test Your Deployment:

1. **Visit your URL** → Should see homepage
2. **Sign up as parent** → Create account
3. **Browse tutors** → Should load (if you have test data)
4. **Try messaging** → Test the platform
5. **Mobile test** → Check on phone

---

## 🔧 Next Steps

### Optional: Set Up Custom Domain

1. Buy a domain (e.g., learnwell.com from Namecheap, Google Domains)
2. In Vercel → Settings → Domains → Add domain
3. Follow Vercel's DNS instructions
4. Update `NEXT_PUBLIC_APP_URL` to your custom domain

### Optional: Enable Email Notifications

1. Sign up at https://resend.com (free 100 emails/day)
2. Get API key
3. Add to Vercel environment variables:
   ```
   RESEND_API_KEY=your_resend_key_here
   ```
4. Redeploy

### Optional: Enable Payments (V1.5)

See `STRIPE_SETUP.md` when ready to accept payments

---

## 📊 Monitor Your App

- **Vercel Dashboard:** https://vercel.com/dashboard
- **View Logs:** Deployments → Click deployment → View logs
- **Analytics:** Vercel Analytics (upgrade for detailed metrics)
- **Supabase Stats:** https://supabase.com/dashboard

---

## 🚨 Common Issues

### Build fails with module errors
- Make sure all dependencies are in `package.json`
- Check build logs in Vercel

### Environment variables not working
- Make sure they're added in Vercel dashboard
- Redeploy after adding new variables

### Pages return 404
- Check that files are in correct directories
- Verify Next.js routing is correct

### Database connection fails
- Verify Supabase URLs are correct
- Check that `.env.local` variables are added to Vercel

---

## 🆘 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs/deployment
- **Supabase Docs:** https://supabase.com/docs

---

## Quick Reference Commands

```bash
# Check git status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

---

**You're all set! Time to launch LearnWell! 🚀**
