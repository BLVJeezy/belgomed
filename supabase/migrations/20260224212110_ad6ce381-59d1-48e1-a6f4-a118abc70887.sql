
-- Create page_views table for analytics tracking
CREATE TABLE public.page_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path text NOT NULL DEFAULT '/',
  referrer text,
  user_agent text,
  device_type text NOT NULL DEFAULT 'desktop',
  country text,
  country_code text,
  ip_hash text,
  session_id text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Public insert policy (anyone can submit a page view)
CREATE POLICY "Anyone can insert page views"
ON public.page_views
FOR INSERT
WITH CHECK (true);

-- Only admins can read page views
CREATE POLICY "Admins can view page views"
ON public.page_views
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Index for fast queries
CREATE INDEX idx_page_views_created_at ON public.page_views (created_at DESC);
CREATE INDEX idx_page_views_path ON public.page_views (path);
CREATE INDEX idx_page_views_country ON public.page_views (country);
CREATE INDEX idx_page_views_device ON public.page_views (device_type);
