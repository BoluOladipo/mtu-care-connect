
-- Create security definer function to get user email safely
CREATE OR REPLACE FUNCTION public.get_auth_email()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT email FROM auth.users WHERE id = auth.uid()
$$;

-- Drop the broken policy
DROP POLICY IF EXISTS "Students can register themselves as patients" ON public.patients;

-- Recreate using the security definer function
CREATE POLICY "Students can register themselves as patients"
ON public.patients
FOR INSERT
WITH CHECK (
  has_role(auth.uid(), 'student'::app_role)
  AND email = public.get_auth_email()
);

-- Also fix the student SELECT policy that has the same issue
DROP POLICY IF EXISTS "Students can view their own patient record" ON public.patients;

CREATE POLICY "Students can view their own patient record"
ON public.patients
FOR SELECT
USING (
  has_role(auth.uid(), 'student'::app_role)
  AND email = public.get_auth_email()
);

-- Fix the student appointments INSERT policy
DROP POLICY IF EXISTS "Students can create their own appointments" ON public.appointments;

CREATE POLICY "Students can create their own appointments"
ON public.appointments
FOR INSERT
WITH CHECK (
  has_role(auth.uid(), 'student'::app_role)
  AND patient_id IN (
    SELECT id FROM public.patients WHERE email = public.get_auth_email()
  )
);

-- Fix the student appointments SELECT policy
DROP POLICY IF EXISTS "Students can view their own appointments" ON public.appointments;

CREATE POLICY "Students can view their own appointments"
ON public.appointments
FOR SELECT
USING (
  has_role(auth.uid(), 'student'::app_role)
  AND patient_id IN (
    SELECT id FROM public.patients WHERE email = public.get_auth_email()
  )
);

-- Fix the student doctor profiles policy
DROP POLICY IF EXISTS "Students can view doctor profiles" ON public.profiles;

CREATE POLICY "Students can view doctor profiles"
ON public.profiles
FOR SELECT
USING (
  has_role(auth.uid(), 'student'::app_role)
  AND user_id IN (SELECT ur.user_id FROM public.user_roles ur WHERE ur.role = 'doctor')
);
