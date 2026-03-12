-- LearnWell Test Data
-- This script adds 10 sample tutors with variety for testing

-- First, let's add users for the tutors
INSERT INTO public.users (id, email, full_name, role) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'sarah.johnson@example.com', 'Sarah Johnson', 'tutor'),
  ('550e8400-e29b-41d4-a716-446655440002', 'michael.chen@example.com', 'Michael Chen', 'tutor'),
  ('550e8400-e29b-41d4-a716-446655440003', 'emily.rodriguez@example.com', 'Emily Rodriguez', 'tutor'),
  ('550e8400-e29b-41d4-a716-446655440004', 'david.kim@example.com', 'David Kim', 'tutor'),
  ('550e8400-e29b-41d4-a716-446655440005', 'lisa.patel@example.com', 'Lisa Patel', 'tutor'),
  ('550e8400-e29b-41d4-a716-446655440006', 'james.wilson@example.com', 'James Wilson', 'tutor'),
  ('550e8400-e29b-41d4-a716-446655440007', 'maria.garcia@example.com', 'Maria Garcia', 'tutor'),
  ('550e8400-e29b-41d4-a716-446655440008', 'robert.taylor@example.com', 'Robert Taylor', 'tutor'),
  ('550e8400-e29b-41d4-a716-446655440009', 'jennifer.lee@example.com', 'Jennifer Lee', 'tutor'),
  ('550e8400-e29b-41d4-a716-446655440010', 'thomas.brown@example.com', 'Thomas Brown', 'tutor')
ON CONFLICT (id) DO NOTHING;

-- Now add tutor profiles with diverse subjects, ages, and attributes

-- 1. Sarah Johnson - Math tutor for elementary
INSERT INTO public.tutor_profiles
  (user_id, headline, bio, subjects, age_groups, hourly_rate, location_type, zip_code, years_experience, credentials, teaching_approach, status, id_verified, credentials_verified, background_check_completed, rating_average, review_count)
VALUES
  ('550e8400-e29b-41d4-a716-446655440001',
   'Experienced Math Tutor for Elementary Students',
   'I have been teaching math for 8 years and love helping kids build confidence in their abilities. My approach is patient and encouraging, focusing on understanding concepts rather than memorization. I specialize in making math fun and accessible for young learners.',
   ARRAY['Math', 'Science'],
   ARRAY['5-7', '8-10'],
   50.00,
   'both',
   '94301',
   8,
   ARRAY['B.A. in Mathematics, Stanford University', 'Elementary Teaching Credential'],
   ARRAY['Patient & Encouraging', 'Hands-On Learning'],
   'approved',
   true,
   true,
   true,
   4.8,
   15)
ON CONFLICT (user_id) DO NOTHING;

-- 2. Michael Chen - Coding and STEM
INSERT INTO public.tutor_profiles
  (user_id, headline, bio, subjects, age_groups, hourly_rate, location_type, zip_code, years_experience, credentials, teaching_approach, status, id_verified, credentials_verified, background_check_completed, rating_average, review_count)
VALUES
  ('550e8400-e29b-41d4-a716-446655440002',
   'Software Engineer Teaching Kids to Code',
   'As a professional software engineer, I love introducing kids to the world of programming. I teach Python, Scratch, and web development in a fun, project-based way. Kids will build games, websites, and apps while learning fundamental coding concepts.',
   ARRAY['Coding', 'Math'],
   ARRAY['8-10', '11-13', '14+'],
   65.00,
   'virtual',
   '94301',
   5,
   ARRAY['B.S. in Computer Science, UC Berkeley', '5 years at Google'],
   ARRAY['Hands-On Learning', 'Flexible & Adaptive'],
   'approved',
   true,
   true,
   false,
   4.9,
   22)
ON CONFLICT (user_id) DO NOTHING;

-- 3. Emily Rodriguez - Piano teacher
INSERT INTO public.tutor_profiles
  (user_id, headline, bio, subjects, age_groups, hourly_rate, location_type, zip_code, years_experience, credentials, teaching_approach, status, id_verified, credentials_verified, background_check_completed, rating_average, review_count)
