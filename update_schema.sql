-- HyperCode Supabase Schema Migration
-- Execute this script in your Supabase SQL Editor to update table structures.

-- =========================================================================
-- 1. DROP & RECREATE CMS TABLES WITH NEW SPECIFICATIONS
-- =========================================================================

-- Recreate articles table
DROP TABLE IF EXISTS articles CASCADE;
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    featured_image TEXT,
    author JSONB, -- Storing name, role, avatar
    reading_time TEXT,
    published_date TIMESTAMPTZ DEFAULT now(),
    language TEXT CHECK (language IN ('en', 'es')) DEFAULT 'en',
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Recreate case_studies table
DROP TABLE IF EXISTS case_studies CASCADE;
CREATE TABLE case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    industry TEXT NOT NULL,
    client_type TEXT,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    results TEXT NOT NULL,
    technologies TEXT, -- Comma-separated technical tools
    featured_image TEXT,
    language TEXT CHECK (language IN ('en', 'es')) DEFAULT 'en',
    published_date TIMESTAMPTZ DEFAULT now(),
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- =========================================================================
-- 2. ALTER CAPTURE & LEAD TABLES TO ADD METADATA
-- =========================================================================

-- Newsletter Subscribers
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS language TEXT CHECK (language IN ('en', 'es')) DEFAULT 'en';
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS source_page TEXT;

-- Chat Leads
ALTER TABLE chat_leads ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE chat_leads ADD COLUMN IF NOT EXISTS source TEXT;

-- Chat Messages
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS session_id TEXT;
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS language TEXT CHECK (language IN ('en', 'es')) DEFAULT 'en';

-- =========================================================================
-- 3. ALIGN USER PROFILES WITH LOWERCASE RBAC ROLES (Option A)
-- =========================================================================

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS avatar TEXT;

-- Drop old check constraint if it exists (usually named user_profiles_role_check)
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_role_check;
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_role_check CHECK (role IN ('admin', 'editor', 'recruiter'));

-- Modify default role in user_profiles to lowercase
ALTER TABLE user_profiles ALTER COLUMN role SET DEFAULT 'editor';

-- =========================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to prevent errors
DROP POLICY IF EXISTS "Allow public reads on published articles" ON articles;
DROP POLICY IF EXISTS "Admins can manage articles" ON articles;
DROP POLICY IF EXISTS "Allow public select on published articles" ON articles;
DROP POLICY IF EXISTS "Admins can manage articles with new roles" ON articles;

DROP POLICY IF EXISTS "Allow public reads on published case studies" ON case_studies;
DROP POLICY IF EXISTS "Admins can manage case studies" ON case_studies;
DROP POLICY IF EXISTS "Allow public select on published case studies" ON case_studies;
DROP POLICY IF EXISTS "Admins can manage case studies with new roles" ON case_studies;

-- Create updated policies
CREATE POLICY "Allow public select on published articles" ON articles
    FOR SELECT USING (is_published = true);

CREATE POLICY "Admins and Editors can manage articles" ON articles
    FOR ALL USING (get_user_role() IN ('admin', 'editor'));

CREATE POLICY "Allow public select on published case studies" ON case_studies
    FOR SELECT USING (is_published = true);

CREATE POLICY "Admins and Editors can manage case studies" ON case_studies
    FOR ALL USING (get_user_role() IN ('admin', 'editor'));

-- Let's check policies for chat_leads and newsletter_subscribers
DROP POLICY IF EXISTS "Admins can manage newsletter subscribers" ON newsletter_subscribers;
CREATE POLICY "Admins can manage newsletter subscribers" ON newsletter_subscribers
    FOR ALL USING (get_user_role() = 'admin');

DROP POLICY IF EXISTS "Admins, Recruiters, and Consultants can read chatbot leads" ON chat_leads;
CREATE POLICY "Admins, Recruiters, and Editors can read chatbot leads" ON chat_leads
    FOR SELECT USING (get_user_role() IN ('admin', 'recruiter', 'editor'));

DROP POLICY IF EXISTS "Admins can delete chatbot leads" ON chat_leads;
CREATE POLICY "Admins can delete chatbot leads" ON chat_leads
    FOR DELETE USING (get_user_role() = 'admin');

-- Add index mappings for fast query filtering
CREATE INDEX IF NOT EXISTS idx_articles_is_published ON articles(is_published, language);
CREATE INDEX IF NOT EXISTS idx_case_studies_is_published ON case_studies(is_published, language);

-- =========================================================================
5. NEWSLETTER SUBSCRIBERS SCHEMA & RLS POLICY ALIGNMENT
-- =========================================================================

-- Ensure language and source_page columns exist
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS language TEXT CHECK (language IN ('en', 'es')) DEFAULT 'en';
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS source_page TEXT;

-- Verify Row Level Security is active
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Reset and configure public anon client inserts
DROP POLICY IF EXISTS "Allow newsletter inserts" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public inserts/updates on newsletter subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public inserts on newsletter subscribers" ON newsletter_subscribers;

CREATE POLICY "Allow public inserts on newsletter subscribers"
ON newsletter_subscribers
FOR INSERT
TO anon
WITH CHECK (true);

