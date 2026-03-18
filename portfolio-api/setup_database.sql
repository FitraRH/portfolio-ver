-- SQL for setting up the ai_logs table in Supabase
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.ai_logs (
    id SERIAL PRIMARY KEY,
    feature_id TEXT NOT NULL,
    prompt TEXT,
    completion TEXT,
    model TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB
);

-- Disable RLS to ensure logging always works without complex policies
ALTER TABLE public.ai_logs DISABLE ROW LEVEL SECURITY;

-- Grant access to the service role (which we will use in Railway)
GRANT ALL ON public.ai_logs TO service_role;
GRANT ALL ON public.ai_logs TO postgres;
GRANT ALL ON public.ai_logs TO anon;
