
-- Allow students to view doctor profiles (needed for appointment booking)
CREATE POLICY "Students can view doctor profiles"
ON public.profiles
FOR SELECT
USING (
  has_role(auth.uid(), 'student'::app_role)
  AND user_id IN (SELECT ur.user_id FROM public.user_roles ur WHERE ur.role = 'doctor')
);

-- Allow students to create their own patient record (self-registration)
CREATE POLICY "Students can register themselves as patients"
ON public.patients
FOR INSERT
WITH CHECK (
  has_role(auth.uid(), 'student'::app_role)
  AND email = (SELECT users.email FROM auth.users WHERE users.id = auth.uid())::text
);
