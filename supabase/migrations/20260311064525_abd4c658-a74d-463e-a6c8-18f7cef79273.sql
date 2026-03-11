
-- Fix the appointments status check constraint to include 'attended' and 'missed'
ALTER TABLE public.appointments DROP CONSTRAINT appointments_status_check;
ALTER TABLE public.appointments ADD CONSTRAINT appointments_status_check 
  CHECK (status = ANY (ARRAY['scheduled'::text, 'confirmed'::text, 'in_progress'::text, 'completed'::text, 'cancelled'::text, 'no_show'::text, 'attended'::text, 'missed'::text]));

-- Create a trigger function to auto-create default schedules when a doctor role is assigned
CREATE OR REPLACE FUNCTION public.auto_create_doctor_schedule()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only act when a 'doctor' role is inserted
  IF NEW.role = 'doctor' THEN
    -- Insert default schedule for Monday-Friday (1-5), 8am-4pm, if not already existing
    INSERT INTO public.doctor_schedules (doctor_id, day_of_week, start_time, end_time, is_available)
    SELECT NEW.user_id, d, '08:00'::time, '16:00'::time, true
    FROM generate_series(1, 5) AS d
    WHERE NOT EXISTS (
      SELECT 1 FROM public.doctor_schedules 
      WHERE doctor_id = NEW.user_id AND day_of_week = d
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Attach trigger to user_roles table
CREATE TRIGGER on_doctor_role_assigned
  AFTER INSERT ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_create_doctor_schedule();
