// Simple script to test your Supabase connection
// Run with: node scripts/test-supabase-connection.js

require('dotenv').config({ path: '.env.local' })

async function testConnection() {
  console.log('\n🧪 Testing Supabase Connection...\n')

  // Check if env variables are set
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || url === 'https://your-project.supabase.co') {
    console.log('❌ NEXT_PUBLIC_SUPABASE_URL is not set correctly')
    console.log('   Please update .env.local with your actual Supabase URL')
    return
  }

  if (!anonKey || anonKey.startsWith('your-anon-key')) {
    console.log('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set correctly')
    console.log('   Please update .env.local with your actual Supabase anon key')
    return
  }

  console.log('✅ Environment variables are set')
  console.log(`   URL: ${url}`)
  console.log(`   Anon Key: ${anonKey.substring(0, 20)}...`)

  // Try to fetch from Supabase
  try {
    const response = await fetch(`${url}/rest/v1/tutor_profiles?select=count`, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`
      }
    })

    if (response.ok) {
      console.log('\n✅ Successfully connected to Supabase!')
      console.log('   Your database is ready to use.')

      const data = await response.json()
      console.log(`   Found ${data.length} tutors in the database`)

      if (data.length === 0) {
        console.log('\n💡 Tip: Add some test tutor data to see it on the browse page')
        console.log('   See SUPABASE_SETUP_GUIDE.md Step 7')
      }
    } else {
      console.log('\n⚠️  Connected but got an error response')
      console.log(`   Status: ${response.status}`)
      console.log(`   Message: ${await response.text()}`)

      if (response.status === 404) {
        console.log('\n   This might mean the tutor_profiles table doesn\'t exist yet.')
        console.log('   Run the SQL schema (see SUPABASE_SETUP_GUIDE.md Step 5)')
      }
    }
  } catch (error) {
    console.log('\n❌ Failed to connect to Supabase')
    console.log(`   Error: ${error.message}`)
    console.log('\n   Check that:')
    console.log('   1. Your Supabase project is running')
    console.log('   2. The URL and keys in .env.local are correct')
    console.log('   3. You have internet connection')
  }

  console.log('\n')
}

testConnection()
