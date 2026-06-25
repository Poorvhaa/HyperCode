-- Migration v2: Complete Supabase Schema Consolidation & Synchronization

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================================
-- 1. CMS TABLES ALIGNMENT (Articles & Case Studies)
-- =========================================================================

-- Recreate articles table with proper fields
DROP TABLE IF EXISTS articles CASCADE;
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

-- Recreate case_studies table with proper fields
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
    technologies TEXT, -- Comma-separated list of tech
    featured_image TEXT,
    language TEXT CHECK (language IN ('en', 'es')) DEFAULT 'en',
    published_date TIMESTAMPTZ DEFAULT now(),
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for CMS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- CMS Policies
DROP POLICY IF EXISTS "Allow public select on published articles" ON articles;
DROP POLICY IF EXISTS "Admins can manage articles" ON articles;
CREATE POLICY "Allow public select on published articles" ON articles FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage articles" ON articles FOR ALL USING (get_user_role() = 'Admin');

DROP POLICY IF EXISTS "Allow public select on published case studies" ON case_studies;
DROP POLICY IF EXISTS "Admins can manage case studies" ON case_studies;
CREATE POLICY "Allow public select on published case studies" ON case_studies FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage case studies" ON case_studies FOR ALL USING (get_user_role() = 'Admin');

-- CMS Indexes
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published, language);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON case_studies(is_published, language);


-- =========================================================================
-- 2. USER PROFILES & Role-Based Access Control (RBAC)
-- =========================================================================

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS avatar TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Update constraints to match capitalized roles used in the admin panel
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_role_check;
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_role_check CHECK (role IN ('Admin', 'Recruiter', 'Consultant'));
ALTER TABLE user_profiles ALTER COLUMN role SET DEFAULT 'Consultant';

-- Recreate role helper function
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
    SELECT role FROM user_profiles WHERE id = auth.uid() AND is_active = true;
$$ LANGUAGE sql SECURITY DEFINER;


-- =========================================================================
-- 3. CHAT CONVERSATIONS, MESSAGES, AND LEADS ALIGNMENT
-- =========================================================================

-- chat_messages adjustments
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS session_id TEXT;
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en';

-- chat_leads adjustments
ALTER TABLE chat_leads ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE chat_leads ADD COLUMN IF NOT EXISTS source TEXT;
ALTER TABLE chat_leads ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'New';

