-- Schema Safety Migration for HyperCode Enterprise Platform
-- Execute this script in your Supabase SQL Editor to make the DB role helper and check constraints safe.

-- 1. Recreate get_user_role helper function to be schema-safe
-- This removes any dependencies on the non-existent 'is_active' column
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
    SELECT role FROM user_profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- 2. Drop old check constraint on user_profiles role check if it exists
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_role_check;

-- 3. Add updated check constraint supporting Manager role
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_role_check CHECK (role IN ('Admin', 'Recruiter', 'Consultant', 'Manager'));
