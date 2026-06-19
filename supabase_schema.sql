-- Supabase Database Schema for HyperCode Enterprise Platform
-- Execute this script in your Supabase SQL Editor to set up the necessary tables and RLS security policies.

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================================
-- 1. USER PROFILES & RBAC (Role-Based Access Control)
-- =========================================================================

CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'Consultant' CHECK (role IN ('Admin', 'Recruiter', 'Consultant')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Helper function to fetch the role of the currently logged-in user
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
    SELECT role FROM user_profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- Policies for user_profiles
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles" ON user_profiles
    FOR ALL USING (get_user_role() = 'Admin');


-- =========================================================================
-- 2. CHAT CONVERSATIONS & MESSAGES
-- =========================================================================

CREATE TABLE IF NOT EXISTS chat_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant')),
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session ON chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id, created_at);

-- Enable RLS
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Chat Policies
CREATE POLICY "Allow public insert on conversations" ON chat_conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on conversations" ON chat_conversations FOR SELECT USING (true);
CREATE POLICY "Allow public update on conversations" ON chat_conversations FOR UPDATE USING (true);

CREATE POLICY "Allow public insert on messages" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on messages" ON chat_messages FOR SELECT USING (true);


-- =========================================================================
-- 3. CONTACT INQUIRIES
-- =========================================================================

CREATE TABLE IF NOT EXISTS contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
    source TEXT NOT NULL DEFAULT 'website'
);

-- Index for date filtering
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created ON contact_inquiries(created_at DESC);

-- Enable RLS
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Contact Policies
CREATE POLICY "Allow public inserts on contact inquiries" ON contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins and Consultants can read/write contact inquiries" ON contact_inquiries
    FOR ALL USING (get_user_role() IN ('Admin', 'Consultant'));


-- =========================================================================
-- 4. CONSULTATION REQUESTS
-- =========================================================================

CREATE TABLE IF NOT EXISTS consultation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    full_name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    service_interest TEXT NOT NULL,
    project_description TEXT NOT NULL,
    budget TEXT,
    timeline TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'scheduled', 'archived'))
);

-- Index for date filtering
CREATE INDEX IF NOT EXISTS idx_consultations_created ON consultation_requests(created_at DESC);

-- Enable RLS
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Consultation Policies
CREATE POLICY "Allow public inserts on consultation requests" ON consultation_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins and Consultants can read/write consultation requests" ON consultation_requests
    FOR ALL USING (get_user_role() IN ('Admin', 'Consultant'));


-- =========================================================================
-- 5. CAREERS & CANDIDATE DATABASE
-- =========================================================================

CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    linkedin TEXT,
    resume_url TEXT NOT NULL,
    position TEXT NOT NULL,
    years_experience INTEGER,
    skills TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Reviewing', 'Shortlisted', 'Interview', 'Offered', 'Hired', 'Rejected'))
);

CREATE TABLE IF NOT EXISTS candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    linkedin TEXT,
    resume_url TEXT NOT NULL,
    skills TEXT,
    experience TEXT,
    availability TEXT,
    location TEXT,
    status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Reviewing', 'Interviewing', 'Placed', 'Inactive'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_job_apps_created ON job_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_candidates_name ON candidates(name);

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

-- Policies for Careers & Candidates
CREATE POLICY "Allow public inserts on job applications" ON job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins and Recruiters can read/write job applications" ON job_applications
    FOR ALL USING (get_user_role() IN ('Admin', 'Recruiter'));

CREATE POLICY "Admins and Recruiters can read/write candidates" ON candidates
    FOR ALL USING (get_user_role() IN ('Admin', 'Recruiter'));


-- =========================================================================
-- 6. CHATBOT LEAD CAPTURE
-- =========================================================================

CREATE TABLE IF NOT EXISTS chat_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT,
    email TEXT,
    phone TEXT,
    interest TEXT,
    conversation_summary TEXT
);

CREATE INDEX IF NOT EXISTS idx_chat_leads_created ON chat_leads(created_at DESC);

-- Enable RLS
ALTER TABLE chat_leads ENABLE ROW LEVEL SECURITY;

-- Chatbot Lead Policies
CREATE POLICY "Allow public inserts on chatbot leads" ON chat_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins, Recruiters, and Consultants can read chatbot leads" ON chat_leads
    FOR SELECT USING (get_user_role() IN ('Admin', 'Recruiter', 'Consultant'));
CREATE POLICY "Admins can delete chatbot leads" ON chat_leads
    FOR DELETE USING (get_user_role() = 'Admin');


-- =========================================================================
-- 7. NEWSLETTER SUBSCRIPTIONS
-- =========================================================================

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    status TEXT NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed'))
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Newsletter Policies
CREATE POLICY "Allow public inserts/updates on newsletter subscribers" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage newsletter subscribers" ON newsletter_subscribers
    FOR ALL USING (get_user_role() = 'Admin');


-- =========================================================================
-- 8. CMS - ARTICLES & CASE STUDIES
-- =========================================================================

CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'es')),
    published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    client_industry TEXT NOT NULL,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    results TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'es')),
    published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- CMS Policies
CREATE POLICY "Allow public reads on published articles" ON articles
    FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage articles" ON articles
    FOR ALL USING (get_user_role() = 'Admin');

CREATE POLICY "Allow public reads on published case studies" ON case_studies
    FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage case studies" ON case_studies
    FOR ALL USING (get_user_role() = 'Admin');


-- =========================================================================
-- 9. SEED MOCK DATA & ROLE SETUP INSTRUCTIONS
-- =========================================================================

-- Example SQL to assign role to a user after signup:
-- INSERT INTO public.user_profiles (id, email, role) 
-- VALUES ('<supabase-user-uuid>', 'admin@hypercode.com', 'Admin')
-- ON CONFLICT (id) DO UPDATE SET role = 'Admin';
