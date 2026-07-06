-- Consolidated Migration: Rebuild Database Layer from scratch for HyperCode Enterprise Platform
-- Date: 2026-07-01
-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================================
-- 1. Helper Triggers & Functions
-- =========================================================================

-- Trigger function to update updated_at timestamps automatically
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================================================================
-- 2. User Profiles & RBAC
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'Consultant' CHECK (role IN ('Admin', 'Recruiter', 'Consultant', 'Manager')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    name TEXT,
    avatar TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for user_profiles
DROP TRIGGER IF EXISTS tr_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER tr_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Helper function to fetch user roles securely (bypasses RLS recursion)
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
    SELECT role FROM public.user_profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- =========================================================================
-- 3. Chat Conversations, Messages & Leads
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.chat_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL UNIQUE,
    language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'es')),
    visitor_name TEXT,
    visitor_email TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for chat_conversations
DROP TRIGGER IF EXISTS tr_chat_conversations_updated_at ON public.chat_conversations;
CREATE TRIGGER tr_chat_conversations_updated_at
    BEFORE UPDATE ON public.chat_conversations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant')),
    message TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'es')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.chat_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT NOT NULL,
    industry TEXT NOT NULL,
    service_interest TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    timeline TEXT NOT NULL,
    message TEXT,
    lead_score INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost')),
    language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'es')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================================================
-- 4. Contact Inquiries & Consultation Requests
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost')),
    source TEXT NOT NULL DEFAULT 'website',
    -- New Fields for Re-design
    services JSONB DEFAULT '[]'::jsonb,
    industry TEXT,
    company_size TEXT,
    budget TEXT,
    timeline TEXT,
    country TEXT,
    preferred_contact_method TEXT,
    project_type TEXT,
    required_technologies JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for contact_inquiries
DROP TRIGGER IF EXISTS tr_contact_inquiries_updated_at ON public.contact_inquiries;
CREATE TRIGGER tr_contact_inquiries_updated_at
    BEFORE UPDATE ON public.contact_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.consultation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    service_interest TEXT NOT NULL,
    project_description TEXT NOT NULL,
    budget TEXT,
    timeline TEXT,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost')),
    name TEXT,
    service TEXT,
    message TEXT,
    preferred_date TEXT,
    language TEXT DEFAULT 'en' CHECK (language IN ('en', 'es')),
    -- New Fields for Re-design
    business_goal TEXT,
    current_challenges TEXT,
    expected_outcome TEXT,
    preferred_services JSONB DEFAULT '[]'::jsonb,
    industry TEXT,
    company_size TEXT,
    current_tech_stack TEXT,
    preferred_meeting_type TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for consultation_requests
DROP TRIGGER IF EXISTS tr_consultation_requests_updated_at ON public.consultation_requests;
CREATE TRIGGER tr_consultation_requests_updated_at
    BEFORE UPDATE ON public.consultation_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================================
-- 5. Careers (Candidates & Applications)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    linkedin TEXT,
    resume_url TEXT NOT NULL,
    skills TEXT,
    experience TEXT,
    availability TEXT,
    location TEXT,
    status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Reviewing', 'Interviewing', 'Placed', 'Inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for candidates
DROP TRIGGER IF EXISTS tr_candidates_updated_at ON public.candidates;
CREATE TRIGGER tr_candidates_updated_at
    BEFORE UPDATE ON public.candidates
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================================
-- 6. Newsletter Subscriptions
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed')),
    language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'es')),
    source_page TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for newsletter_subscribers
DROP TRIGGER IF EXISTS tr_newsletter_subscribers_updated_at ON public.newsletter_subscribers;
CREATE TRIGGER tr_newsletter_subscribers_updated_at
    BEFORE UPDATE ON public.newsletter_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================================
-- 7. CMS - Articles & Case Studies
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    featured_image TEXT,
    author JSONB,
    reading_time TEXT,
    published_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    language TEXT NOT NULL CHECK (language IN ('en', 'es')) DEFAULT 'en',
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for articles
DROP TRIGGER IF EXISTS tr_articles_updated_at ON public.articles;
CREATE TRIGGER tr_articles_updated_at
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    industry TEXT NOT NULL,
    client_type TEXT,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    results TEXT NOT NULL,
    technologies TEXT,
    featured_image TEXT,
    language TEXT NOT NULL CHECK (language IN ('en', 'es')) DEFAULT 'en',
    published_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for case_studies
DROP TRIGGER IF EXISTS tr_case_studies_updated_at ON public.case_studies;
CREATE TRIGGER tr_case_studies_updated_at
    BEFORE UPDATE ON public.case_studies
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================================
-- 8. Company Settings & Email Templates
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.company_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    company_name TEXT NOT NULL DEFAULT 'HyperCode',
    email TEXT NOT NULL DEFAULT 'info@hypercode.com',
    phone TEXT DEFAULT '+1 (510) 203-9270',
    address TEXT DEFAULT '2095 Hammond Dr
