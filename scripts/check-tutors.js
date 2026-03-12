// Check what tutors are in the database
require('dotenv').config({ path: '.env.local' })

async function checkTutors() {
  console.log('\n🔍 Checking tutors in database...\n')

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  try {
    const response = await fetch(`${url}/rest/v1/tutor_profiles?select=*`, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`
      }
    })

    if (response.ok) {
      const tutors = await response.json()
      console.log(`Found ${tutors.length} tutors:\n`)

      tutors.forEach((tutor, index) => {
        console.log(`${index + 1}. ${tutor.headline}`)
        console.log(`   ID: ${tutor.id}`)
        console.log(`   Status: ${tutor.status}`)
        console.log(`   Subjects: ${tutor.subjects.join(', ')}`)
        console.log(`   Age Groups: ${tutor.age_groups.join(', ')}`)
        console.log(`   Rate: $${tutor.hourly_rate}/hr`)
        console.log(`   Location: ${tutor.location_type}`)
        console.log(`   Rating: ${tutor.rating_average} (${tutor.review_count} reviews)`)
        console.log('')
      })

      // Check for any that aren't approved
      const notApproved = tutors.filter(t => t.status !== 'approved')
      if (notApproved.length > 0) {
        console.log(`⚠️  Warning: ${notApproved.length} tutors are not approved and won't show on browse page`)
        notApproved.forEach(t => {
          console.log(`   - ${t.headline} (status: ${t.status})`)
        })
      }
    } else {
      console.log('❌ Error fetching tutors:', await response.text())
    }
  } catch (error) {
    console.log('❌ Error:', error.message)
  }

  console.log('')
}

checkTutors()
