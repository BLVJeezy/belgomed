
-- 1. Add explicit write RLS policies for user_roles table
CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. Add UNIQUE constraint on dashboard_stats.stat_date
ALTER TABLE public.dashboard_stats
  ADD CONSTRAINT unique_stat_date UNIQUE (stat_date);

-- 3. Add length constraints on leads table using validation triggers
CREATE OR REPLACE FUNCTION public.validate_lead_input()
RETURNS TRIGGER AS $$
BEGIN
  IF char_length(NEW.bedrijfsnaam) > 150 THEN
    RAISE EXCEPTION 'bedrijfsnaam too long (max 150)';
  END IF;
  IF NEW.contact_naam IS NOT NULL AND char_length(NEW.contact_naam) > 100 THEN
    RAISE EXCEPTION 'contact_naam too long (max 100)';
  END IF;
  IF NEW.contact_email IS NOT NULL AND char_length(NEW.contact_email) > 255 THEN
    RAISE EXCEPTION 'contact_email too long (max 255)';
  END IF;
  IF NEW.telefoon IS NOT NULL AND char_length(NEW.telefoon) > 20 THEN
    RAISE EXCEPTION 'telefoon too long (max 20)';
  END IF;
  IF NEW.bericht IS NOT NULL AND char_length(NEW.bericht) > 2000 THEN
    RAISE EXCEPTION 'bericht too long (max 2000)';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER validate_lead_before_insert
  BEFORE INSERT OR UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_lead_input();
