-- Migration: Configure Row-Level Security (RLS) Policies for Public Inserts & Admin Access

-- =========================================================================
-- 1. Enable RLS on all remaining tables
-- =========================================================================
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- =========================================================================
-- 5. Consultation & Contact & Staffing Requests Policies
-- =========================================================================
DROP POLICY IF EXISTS "Allow public inserts on consultation requests" ON consultation_requests;
DROP POLICY IF EXISTS "Allow public INSERT on consultation_requests" ON consultation_requests;
DROP POLICY IF EXISTS "Admins and Consultants can read/write consultation requests" ON consultation_requests;

CREATE POLICY "Allow public INSERT on consultation_requests" 
ON consultation_requests FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Admins and Consultants can read/write consultation requests" 
ON consultation_requests FOR ALL USING (get_user_role() IN ('Admin', 'Consultant'));

-- =========================================================================
-- 6. Candidates / Career Applications Policies
-- =========================================================================
DROP POLICY IF EXISTS "Allow public INSERT on candidates" ON candidates;
DROP POLICY IF EXISTS "Admins and Recruiters can read/write candidates" ON candidates;

CREATE POLICY "Allow public INSERT on candidates" 
ON candidates FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Admins and Recruiters can read/write candidates" 
ON candidates FOR ALL USING (get_user_role() IN ('Admin', 'Recruiter'));
