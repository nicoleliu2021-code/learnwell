export const SUBJECTS = [
  'Math',
  'Reading',
  'Writing',
  'Science',
  'Test Prep (SAT/ACT)',
  'Spanish',
  'French',
  'Mandarin',
  'Piano',
  'Violin',
  'Guitar',
  'Art',
  'Coding',
  'Chess',
  'Soccer',
  'Tennis',
  'Speech & Debate',
  'Special Education',
]

export const CATEGORIES = [
  {
    id: 'math-reading',
    name: 'Math & Reading',
    icon: '📚',
    subjects: ['Math', 'Reading', 'Writing', 'Science'],
  },
  {
    id: 'test-prep',
    name: 'Test Prep',
    icon: '✏️',
    subjects: ['Test Prep (SAT/ACT)'],
  },
  {
    id: 'music',
    name: 'Music Lessons',
    icon: '🎵',
    subjects: ['Piano', 'Violin', 'Guitar'],
  },
  {
    id: 'coding',
    name: 'Coding & STEM',
    icon: '💻',
    subjects: ['Coding', 'Science'],
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: '🌍',
    subjects: ['Spanish', 'French', 'Mandarin'],
  },
  {
    id: 'art',
    name: 'Art & Enrichment',
    icon: '🎨',
    subjects: ['Art', 'Chess'],
  },
]

export const AGE_GROUPS = ['5-7', '8-10', '11-13', '14+'] as const

export const TEACHING_APPROACHES = [
  'Patient & Encouraging',
  'Structured Curriculum',
  'Flexible & Adaptive',
  'Hands-On Learning',
  'Visual Learning',
  'Homework Support',
  'Test Prep Focused',
  'Gifted & Advanced',
  'Special Needs Support',
]

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const TIME_SLOTS = [
  'Morning (8am-12pm)',
  'Afternoon (12pm-5pm)',
  'Evening (5pm-8pm)',
]
