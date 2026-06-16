-- Supabase Database Schema for HyperCode AI Assistant
-- Execute this script in your Supabase SQL Editor to set up the necessary tables

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Chat Conversations Table
CREATE TABLE IF NOT EXISTS chat_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for session lookups
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session ON chat_conversations(session_id);

-- 2. Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant')),
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fetching messages chronologically
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id, created_at);

-- 3. Qualified Leads Table
CREATE TABLE IF NOT EXISTS qualified_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES chat_conversations(id) ON DELETE SET NULL,
    company_type TEXT CHECK (company_type IN ('Startup', 'SMB', 'Enterprise', 'Government')),
    service_interest TEXT,
    challenge TEXT,
    timeline TEXT CHECK (timeline IN ('Immediately', 'Within 30 days', '1–3 months', 'Just exploring')),
    score INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Consultation Requests Table
CREATE TABLE IF NOT EXISTS consultation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    service_needed TEXT,
    project_description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Staffing Requests Table
CREATE TABLE IF NOT EXISTS staffing_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    roles TEXT, -- Comma-separated roles or JSON array text
    timeline TEXT,
    team_size TEXT,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Set up Row Level Security (RLS) policies if desired
-- By default, we keep public read/write enabled for simplicity unless standard policies are applied
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE qualified_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE staffing_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts and reads (for public chatbot client usage)
CREATE POLICY "Allow public inserts on chat_conversations" ON chat_conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on chat_conversations" ON chat_conversations FOR SELECT USING (true);
CREATE POLICY "Allow public updates on chat_conversations" ON chat_conversations FOR UPDATE USING (true);

CREATE POLICY "Allow public inserts on chat_messages" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on chat_messages" ON chat_messages FOR SELECT USING (true);

CREATE POLICY "Allow public inserts on qualified_leads" ON qualified_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on qualified_leads" ON qualified_leads FOR SELECT USING (true);

CREATE POLICY "Allow public inserts on consultation_requests" ON consultation_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on consultation_requests" ON consultation_requests FOR SELECT USING (true);

CREATE POLICY "Allow public inserts on staffing_requests" ON staffing_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on staffing_requests" ON staffing_requests FOR SELECT USING (true);
