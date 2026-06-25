-- Migration: Remove AI Consultant Features & Tables
-- Date: 2026-06-26

DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS chat_conversations CASCADE;
DROP TABLE IF EXISTS chat_leads CASCADE;
DROP TABLE IF EXISTS staffing_requests CASCADE;
