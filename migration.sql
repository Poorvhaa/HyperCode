-- HyperCode Admin Dashboard Schema Migration
-- Execute this script in your Supabase SQL Editor (SQL Web Console) to update the database.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================================
-- 1. CLEAN UP EXISTING CMS TABLES TO AVOID CONSTRAINTS MISMATCH
-- =========================================================================
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS case_studies CASCADE;

-- =========================================================================
-- 2. CREATE ARTICLES TABLE WITH ALL CMS FIELDS
-- =========================================================================
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    featured_image TEXT,
    author JSONB, -- { "name": "...", "role": "...", "avatar": "..." }
    reading_time TEXT,
    published_date TIMESTAMPTZ DEFAULT now(),
    language TEXT CHECK (language IN ('en', 'es')) DEFAULT 'en',
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- =========================================================================
-- 3. CREATE CASE STUDIES TABLE WITH ALL CMS FIELDS
-- =========================================================================
CREATE TABLE case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    industry TEXT NOT NULL,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    results TEXT NOT NULL,
    technologies TEXT, -- Comma-separated list of tech
    featured_image TEXT,
    language TEXT CHECK (language IN ('en', 'es')) DEFAULT 'en',
    published_date TIMESTAMPTZ DEFAULT now(),
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- =========================================================================
-- 4. UPDATE USER PROFILES AND RBAC
-- =========================================================================
-- Add columns if they do not exist
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS avatar TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Drop old check constraint if it exists and make sure it has 'Admin', 'Recruiter', 'Consultant'
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_role_check;
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_role_check CHECK (role IN ('Admin', 'Recruiter', 'Consultant'));
ALTER TABLE user_profiles ALTER COLUMN role SET DEFAULT 'Consultant';

-- Recreate role helper function
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
    SELECT role FROM user_profiles WHERE id = auth.uid() AND is_active = true;
$$ LANGUAGE sql SECURITY DEFINER;

-- =========================================================================
-- 5. UPDATE CONTACT & LEAD TABLES FOR UNIFIED LEAD STATUS
-- =========================================================================

-- newsletter_subscribers adjustments
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS language TEXT CHECK (language IN ('en', 'es')) DEFAULT 'en';
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS source_page TEXT;

-- chat_leads adjustments
ALTER TABLE chat_leads ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE chat_leads ADD COLUMN IF NOT EXISTS source TEXT;
ALTER TABLE chat_leads ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'));

-- chat_messages adjustments
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS session_id TEXT;
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS language TEXT CHECK (language IN ('en', 'es')) DEFAULT 'en';

