
-- Allow students to cancel (update) their own scheduled appointments
CREATE POLICY "Students can cancel their own appointments"
ON public.appointments
FOR UPDATE
USING (
  has_role(auth.uid(), 'student'::app_role) 
  AND patient_id IN (
    SELECT id FROM patients WHERE email = get_auth_email()
  )
)
WITH CHECK (
  has_role(auth.uid(), 'student'::app_role)
  AND patient_id IN (
    SELECT id FROM patients WHERE email = get_auth_email()
  )
);