VALUES
  ('550e8400-e29b-41d4-a716-446655440003',
   'Professional Piano Teacher for All Ages',
   'Classically trained pianist with 12 years of teaching experience. I offer lessons for beginners through advanced students, focusing on proper technique, music theory, and most importantly - enjoying music! I prepare students for recitals and ABRSM exams.',
   ARRAY['Piano'],
   ARRAY['5-7', '8-10', '11-13', '14+'],
   55.00,
   'in-person',
   '94301',
   12,
   ARRAY['B.M. in Piano Performance, Juilliard', 'MTAC Certified'],
   ARRAY['Structured Curriculum', 'Patient & Encouraging'],
   'approved',
   true,
   true,
   true,
   4.7,
   28)
ON CONFLICT (user_id) DO NOTHING;

-- 4. David Kim - Test Prep specialist
INSERT INTO public.tutor_profiles
  (user_id, headline, bio, subjects, age_groups, hourly_rate, location_type, zip_code, years_experience, credentials, teaching_approach, status, id_verified, credentials_verified, background_check_completed, rating_average, review_count)
VALUES
  ('550e8400-e29b-41d4-a716-446655440004',
   'SAT/ACT Test Prep Expert - 200+ Point Improvements',
   'Specialized test prep tutor with proven track record of helping students improve their SAT scores by an average of 220 points. I teach test-taking strategies, time management, and content review. My students have gotten into top universities including Ivy League schools.',
   ARRAY['Test Prep (SAT/ACT)', 'Math', 'Reading'],
   ARRAY['14+'],
   85.00,
   'both',
   '94301',
   10,
   ARRAY['Perfect SAT Score (1600)', 'M.Ed. in Education, Harvard'],
   ARRAY['Test Prep Focused', 'Structured Curriculum'],
   'approved',
   true,
   true,
   true,
   4.9,
   45)
ON CONFLICT (user_id) DO NOTHING;

-- 5. Lisa Patel - Reading and Writing specialist
INSERT INTO public.tutor_profiles
  (user_id, headline, bio, subjects, age_groups, hourly_rate, location_type, zip_code, years_experience, credentials, teaching_approach, status, id_verified, credentials_verified, background_check_completed, rating_average, review_count)
VALUES
  ('550e8400-e29b-41d4-a716-446655440005',
   'Reading & Writing Specialist for Elementary & Middle School',
   'Former elementary school teacher passionate about developing strong reading and writing skills. I help kids who struggle with reading comprehension, creative writing, and essay composition. My approach makes reading and writing enjoyable and builds lasting skills.',
   ARRAY['Reading', 'Writing'],
   ARRAY['5-7', '8-10', '11-13'],
   45.00,
   'both',
   '94305',
   6,
   ARRAY['B.A. in English Literature', 'Multiple Subject Teaching Credential', 'Reading Specialist Certification'],
   ARRAY['Patient & Encouraging', 'Flexible & Adaptive'],
   'approved',
   true,
   true,
   false,
   4.6,
   18)
ON CONFLICT (user_id) DO NOTHING;

-- 6. James Wilson - Spanish language tutor
INSERT INTO public.tutor_profiles
  (user_id, headline, bio, subjects, age_groups, hourly_rate, location_type, zip_code, years_experience, credentials, teaching_approach, status, id_verified, credentials_verified, background_check_completed, rating_average, review_count)
VALUES
  ('550e8400-e29b-41d4-a716-446655440006',
   'Native Spanish Speaker - Conversational Spanish for Kids',
   'Born and raised in Spain, I teach Spanish through immersion and conversation. My lessons are interactive and fun, incorporating games, songs, and cultural activities. Perfect for kids who want to learn Spanish for school, travel, or heritage.',
   ARRAY['Spanish'],
   ARRAY['5-7', '8-10', '11-13', '14+'],
   40.00,
   'virtual',
   '94301',
   4,
   ARRAY['Native Spanish Speaker', 'DELE Teaching Certificate'],
   ARRAY['Flexible & Adaptive', 'Hands-On Learning'],
   'approved',
   true,
   true,
   false,
   4.5,
   12)
ON CONFLICT (user_id) DO NOTHING;

-- 7. Maria Garcia - Art teacher
INSERT INTO public.tutor_profiles
  (user_id, headline, bio, subjects, age_groups, hourly_rate, location_type, zip_code, years_experience, credentials, teaching_approach, status, id_verified, credentials_verified, background_check_completed, rating_average, review_count)
