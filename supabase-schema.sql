-- LearnWell Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('parent', 'tutor', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tutor profiles table
CREATE TABLE public.tutor_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  headline TEXT NOT NULL,
  bio TEXT NOT NULL,
  subjects TEXT[] NOT NULL,
  age_groups TEXT[] NOT NULL,
  hourly_rate DECIMAL(10, 2) NOT NULL,
  location_type TEXT NOT NULL CHECK (location_type IN ('virtual', 'in-person', 'both')),
  zip_code TEXT NOT NULL,
  years_experience INTEGER NOT NULL DEFAULT 0,
  credentials TEXT[] DEFAULT '{}',
  teaching_approach TEXT[] DEFAULT '{}',
  availability JSONB DEFAULT '{}',
  photo_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  id_verified BOOLEAN DEFAULT FALSE,
  credentials_verified BOOLEAN DEFAULT FALSE,
  background_check_completed BOOLEAN DEFAULT FALSE,
  rating_average DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tutor_id UUID REFERENCES public.tutor_profiles(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID NOT NULL,
  overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  patience_rating INTEGER NOT NULL CHECK (patience_rating >= 1 AND patience_rating <= 5),
  communication_rating INTEGER NOT NULL CHECK (communication_rating >= 1 AND communication_rating <= 5),
  engagement_rating INTEGER NOT NULL CHECK (engagement_rating >= 1 AND engagement_rating <= 5),
  punctuality_rating INTEGER NOT NULL CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
  knowledge_rating INTEGER NOT NULL CHECK (knowledge_rating >= 1 AND knowledge_rating <= 5),
  review_text TEXT,
  child_age INTEGER NOT NULL,
  would_book_again BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(booking_id)
);

-- Bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tutor_id UUID REFERENCES public.tutor_profiles(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  child_age INTEGER NOT NULL,
  subject TEXT NOT NULL,
  needs_description TEXT NOT NULL,
  preferred_days TEXT[] NOT NULL,
  preferred_times TEXT[] NOT NULL,
  location_preference TEXT NOT NULL CHECK (location_preference IN ('virtual', 'in-person', 'both')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'completed', 'cancelled')),
  tutor_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Saved tutors table (shortlist)
CREATE TABLE public.saved_tutors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  parent_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  tutor_id UUID REFERENCES public.tutor_profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(parent_id, tutor_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_tutor_profiles_status ON public.tutor_profiles(status);
CREATE INDEX idx_tutor_profiles_subjects ON public.tutor_profiles USING GIN(subjects);
CREATE INDEX idx_tutor_profiles_age_groups ON public.tutor_profiles USING GIN(age_groups);
CREATE INDEX idx_tutor_profiles_zip_code ON public.tutor_profiles(zip_code);
CREATE INDEX idx_tutor_profiles_rating ON public.tutor_profiles(rating_average DESC);
CREATE INDEX idx_reviews_tutor_id ON public.reviews(tutor_id);
CREATE INDEX idx_bookings_tutor_id ON public.bookings(tutor_id);
CREATE INDEX idx_bookings_parent_id ON public.bookings(parent_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON public.messages(recipient_id);
CREATE INDEX idx_saved_tutors_parent_id ON public.saved_tutors(parent_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tutor_profiles_updated_at BEFORE UPDATE ON public.tutor_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update tutor rating when new review is added
CREATE OR REPLACE FUNCTION update_tutor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.tutor_profiles
  SET
    rating_average = (
      SELECT AVG(overall_rating)::DECIMAL(3,2)
      FROM public.reviews
      WHERE tutor_id = NEW.tutor_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE tutor_id = NEW.tutor_id
    )
  WHERE id = NEW.tutor_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update tutor rating
CREATE TRIGGER update_tutor_rating_trigger
AFTER INSERT ON public.reviews
FOR EACH ROW EXECUTE FUNCTION update_tutor_rating();

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_tutors ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for tutor_profiles table
CREATE POLICY "Anyone can view approved tutor profiles" ON public.tutor_profiles
  FOR SELECT USING (status = 'approved' OR user_id = auth.uid());

CREATE POLICY "Tutors can create their own profile" ON public.tutor_profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Tutors can update their own profile" ON public.tutor_profiles
  FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for reviews table
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Parents can create reviews for their bookings" ON public.reviews
  FOR INSERT WITH CHECK (parent_id = auth.uid());

-- RLS Policies for bookings table
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (
    parent_id = auth.uid() OR
    tutor_id IN (SELECT id FROM public.tutor_profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Parents can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (parent_id = auth.uid());

CREATE POLICY "Tutors can update bookings for their profile" ON public.bookings
  FOR UPDATE USING (
    tutor_id IN (SELECT id FROM public.tutor_profiles WHERE user_id = auth.uid())
  );

-- RLS Policies for messages table
CREATE POLICY "Users can view their own messages" ON public.messages
  FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Recipients can mark messages as read" ON public.messages
  FOR UPDATE USING (recipient_id = auth.uid());

-- RLS Policies for saved_tutors table
CREATE POLICY "Parents can view their saved tutors" ON public.saved_tutors
  FOR SELECT USING (parent_id = auth.uid());

CREATE POLICY "Parents can save tutors" ON public.saved_tutors
  FOR INSERT WITH CHECK (parent_id = auth.uid());

CREATE POLICY "Parents can remove saved tutors" ON public.saved_tutors
  FOR DELETE USING (parent_id = auth.uid());

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
