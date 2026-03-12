# Complete Supabase Setup Guide for Beginners

This guide will walk you through setting up Supabase from scratch with zero prior experience.

## What is Supabase?

Supabase is a free, hosted database service (like Firebase but uses PostgreSQL). It handles:
- Database storage (where your tutors, users, bookings are stored)
- Authentication (user login/signup)
- Real-time updates
- Row-level security

**Best part:** It's FREE for small projects and handles all the server infrastructure for you.

---

## Step 1: Create a Supabase Account (2 minutes)

1. Go to **https://supabase.com** in your browser
2. Click the **"Start your project"** button (big green button in the center)
3. Sign up with one of these options:
   - **GitHub** (recommended - click "Continue with GitHub")
   - **Email/password** (if you prefer)
4. If using GitHub, authorize Supabase when prompted
5. You'll be taken to your Supabase dashboard

---

## Step 2: Create a New Project (3 minutes)

1. On the dashboard, click **"New Project"** (green button)

2. Fill in the project details:
   - **Name:** `learnwell` (or any name you like)
   - **Database Password:** Create a strong password
     - **IMPORTANT:** Copy this password and save it somewhere safe (you'll need it later)
     - Example: `MySecurePass123!` (use something stronger)
   - **Region:** Choose the region closest to you
     - US East (Ohio) - if you're in Eastern US
     - US West (Oregon) - if you're in Western US
     - Europe (London) - if you're in Europe
   - **Pricing Plan:** Keep it on **"Free"** (perfect for MVP)

3. Click **"Create new project"**

4. **Wait 2-3 minutes** - Supabase is creating your database
   - You'll see a progress spinner
   - The page will refresh when it's ready
   - ☕ Grab a coffee while you wait

---

## Step 3: Get Your API Keys (1 minute)

Once your project is ready, you need to copy two important keys:

1. On the left sidebar, click the **⚙️ Settings** icon (bottom left)

2. Click **"API"** in the settings menu

3. You'll see a page with several sections. Find these two keys:

   **A. Project URL** (in the "Project URL" section)
   - It looks like: `https://abcdefghijk.supabase.co`
   - Click the **copy icon** next to it
   - Save it somewhere temporarily (notepad/notes app)

   **B. Project API keys** section:
   - Find **"anon public"** key
     - It's a long string starting with `eyJhbGc...`
     - Click **"Copy"** button
     - Save it temporarily

   - Scroll down to **"service_role"** key
     - Click **"Reveal"** to show it
     - Click **"Copy"** button
     - Save it temporarily
     - ⚠️ **NEVER share this key publicly** - it has full admin access

---

## Step 4: Add Keys to Your Project (2 minutes)

Now let's add these keys to your LearnWell project:

1. Open your code editor (VS Code)

2. In the `learnwell` folder, find the file **`.env.local`**
   - It's in the root folder (same level as `package.json`)
   - If you can't see it, it might be hidden (files starting with `.` are hidden)

3. Open `.env.local` and replace the placeholder values:

```env
# Replace these with your actual values from Supabase

NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... (paste your anon public key)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (paste your service_role key)

# These can stay as is for now
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CITY_NAME=Your City
```

4. **Save the file** (Cmd+S or Ctrl+S)

---

## Step 5: Create the Database Tables (5 minutes)

Now we need to create all the tables (users, tutors, bookings, etc.) in your database:

1. Go back to your Supabase dashboard in the browser

2. On the left sidebar, click **"SQL Editor"**
   - It's the icon that looks like `</>`

3. Click **"New query"** (blue button in the top right)

4. Now go to your code editor and open the file: **`supabase-schema.sql`**
   - It's in the root of the `learnwell` folder
   - This file contains all the SQL commands to create your database

5. **Copy EVERYTHING** in that file (Cmd+A then Cmd+C)

6. Go back to your browser (Supabase SQL Editor)

7. **Paste** all the SQL code into the editor

8. Click **"Run"** (bottom right corner)

9. You should see a success message at the bottom:
   - ✅ `Success. No rows returned`
   - This is correct! It means all tables were created

10. **Verify it worked:**
    - Click **"Table Editor"** on the left sidebar (icon looks like a table)
    - You should now see several tables listed:
      - `users`
      - `tutor_profiles`
      - `bookings`
      - `reviews`
      - `messages`
      - `saved_tutors`
    - ✅ If you see these, you're all set!

---

## Step 6: Test the Connection (2 minutes)

Let's make sure your app can connect to Supabase:

1. Open your terminal/command line

2. Navigate to the learnwell folder:
```bash
cd /Users/nliu/learnwell
```

3. Make sure the dev server is running:
```bash
npm run dev
```

4. Open your browser to **http://localhost:3000**
   - You should see the LearnWell landing page
   - If it loads without errors, your connection is working! ✅

---

## Step 7: Add Sample Tutor Data (Optional - 5 minutes)

Let's add a test tutor so you can see real data:

1. Go back to Supabase dashboard

2. Click **"Table Editor"** on the left sidebar

3. Click the **`users`** table

4. Click **"Insert"** → **"Insert row"**

5. Fill in these values:
   - **id:** Click "Generate UUID" button
   - **email:** `test-tutor@example.com`
   - **full_name:** `Sarah Johnson`
   - **role:** `tutor` (type it exactly)
   - Leave created_at and updated_at blank (auto-fills)

6. Click **"Save"**

7. Now click the **`tutor_profiles`** table

8. Click **"Insert"** → **"Insert row"**

9. Fill in these values (be careful with the data types):
   - **id:** Click "Generate UUID"
   - **user_id:** Copy the UUID from the user you just created
     - Go back to `users` table
     - Copy the `id` field (the long string)
     - Paste it here
   - **headline:** `Experienced Math Tutor for Elementary Students`
   - **bio:** `I've been teaching math for 8 years and love helping kids build confidence...`
   - **subjects:** Click the `{}` button, then:
     - Type: `["Math", "Science"]`
   - **age_groups:** `["8-10", "11-13"]`
   - **hourly_rate:** `50`
   - **location_type:** `both`
   - **zip_code:** `94301`
   - **years_experience:** `8`
   - **status:** `approved`
   - **id_verified:** Check the box (true)
   - **credentials_verified:** Check the box (true)
   - **rating_average:** `4.5`
   - **review_count:** `12`

10. Click **"Save"**

11. Now go to **http://localhost:3000/browse** in your browser
    - You should see your test tutor! 🎉

---

## Common Issues & Solutions

### Issue: "Can't connect to Supabase"
**Solution:**
- Double-check your `.env.local` file has the correct keys
- Make sure there are no extra spaces before/after the keys
- Restart your dev server: Stop it (Ctrl+C) and run `npm run dev` again

### Issue: "Tables don't appear in Table Editor"
**Solution:**
- Go back to SQL Editor
- Run the `supabase-schema.sql` script again
- Make sure you clicked "Run" and saw the success message

### Issue: "Can't insert data - RLS policy violation"
**Solution:**
- This is Row Level Security blocking you
- You can temporarily disable it for testing:
  - Go to SQL Editor
  - Run this command: `ALTER TABLE tutor_profiles DISABLE ROW LEVEL SECURITY;`
  - This turns off security for testing (re-enable later)

### Issue: "Page shows no tutors even after adding test data"
**Solution:**
- The browse page isn't connected to Supabase yet (that's Phase 2)
- For now, you can verify data exists by checking the Table Editor
- We'll connect it in the next development phase

---

## What You Have Now ✅

After completing this guide:
- ✅ Supabase account created
- ✅ Database project set up
- ✅ API keys configured in your app
- ✅ All tables created (users, tutors, bookings, reviews, messages)
- ✅ Connection tested
- ✅ (Optional) Sample test data added

---

## Next Steps

Now that Supabase is set up, you're ready for **Phase 2: Data Integration**

This involves:
1. Connecting the browse page to fetch tutors from Supabase
2. Displaying real tutor data
3. Making the search/filters work with the database
4. Allowing tutors to submit their applications to the database

Would you like help with Phase 2 next?

---

## Useful Supabase Resources

- **Dashboard:** https://app.supabase.com
- **Docs:** https://supabase.com/docs
- **Table Editor:** Where you view/edit data (like Excel for your database)
- **SQL Editor:** Where you run database commands
- **Authentication:** Where you'll set up user login (Phase 1)

---

## Need Help?

If you get stuck:
1. Check the "Common Issues" section above
2. Look at the Supabase logs: Settings → Logs
3. Check that your `.env.local` file is saved and has no typos
4. Make sure you restarted your dev server after changing `.env.local`

**Your database is now ready to power LearnWell!** 🚀