VALUES
  ('550e8400-e29b-41d4-a716-446655440007',
   'Creative Art Teacher - Drawing, Painting & More',
   'Professional artist teaching kids to express themselves through art. I teach drawing, painting, sculpture, and mixed media. My classes help kids develop creativity, fine motor skills, and confidence. All materials provided!',
   ARRAY['Art'],
   ARRAY['5-7', '8-10', '11-13'],
   48.00,
   'in-person',
   '94305',
   7,
   ARRAY['B.F.A. in Fine Arts, RISD', 'Exhibited at local galleries'],
   ARRAY['Flexible & Adaptive', 'Patient & Encouraging'],
   'approved',
   true,
   true,
   true,
   4.8,
   20)
ON CONFLICT (user_id) DO NOTHING;

-- 8. Robert Taylor - Chess coach
INSERT INTO public.tutor_profiles
  (user_id, headline, bio, subjects, age_groups, hourly_rate, location_type, zip_code, years_experience, credentials, teaching_approach, status, id_verified, credentials_verified, background_check_completed, rating_average, review_count)
VALUES
  ('550e8400-e29b-41d4-a716-446655440008',
   'Chess Coach - Beginner to Tournament Level',
   'USCF National Master with 15 years of coaching experience. I teach chess strategy, tactics, and openings for all skill levels. My students have won state championships and developed critical thinking skills that help in school and life.',
   ARRAY['Chess'],
   ARRAY['8-10', '11-13', '14+'],
   60.00,
   'both',
   '94301',
   15,
   ARRAY['USCF National Master', 'Coach of State Champions'],
   ARRAY['Structured Curriculum', 'Flexible & Adaptive'],
   'approved',
   true,
   true,
   true,
   4.9,
   31)
ON CONFLICT (user_id) DO NOTHING;

-- 9. Jennifer Lee - Special Education tutor
INSERT INTO public.tutor_profiles
  (user_id, headline, bio, subjects, age_groups, hourly_rate, location_type, zip_code, years_experience, credentials, teaching_approach, status, id_verified, credentials_verified, background_check_completed, rating_average, review_count)
VALUES
  ('550e8400-e29b-41d4-a716-446655440009',
   'Special Education Tutor - ADHD, Dyslexia, Autism Support',
   'Certified special education teacher with expertise in working with students with ADHD, dyslexia, and autism. I create individualized learning plans and use multisensory teaching methods. Patient, understanding, and experienced with IEPs and 504 plans.',
   ARRAY['Special Education', 'Reading', 'Math'],
   ARRAY['5-7', '8-10', '11-13'],
   70.00,
   'both',
   '94301',
   9,
   ARRAY['M.A. in Special Education', 'Reading Specialist', 'Orton-Gillingham Certified'],
   ARRAY['Patient & Encouraging', 'Special Needs Support', 'Structured Curriculum'],
   'approved',
   true,
   true,
   true,
   5.0,
   25)
ON CONFLICT (user_id) DO NOTHING;

-- 10. Thomas Brown - Science tutor
INSERT INTO public.tutor_profiles
  (user_id, headline, bio, subjects, age_groups, hourly_rate, location_type, zip_code, years_experience, credentials, teaching_approach, status, id_verified, credentials_verified, background_check_completed, rating_average, review_count)
VALUES
  ('550e8400-e29b-41d4-a716-446655440010',
   'Science Tutor - Making Science Fun and Accessible',
   'Former middle school science teacher bringing hands-on experiments and real-world applications to tutoring. I teach biology, chemistry, and physics in ways that make sense. Students learn by doing experiments and understanding how science relates to everyday life.',
   ARRAY['Science'],
   ARRAY['8-10', '11-13', '14+'],
   52.00,
   'both',
   '94305',
   11,
   ARRAY['B.S. in Biology', 'M.S. in Science Education', 'Single Subject Science Credential'],
   ARRAY['Hands-On Learning', 'Structured Curriculum'],
   'approved',
   true,
   true,
   false,
   4.7,
   19)
ON CONFLICT (user_id) DO NOTHING;

-- Success message
SELECT 'Test data inserted successfully! You should now have 10 tutors in your database.' as message;
