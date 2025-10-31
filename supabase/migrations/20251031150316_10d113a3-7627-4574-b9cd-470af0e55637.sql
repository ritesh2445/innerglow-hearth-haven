-- Fix search_path for update_settings_timestamp function
CREATE OR REPLACE FUNCTION public.update_settings_timestamp()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;