-- contact_inquiries adjustments (alter constraints for Lead Statuses)
-- Drop existing constraint
ALTER TABLE contact_inquiries DROP CONSTRAINT IF EXISTS contact_inquiries_status_check;
-- Alter status column type and default
ALTER TABLE contact_inquiries ALTER COLUMN status SET DEFAULT 'New';
-- Update old values
UPDATE contact_inquiries SET status = 'New' WHERE status = 'new';
UPDATE contact_inquiries SET status = 'Contacted' WHERE status = 'read';
UPDATE contact_inquiries SET status = 'Lost' WHERE status = 'archived';
-- Add new constraint
ALTER TABLE contact_inquiries ADD CONSTRAINT contact_inquiries_status_check CHECK (status IN ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'));

-- consultation_requests adjustments (alter constraints for Lead Statuses)
ALTER TABLE consultation_requests DROP CONSTRAINT IF EXISTS consultation_requests_status_check;
ALTER TABLE consultation_requests ALTER COLUMN status SET DEFAULT 'New';
UPDATE consultation_requests SET status = 'New' WHERE status = 'new';
UPDATE consultation_requests SET status = 'Contacted' WHERE status = 'scheduled';
UPDATE consultation_requests SET status = 'Lost' WHERE status = 'archived';
ALTER TABLE consultation_requests ADD CONSTRAINT consultation_requests_status_check CHECK (status IN ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'));

-- =========================================================================
-- 6. SETTINGS & EMAIL TEMPLATES TABLES
-- =========================================================================
CREATE TABLE IF NOT EXISTS company_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    company_name TEXT NOT NULL DEFAULT 'HyperCode',
    email TEXT NOT NULL DEFAULT 'info@hypercode.com',
    phone TEXT DEFAULT '+1 (510) 203-9270',
    address TEXT DEFAULT '2095 Hammond Dr
Suite C
Schaumburg, IL 60173
United States',
    social_links JSONB DEFAULT '{"linkedin": "https://linkedin.com/company/hypercode", "twitter": "https://twitter.com/hypercode", "github": "https://github.com/hypercode"}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS email_templates (
    id TEXT PRIMARY KEY, -- 'contact', 'consultation', 'application', 'newsletter'
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed default company settings
INSERT INTO company_settings (id, company_name, email, phone, address, social_links)
VALUES ('default', 'HyperCode', 'info@hypercode.com', '+1 (510) 203-9270', '2095 Hammond Dr
Suite C
Schaumburg, IL 60173
United States', '{"linkedin": "https://linkedin.com/company/hypercode", "twitter": "https://twitter.com/hypercode", "github": "https://github.com/hypercode"}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Seed default email templates
INSERT INTO email_templates (id, subject, body) VALUES
('contact', 'Thank you for contacting HyperCode', 'Hi {{name}},\n\nThank you for reaching out to us. We have received your message regarding "{{subject}}" and a consultant will respond to you within 24 hours.\n\nBest regards,\nHyperCode Team'),
('consultation', 'Consultation Request Received', 'Hi {{name}},\n\nThank you for requesting a technology consultation for "{{service_interest}}". Our team is reviewing your project description and budget of "{{budget}}" to assign the best specialist.\n\nWe will get back to you shortly to schedule our meeting.\n\nBest regards,\nHyperCode Consulting'),
('application', 'Application Received: {{position}}', 'Hi {{name}},\n\nThank you for applying for the {{position}} position at HyperCode. We have received your resume and application details.\n\nOur recruiting team is reviewing candidates and will update you on the next steps.\n\nBest regards,\nHyperCode Careers'),
('newsletter', 'Welcome to HyperCode Insights', 'Hi Subscriber,\n\nThank you for subscribing to our newsletter! You will now receive monthly technology insights, case studies, and engineering updates in {{language}}.\n\nBest regards,\nHyperCode Editorial')
ON CONFLICT (id) DO NOTHING;

-- =========================================================================
-- 7. CONFIGURE ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

-- Reset policies to avoid errors
DROP POLICY IF EXISTS "Allow public select on published articles" ON articles;
DROP POLICY IF EXISTS "Admins can manage articles" ON articles;
DROP POLICY IF EXISTS "Allow public select on published case studies" ON case_studies;
DROP POLICY IF EXISTS "Admins can manage case studies" ON case_studies;
DROP POLICY IF EXISTS "Allow public inserts on newsletter subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can manage newsletter subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public inserts on chatbot leads" ON chat_leads;
DROP POLICY IF EXISTS "Admins, Recruiters, and Editors can read chatbot leads" ON chat_leads;
DROP POLICY IF EXISTS "Admins can delete chatbot leads" ON chat_leads;
DROP POLICY IF EXISTS "Admins and Consultants can read/write chat leads" ON chat_leads;
DROP POLICY IF EXISTS "Allow public insert on messages" ON chat_messages;
DROP POLICY IF EXISTS "Allow public select on messages" ON chat_messages;
DROP POLICY IF EXISTS "Admins and Consultants can read/write chat messages" ON chat_messages;
DROP POLICY IF EXISTS "Allow public inserts on contact inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Admins and Consultants can read/write contact inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Allow public inserts on consultation requests" ON consultation_requests;
DROP POLICY IF EXISTS "Admins and Consultants can read/write consultation requests" ON consultation_requests;
DROP POLICY IF EXISTS "Allow public inserts on job applications" ON job_applications;
DROP POLICY IF EXISTS "Admins and Recruiters can read/write job applications" ON job_applications;
DROP POLICY IF EXISTS "Admins and Recruiters can read/write candidates" ON candidates;
DROP POLICY IF EXISTS "Admins can manage settings" ON company_settings;
DROP POLICY IF EXISTS "All users can view company settings" ON company_settings;
DROP POLICY IF EXISTS "Admins can manage templates" ON email_templates;
DROP POLICY IF EXISTS "All users can view email templates" ON email_templates;

-- 7.1 CMS Articles & Case Studies Policies
CREATE POLICY "Allow public select on published articles" ON articles FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage articles" ON articles FOR ALL USING (get_user_role() = 'Admin');

CREATE POLICY "Allow public select on published case studies" ON case_studies FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage case studies" ON case_studies FOR ALL USING (get_user_role() = 'Admin');

-- 7.2 Newsletter Subscribers Policies
CREATE POLICY "Allow public inserts on newsletter subscribers" ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admins can manage newsletter subscribers" ON newsletter_subscribers FOR ALL USING (get_user_role() = 'Admin');

-- 7.3 Chatbot Leads & Messages Policies
CREATE POLICY "Allow public inserts on chatbot leads" ON chat_leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admins and Consultants can read/write chat leads" ON chat_leads FOR ALL USING (get_user_role() IN ('Admin', 'Consultant'));

CREATE POLICY "Allow public insert on messages" ON chat_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public select on messages" ON chat_messages FOR SELECT TO anon USING (true);
CREATE POLICY "Admins and Consultants can read/write chat messages" ON chat_messages FOR ALL USING (get_user_role() IN ('Admin', 'Consultant'));

-- 7.4 Contact Inquiries & Consultation Requests Policies
CREATE POLICY "Allow public inserts on contact inquiries" ON contact_inquiries FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admins and Consultants can read/write contact inquiries" ON contact_inquiries FOR ALL USING (get_user_role() IN ('Admin', 'Consultant'));

CREATE POLICY "Allow public inserts on consultation requests" ON consultation_requests FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admins and Consultants can read/write consultation requests" ON consultation_requests FOR ALL USING (get_user_role() IN ('Admin', 'Consultant'));

-- 7.5 Careers & Candidate Database Policies
CREATE POLICY "Allow public inserts on job applications" ON job_applications FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admins and Recruiters can read/write job applications" ON job_applications FOR ALL USING (get_user_role() IN ('Admin', 'Recruiter'));

CREATE POLICY "Admins and Recruiters can read/write candidates" ON candidates FOR ALL USING (get_user_role() IN ('Admin', 'Recruiter'));

-- 7.6 System Settings & Email Templates Policies
CREATE POLICY "All users can view company settings" ON company_settings FOR SELECT USING (get_user_role() IN ('Admin', 'Recruiter', 'Consultant'));
CREATE POLICY "Admins can manage settings" ON company_settings FOR ALL USING (get_user_role() = 'Admin');

CREATE POLICY "All users can view email templates" ON email_templates FOR SELECT USING (get_user_role() IN ('Admin', 'Recruiter', 'Consultant'));
CREATE POLICY "Admins can manage templates" ON email_templates FOR ALL USING (get_user_role() = 'Admin');

-- =========================================================================
-- 8. INDEXES FOR HIGH-PERFORMANCE SEARCH
-- =========================================================================
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published, language);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON case_studies(is_published, language);
CREATE INDEX IF NOT EXISTS idx_chat_leads_status ON chat_leads(status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_candidates_skills ON candidates(skills);