Suite C
Schaumburg, IL 60173
United States',
    social_links JSONB DEFAULT '{"linkedin": "https://linkedin.com/company/hypercode"}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for company_settings
DROP TRIGGER IF EXISTS tr_company_settings_updated_at ON public.company_settings;
CREATE TRIGGER tr_company_settings_updated_at
    BEFORE UPDATE ON public.company_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.email_templates (
    id TEXT PRIMARY KEY,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for email_templates
DROP TRIGGER IF EXISTS tr_email_templates_updated_at ON public.email_templates;
CREATE TRIGGER tr_email_templates_updated_at
    BEFORE UPDATE ON public.email_templates
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================================
-- 9. Performance Indexes
-- =========================================================================
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session ON public.chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON public.chat_messages(conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_chat_leads_created ON public.chat_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created ON public.contact_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_created ON public.consultation_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_candidates_name ON public.candidates(name);
CREATE INDEX IF NOT EXISTS idx_newsletter_created ON public.newsletter_subscribers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON public.case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(is_published, language);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON public.case_studies(is_published, language);

-- =========================================================================
-- 10. Database Diagnostics RPC Function
-- =========================================================================
CREATE OR REPLACE FUNCTION public.get_db_diagnostics()
RETURNS JSON AS $$
DECLARE
    caller_role TEXT;
    result JSON;
BEGIN
    -- Allow service_role or authenticated staff
    IF auth.role() <> 'service_role' THEN
        SELECT role INTO caller_role FROM public.user_profiles WHERE id = auth.uid();
        IF caller_role IS NULL OR caller_role NOT IN ('Admin', 'Consultant', 'Recruiter', 'Manager') THEN
            RAISE EXCEPTION 'Unauthorized: Access to database diagnostics is restricted to staff.';
        END IF;
    END IF;

    SELECT json_build_object(
        'tables', (
            SELECT json_agg(json_build_object(
                'table_name', tablename,
                'rowsecurity', rowsecurity
            ))
            FROM pg_tables
            JOIN pg_class ON pg_class.relname = pg_tables.tablename
            WHERE schemaname = 'public'
        ),
        'columns', (
            SELECT json_agg(json_build_object(
                'table_name', table_name,
                'column_name', column_name,
                'data_type', data_type,
                'is_nullable', is_nullable
            ))
            FROM information_schema.columns
            WHERE table_schema = 'public'
        ),
        'policies', (
            SELECT json_agg(json_build_object(
                'table_name', tablename,
                'policy_name', policyname,
                'cmd', cmd,
                'roles', roles
            ))
            FROM pg_policies
            WHERE schemaname = 'public'
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =========================================================================
-- 11. Row-Level Security Enablement & RLS Policies
-- =========================================================================

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Reset policies
DROP POLICY IF EXISTS "Allow users to select their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow staff to select all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow admins to manage all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow public insert on chat_conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Allow public select on chat_conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Allow public update on chat_conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Allow admin manage on chat_conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Allow public insert on chat_messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Allow public select on chat_messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Allow admin manage on chat_messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Allow public insert on chat_leads" ON public.chat_leads;
DROP POLICY IF EXISTS "Allow staff select on chat_leads" ON public.chat_leads;
DROP POLICY IF EXISTS "Allow admin manage on chat_leads" ON public.chat_leads;
DROP POLICY IF EXISTS "Allow public insert on contact_inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Allow staff read/write on contact_inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Allow public insert on consultation_requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Allow staff read/write on consultation_requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Allow public insert on candidates" ON public.candidates;
DROP POLICY IF EXISTS "Allow staff read/write on candidates" ON public.candidates;
DROP POLICY IF EXISTS "Allow public insert on newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow staff read/write on newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public select on published articles" ON public.articles;
DROP POLICY IF EXISTS "Allow staff select on all articles" ON public.articles;
DROP POLICY IF EXISTS "Allow admins to manage articles" ON public.articles;
DROP POLICY IF EXISTS "Allow public select on published case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Allow staff select on all case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Allow admins to manage case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Allow public read on company settings" ON public.company_settings;
DROP POLICY IF EXISTS "Allow admins to manage company settings" ON public.company_settings;
DROP POLICY IF EXISTS "Allow staff select on email templates" ON public.email_templates;
DROP POLICY IF EXISTS "Allow admins to manage email templates" ON public.email_templates;

-- Define policies
CREATE POLICY "Allow users to select their own profile" ON public.user_profiles
    FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Allow staff to select all profiles" ON public.user_profiles
    FOR SELECT TO authenticated USING (public.get_user_role() IN ('Admin', 'Recruiter', 'Consultant', 'Manager'));

CREATE POLICY "Allow admins to manage all profiles" ON public.user_profiles
    FOR ALL TO authenticated USING (public.get_user_role() = 'Admin');

CREATE POLICY "Allow public insert on chat_conversations" ON public.chat_conversations
    FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public select on chat_conversations" ON public.chat_conversations
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow public update on chat_conversations" ON public.chat_conversations
    FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin manage on chat_conversations" ON public.chat_conversations
    FOR ALL TO authenticated USING (public.get_user_role() = 'Admin');

CREATE POLICY "Allow public insert on chat_messages" ON public.chat_messages
    FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public select on chat_messages" ON public.chat_messages
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow admin manage on chat_messages" ON public.chat_messages
    FOR ALL TO authenticated USING (public.get_user_role() = 'Admin');

CREATE POLICY "Allow public insert on chat_leads" ON public.chat_leads
    FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow staff select on chat_leads" ON public.chat_leads
    FOR SELECT TO authenticated USING (public.get_user_role() IN ('Admin', 'Recruiter', 'Consultant', 'Manager'));

CREATE POLICY "Allow admin manage on chat_leads" ON public.chat_leads
    FOR ALL TO authenticated USING (public.get_user_role() = 'Admin');

CREATE POLICY "Allow public insert on contact_inquiries" ON public.contact_inquiries
    FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow staff read/write on contact_inquiries" ON public.contact_inquiries
    FOR ALL TO authenticated USING (public.get_user_role() IN ('Admin', 'Recruiter', 'Consultant', 'Manager'));

CREATE POLICY "Allow public insert on consultation_requests" ON public.consultation_requests
    FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow staff read/write on consultation_requests" ON public.consultation_requests
    FOR ALL TO authenticated USING (public.get_user_role() IN ('Admin', 'Recruiter', 'Consultant', 'Manager'));

CREATE POLICY "Allow public insert on candidates" ON public.candidates
    FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow staff read/write on candidates" ON public.candidates
    FOR ALL TO authenticated USING (public.get_user_role() IN ('Admin', 'Recruiter', 'Consultant', 'Manager'));

CREATE POLICY "Allow public insert on newsletter_subscribers" ON public.newsletter_subscribers
    FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow staff read/write on newsletter_subscribers" ON public.newsletter_subscribers
    FOR ALL TO authenticated USING (public.get_user_role() IN ('Admin', 'Recruiter', 'Consultant', 'Manager'));

CREATE POLICY "Allow public select on published articles" ON public.articles
    FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "Allow staff select on all articles" ON public.articles
    FOR SELECT TO authenticated USING (public.get_user_role() IN ('Admin', 'Recruiter', 'Consultant', 'Manager'));

CREATE POLICY "Allow admins to manage articles" ON public.articles
    FOR ALL TO authenticated USING (public.get_user_role() = 'Admin');

CREATE POLICY "Allow public select on published case studies" ON public.case_studies
    FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "Allow staff select on all case studies" ON public.case_studies
    FOR SELECT TO authenticated USING (public.get_user_role() IN ('Admin', 'Recruiter', 'Consultant', 'Manager'));

CREATE POLICY "Allow admins to manage case studies" ON public.case_studies
    FOR ALL TO authenticated USING (public.get_user_role() = 'Admin');

CREATE POLICY "Allow public read on company settings" ON public.company_settings
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow admins to manage company settings" ON public.company_settings
    FOR ALL TO authenticated USING (public.get_user_role() = 'Admin');

CREATE POLICY "Allow staff select on email templates" ON public.email_templates
    FOR SELECT TO authenticated USING (public.get_user_role() IN ('Admin', 'Recruiter', 'Consultant', 'Manager'));

CREATE POLICY "Allow admins to manage email templates" ON public.email_templates
    FOR ALL TO authenticated USING (public.get_user_role() = 'Admin');

-- =========================================================================
-- 12. Initial Seeds
-- =========================================================================
INSERT INTO public.company_settings (id, company_name, email, phone, address, social_links)
VALUES ('default', 'HyperCode', 'info@hypercode.com', '+1 (510) 203-9270', '2095 Hammond Dr
Suite C
Schaumburg, IL 60173
United States', '{"linkedin": "https://linkedin.com/company/hypercode"}'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.email_templates (id, subject, body) VALUES
('contact', 'Thank you for contacting HyperCode', 'Hi {{name}},\n\nThank you for reaching out to us. We have received your message regarding "{{subject}}" and a consultant will respond to you within 24 hours.\n\nBest regards,\nHyperCode Team'),
('consultation', 'Consultation Request Received', 'Hi {{name}},\n\nThank you for requesting a technology consultation for "{{service_interest}}". Our team is reviewing your project description and budget of "{{budget}}" to assign the best specialist.\n\nWe will get back to you shortly to schedule our meeting.\n\nBest regards,\nHyperCode Consulting'),
('application', 'Application Received: {{position}}', 'Hi {{name}},\n\nThank you for applying for the {{position}} position at HyperCode. We have received your resume and application details.\n\nOur recruiting team is reviewing candidates and will update you on the next steps.\n\nBest regards,\nHyperCode Careers'),
('newsletter', 'Welcome to HyperCode Insights', 'Hi Subscriber,\n\nThank you for subscribing to our newsletter! You will now receive monthly technology insights, case studies, and engineering updates in {{language}}.\n\nBest regards,\nHyperCode Editorial')
ON CONFLICT (id) DO NOTHING;
