
-- Create the notification trigger function for new appointments
CREATE OR REPLACE FUNCTION public.notify_staff_new_appointment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  patient_name TEXT;
  appt_date TEXT;
  appt_time TEXT;
BEGIN
  SELECT first_name || ' ' || last_name INTO patient_name
  FROM public.patients WHERE id = NEW.patient_id;

  appt_date := to_char(NEW.appointment_date, 'Mon DD, YYYY');
  appt_time := to_char(NEW.appointment_time, 'HH12:MI AM');

  INSERT INTO public.notifications (user_id, type, title, message, metadata)
  VALUES (
    NULL,
    'appointment',
    'New Appointment Booked',
    COALESCE(patient_name, 'A student') || ' booked an appointment for ' || appt_date || ' at ' || appt_time,
    jsonb_build_object('appointment_id', NEW.id, 'patient_id', NEW.patient_id, 'appointment_date', NEW.appointment_date, 'appointment_time', NEW.appointment_time)
  );

  RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS on_new_appointment_notify_staff ON public.appointments;
CREATE TRIGGER on_new_appointment_notify_staff
  AFTER INSERT ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_staff_new_appointment();
