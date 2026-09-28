-- ==============================================================================
-- AURELIUS & CO. | HAUTE HORLOGERIE DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Table for VIP Private Appointments & Consultations
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    boutique_location TEXT NOT NULL,
    preferred_date DATE,
    preferred_time TEXT,
    service_type TEXT NOT NULL, -- e.g. 'Bespoke Commission', 'Private Viewing', 'Horology Consultation', 'Restoration'
    message TEXT,
    status TEXT DEFAULT 'pending' NOT NULL -- 'pending', 'confirmed', 'completed', 'cancelled'
);

-- 2. Table for Bespoke Inquiries & Private Concierge
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    client_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    inquiry_type TEXT NOT NULL, -- 'Bespoke Craftsmanship', 'Heritage Archive', 'Private Salon', 'Press & Media'
    interests TEXT[], -- Array of interests like complications, precious metals, etc.
    estimated_timeline TEXT,
    notes TEXT,
    status TEXT DEFAULT 'new' NOT NULL
);

-- 3. Table for Exclusive Newsletter & Journal Subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    source TEXT DEFAULT 'website_footer',
    status TEXT DEFAULT 'active' NOT NULL
);

-- 4. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 5. Create Policies to allow anonymous public insertions from the website
CREATE POLICY "Allow anonymous appointment booking" 
    ON public.appointments 
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

CREATE POLICY "Allow anonymous inquiries" 
    ON public.inquiries 
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

CREATE POLICY "Allow anonymous newsletter subscription" 
    ON public.newsletter_subscribers 
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- 6. Create Policies to allow users to read status or count (Optional / Admin)
CREATE POLICY "Allow anon to verify newsletter uniqueness" 
    ON public.newsletter_subscribers 
    FOR SELECT 
    TO anon 
    USING (true);
