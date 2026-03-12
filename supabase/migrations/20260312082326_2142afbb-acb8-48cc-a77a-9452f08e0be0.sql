
-- Create notification trigger for missed and cancelled appointments
CREATE OR REPLACE FUNCTION public.notify_appointment_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  patient_name TEXT;
  appt_date TEXT;
BEGIN
  IF (NEW.status = 'missed' OR NEW.status = 'cancelled') AND OLD.status != NEW.status THEN
    SELECT first_name || ' ' || last_name INTO patient_name
    FROM public.patients WHERE id = NEW.patient_id;

    appt_date := to_char(NEW.appointment_date, 'Mon DD, YYYY');

    INSERT INTO public.notifications (user_id, type, title, message, metadata)
    VALUES (
      NULL,
      NEW.status,
      CASE NEW.status
        WHEN 'missed' THEN 'Missed Appointment'
        WHEN 'cancelled' THEN 'Appointment Cancelled'
      END,
      COALESCE(patient_name, 'A patient') || '''s appointment on ' || appt_date || ' was ' || NEW.status,
      jsonb_build_object('appointment_id', NEW.id, 'patient_id', NEW.patient_id, 'status', NEW.status)
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_appointment_status_change
  AFTER UPDATE OF status ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_appointment_status_change();

-- Set up cron job for monthly roster randomization
SELECT cron.schedule(
  'randomize-doctor-roster-monthly',
  '0 0 1 * *',
  $$
  SELECT
    net.http_post(
      url := 'https://caddnyzzoijdvknwialf.supabase.co/functions/v1/randomize-doctor-roster',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZGRueXp6b2lqZHZrbndpYWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5NzE1OTgsImV4cCI6MjA4NDU0NzU5OH0.y7CZbJYuELt9b-JL8Ug37XseldJ5WuKa_H1kk7ruYfQ"}'::jsonb,
      body := '{}'::jsonb
    );
  $$
);
