-- Run this in your Supabase SQL Editor
-- Go to: supabase.com/dashboard → your project → SQL Editor → New Query

CREATE TABLE IF NOT EXISTS pro_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT UNIQUE NOT NULL,
  stripe_session_id TEXT,
  activated_at TIMESTAMPTZ DEFAULT NOW(),
  amount_paid INTEGER
);

-- Allow the API to insert/read
ALTER TABLE pro_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON pro_users
  USING (true)
  WITH CHECK (true);
