
-- Create lead stage enum
CREATE TYPE public.lead_stage AS ENUM ('nieuw', 'in_behandeling', 'wacht_op_vergunning', 'offerte_gestuurd', 'afgehandeld');

-- Add new columns to leads table
ALTER TABLE public.leads
  ADD COLUMN assignee TEXT DEFAULT NULL,
  ADD COLUMN stage lead_stage NOT NULL DEFAULT 'nieuw',
  ADD COLUMN service_type TEXT DEFAULT NULL,
  ADD COLUMN telefoon TEXT DEFAULT NULL,
  ADD COLUMN bericht TEXT DEFAULT NULL;
