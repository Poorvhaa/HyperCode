-- Migration: Create AI Consultant Tables & RLS Policies
-- Date: 2026-06-27

-- 1. DROP LEGACY TABLES IF EXISTS (CASCADE)
DROP TABLE IF EXISTS chat_leads CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS chat_conversations CASCADE;

-- 2. CREATE chat_conversations
CREATE TABLE chat_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL UNIQUE,
    language TEXT NOT NULL CHECK (language IN ('en', 'es')),
    visitor_name TEXT,
    visitor_email TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. CREATE chat_messages
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant')),
    message TEXT NOT NULL,
    language TEXT NOT NULL CHECK (language IN ('en', 'es')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. CREATE chat_leads
CREATE TABLE chat_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
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
    language TEXT NOT NULL CHECK (language IN ('en', 'es')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. ALTER consultation_requests (Add Unified Columns for Backward Compatibility)
ALTER TABLE consultation_requests ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE consultation_requests ADD COLUMN IF NOT EXISTS service TEXT;
ALTER TABLE consultation_requests ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE consultation_requests ADD COLUMN IF NOT EXISTS preferred_date TEXT;
ALTER TABLE consultation_requests ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en' CHECK (language IN ('en', 'es'));

-- 6. CREATE INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session ON chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_chat_leads_score ON chat_leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_chat_leads_created ON chat_leads(created_at DESC);

-- 7. ENABLE ROW LEVEL SECURITY
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_leads ENABLE ROW LEVEL SECURITY;

-- 8. DEFINE RLS POLICIES

-- Policies for chat_conversations
DROP POLICY IF EXISTS "Allow public INSERT on chat_conversations" ON chat_conversations;
CREATE POLICY "Allow public INSERT on chat_conversations" ON chat_conversations
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public SELECT on chat_conversations" ON chat_conversations;
CREATE POLICY "Allow public SELECT on chat_conversations" ON chat_conversations
    FOR SELECT USING (true); -- Let users see their own conversations (can also check session_id on client-side)

DROP POLICY IF EXISTS "Allow public UPDATE on chat_conversations" ON chat_conversations;
CREATE POLICY "Allow public UPDATE on chat_conversations" ON chat_conversations
    FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin SELECT on chat_conversations" ON chat_conversations;
CREATE POLICY "Allow admin SELECT on chat_conversations" ON chat_conversations
    FOR SELECT USING (get_user_role() = 'Admin');

DROP POLICY IF EXISTS "Allow admin UPDATE on chat_conversations" ON chat_conversations;
CREATE POLICY "Allow admin UPDATE on chat_conversations" ON chat_conversations
    FOR UPDATE USING (get_user_role() = 'Admin');

DROP POLICY IF EXISTS "Allow admin DELETE on chat_conversations" ON chat_conversations;
CREATE POLICY "Allow admin DELETE on chat_conversations" ON chat_conversations
    FOR DELETE USING (get_user_role() = 'Admin');

-- Policies for chat_messages
DROP POLICY IF EXISTS "Allow public INSERT on chat_messages" ON chat_messages;
CREATE POLICY "Allow public INSERT on chat_messages" ON chat_messages
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public SELECT on chat_messages" ON chat_messages;
CREATE POLICY "Allow public SELECT on chat_messages" ON chat_messages
    FOR SELECT USING (true); -- Let users see their own messages

DROP POLICY IF EXISTS "Allow admin SELECT on chat_messages" ON chat_messages;
CREATE POLICY "Allow admin SELECT on chat_messages" ON chat_messages
    FOR SELECT USING (get_user_role() = 'Admin');

DROP POLICY IF EXISTS "Allow admin DELETE on chat_messages" ON chat_messages;
CREATE POLICY "Allow admin DELETE on chat_messages" ON chat_messages
    FOR DELETE USING (get_user_role() = 'Admin');

-- Policies for chat_leads
DROP POLICY IF EXISTS "Allow public INSERT on chat_leads" ON chat_leads;
CREATE POLICY "Allow public INSERT on chat_leads" ON chat_leads
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin SELECT on chat_leads" ON chat_leads;
CREATE POLICY "Allow admin SELECT on chat_leads" ON chat_leads
    FOR SELECT USING (get_user_role() IN ('Admin', 'Consultant'));

DROP POLICY IF EXISTS "Allow admin UPDATE on chat_leads" ON chat_leads;
CREATE POLICY "Allow admin UPDATE on chat_leads" ON chat_leads
    FOR UPDATE USING (get_user_role() = 'Admin');

DROP POLICY IF EXISTS "Allow admin DELETE on chat_leads" ON chat_leads;
CREATE POLICY "Allow admin DELETE on chat_leads" ON chat_leads
    FOR DELETE USING (get_user_role() = 'Admin');