ALTER TABLE chat_leads DROP CONSTRAINT IF EXISTS chat_leads_status_check;
ALTER TABLE chat_leads ADD CONSTRAINT chat_leads_status_check CHECK (status IN ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'));

CREATE INDEX IF NOT EXISTS idx_chat_leads_status ON chat_leads(status);


-- =========================================================================
-- 4. CONTACT INQUIRIES & CONSULTATION REQUESTS (Aliging status constraints)
-- =========================================================================

-- contact_inquiries status update
ALTER TABLE contact_inquiries DROP CONSTRAINT IF EXISTS contact_inquiries_status_check;
ALTER TABLE contact_inquiries ALTER COLUMN status SET DEFAULT 'New';
UPDATE contact_inquiries SET status = 'New' WHERE status = 'new';
UPDATE contact_inquiries SET status = 'Contacted' WHERE status = 'read';
UPDATE contact_inquiries SET status = 'Lost' WHERE status = 'archived';
ALTER TABLE contact_inquiries ADD CONSTRAINT contact_inquiries_status_check CHECK (status IN ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'));

-- consultation_requests status update
ALTER TABLE consultation_requests DROP CONSTRAINT IF EXISTS consultation_requests_status_check;
ALTER TABLE consultation_requests ALTER COLUMN status SET DEFAULT 'New';
UPDATE consultation_requests SET status = 'New' WHERE status = 'new';
UPDATE consultation_requests SET status = 'Contacted' WHERE status = 'scheduled';
UPDATE consultation_requests SET status = 'Lost' WHERE status = 'archived';
ALTER TABLE consultation_requests ADD CONSTRAINT consultation_requests_status_check CHECK (status IN ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'));


-- =========================================================================
-- 5. STAFFING REQUESTS TABLE CREATION
-- =========================================================================

CREATE TABLE IF NOT EXISTS staffing_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    staffing_type TEXT,
    requirements TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE staffing_requests ENABLE ROW LEVEL SECURITY;

-- Reset and configure RLS policies for staffing_requests
DROP POLICY IF EXISTS "Allow public insert on staffing requests" ON staffing_requests;
DROP POLICY IF EXISTS "Admins and Consultants can read/write staffing requests" ON staffing_requests;

CREATE POLICY "Allow public insert on staffing requests" 
ON staffing_requests 
FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Admins and Consultants can read/write staffing requests" 
ON staffing_requests 
FOR ALL 
USING (get_user_role() IN ('Admin', 'Consultant'));


-- =========================================================================
-- 6. SYSTEM SETTINGS & EMAIL TEMPLATES TABLES
-- =========================================================================

CREATE TABLE IF NOT EXISTS company_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    company_name TEXT NOT NULL DEFAULT 'HyperCode',
    email TEXT NOT NULL DEFAULT 'info@hypercode.com',
    phone TEXT DEFAULT '+1 (555) 019-2834',
    address TEXT DEFAULT '100 Pine St, Suite 2400, San Francisco, CA 94111',
    social_links JSONB DEFAULT '{"linkedin": "https://linkedin.com/company/hypercode", "twitter": "https://twitter.com/hypercode", "github": "https://github.com/hypercode"}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS email_templates (
    id TEXT PRIMARY KEY, -- 'contact', 'consultation', 'application', 'newsletter'
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "All users can view company settings" ON company_settings;
DROP POLICY IF EXISTS "Admins can manage settings" ON company_settings;
CREATE POLICY "All users can view company settings" ON company_settings FOR SELECT USING (get_user_role() IN ('Admin', 'Recruiter', 'Consultant'));
CREATE POLICY "Admins can manage settings" ON company_settings FOR ALL USING (get_user_role() = 'Admin');

DROP POLICY IF EXISTS "All users can view email templates" ON email_templates;
DROP POLICY IF EXISTS "Admins can manage templates" ON email_templates;
CREATE POLICY "All users can view email templates" ON email_templates FOR SELECT USING (get_user_role() IN ('Admin', 'Recruiter', 'Consultant'));
CREATE POLICY "Admins can manage templates" ON email_templates FOR ALL USING (get_user_role() = 'Admin');

-- Seed defaults
INSERT INTO company_settings (id, company_name, email, phone, address, social_links)
VALUES ('default', 'HyperCode', 'info@hypercode.com', '+1 (555) 019-2834', '100 Pine St, Suite 2400, San Francisco, CA 94111', '{"linkedin": "https://linkedin.com/company/hypercode", "twitter": "https://twitter.com/hypercode", "github": "https://github.com/hypercode"}'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO email_templates (id, subject, body) VALUES
('contact', 'Thank you for contacting HyperCode', 'Hi {{name}},\n\nThank you for reaching out to us. We have received your message regarding "{{subject}}" and a consultant will respond to you within 24 hours.\n\nBest regards,\nHyperCode Team'),
('consultation', 'Consultation Request Received', 'Hi {{name}},\n\nThank you for requesting a technology consultation for "{{service_interest}}". Our team is reviewing your project description and budget of "{{budget}}" to assign the best specialist.\n\nWe will get back to you shortly to schedule our meeting.\n\nBest regards,\nHyperCode Consulting'),
('application', 'Application Received: {{position}}', 'Hi {{name}},\n\nThank you for applying for the {{position}} position at HyperCode. We have received your resume and application details.\n\nOur recruiting team is reviewing candidates and will update you on the next steps.\n\nBest regards,\nHyperCode Careers'),
('newsletter', 'Welcome to HyperCode Insights', 'Hi Subscriber,\n\nThank you for subscribing to our newsletter! You will now receive monthly technology insights, case studies, and engineering updates in {{language}}.\n\nBest regards,\nHyperCode Editorial')
ON CONFLICT (id) DO NOTHING;
