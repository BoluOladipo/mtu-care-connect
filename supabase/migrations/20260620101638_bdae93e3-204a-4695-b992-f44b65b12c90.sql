
-- Extend lab_requests for full hospital lab workflow
ALTER TABLE public.lab_requests
  ADD COLUMN IF NOT EXISTS accession_number text UNIQUE,
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS sample_collected_at timestamptz,
  ADD COLUMN IF NOT EXISTS sample_collected_by uuid,
  ADD COLUMN IF NOT EXISTS reference_range text,
  ADD COLUMN IF NOT EXISTS unit text,
  ADD COLUMN IF NOT EXISTS is_abnormal boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_critical boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS validated_by uuid,
  ADD COLUMN IF NOT EXISTS validated_at timestamptz,
  ADD COLUMN IF NOT EXISTS technician_notes text;

-- Sequence for accession numbers
CREATE SEQUENCE IF NOT EXISTS public.lab_accession_seq START 1;
GRANT USAGE ON SEQUENCE public.lab_accession_seq TO authenticated, service_role;

-- Auto-generate accession number on insert
CREATE OR REPLACE FUNCTION public.assign_lab_accession_number()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.accession_number IS NULL THEN
    NEW.accession_number := 'LAB-' || extract(year from now())::text
      || '-' || lpad(nextval('public.lab_accession_seq')::text, 6, '0');
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_assign_lab_accession ON public.lab_requests;
CREATE TRIGGER trg_assign_lab_accession
  BEFORE INSERT ON public.lab_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_lab_accession_number();

-- Backfill existing rows with accession numbers
UPDATE public.lab_requests
SET accession_number = 'LAB-' || extract(year from requested_at)::text
  || '-' || lpad(nextval('public.lab_accession_seq')::text, 6, '0')
WHERE accession_number IS NULL;

-- Notify on critical or completed results
CREATE OR REPLACE FUNCTION public.notify_lab_result_event()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  patient_name text;
BEGIN
  SELECT first_name || ' ' || last_name INTO patient_name
  FROM public.patients WHERE id = NEW.patient_id;

  -- Critical flag raised
  IF NEW.is_critical = true AND (OLD.is_critical IS DISTINCT FROM true) THEN
    INSERT INTO public.notifications (user_id, type, title, message, metadata)
    VALUES (
      NEW.requested_by,
      'lab_critical',
      'CRITICAL Lab Result',
      'Critical result for ' || COALESCE(patient_name, 'patient') || ' — ' || NEW.test_type || ' (' || COALESCE(NEW.accession_number, '') || ')',
      jsonb_build_object('lab_request_id', NEW.id, 'patient_id', NEW.patient_id)
    );
  END IF;

  -- Status moved to completed
  IF NEW.status = 'completed' AND OLD.status IS DISTINCT FROM 'completed' THEN
    INSERT INTO public.notifications (user_id, type, title, message, metadata)
    VALUES (
      NEW.requested_by,
      'lab_completed',
      'Lab Result Ready',
      COALESCE(patient_name, 'Patient') || '''s ' || NEW.test_type || ' result has been validated and is ready.',
      jsonb_build_object('lab_request_id', NEW.id, 'patient_id', NEW.patient_id, 'accession_number', NEW.accession_number)
    );
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_lab_result ON public.lab_requests;
CREATE TRIGGER trg_notify_lab_result
  AFTER UPDATE ON public.lab_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_lab_result_event();
