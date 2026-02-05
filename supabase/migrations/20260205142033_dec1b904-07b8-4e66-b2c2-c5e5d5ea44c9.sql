
-- Create a table to store doctor schedules/availability
CREATE TABLE public.doctor_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(doctor_id, day_of_week)
);

-- Enable RLS
ALTER TABLE public.doctor_schedules ENABLE ROW LEVEL SECURITY;

-- Everyone can view doctor schedules (for booking)
CREATE POLICY "Anyone can view doctor schedules"
ON public.doctor_schedules
FOR SELECT
USING (true);

-- Only admins can manage schedules
CREATE POLICY "Admins can manage doctor schedules"
ON public.doctor_schedules
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Students can create their own appointments
CREATE POLICY "Students can create their own appointments"
ON public.appointments
FOR INSERT
WITH CHECK (
  has_role(auth.uid(), 'student'::app_role) AND
  patient_id IN (SELECT id FROM patients WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
);

-- Students can view their own appointments
CREATE POLICY "Students can view their own appointments"
ON public.appointments
FOR SELECT
USING (
  has_role(auth.uid(), 'student'::app_role) AND
  patient_id IN (SELECT id FROM patients WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
);

-- Students can view their own patient record
CREATE POLICY "Students can view their own patient record"
ON public.patients
FOR SELECT
USING (
  has_role(auth.uid(), 'student'::app_role) AND
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Create notifications table for system alerts
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Staff can view notifications
CREATE POLICY "Staff can view notifications"
ON public.notifications
FOR SELECT
USING (
  is_staff(auth.uid()) AND (user_id IS NULL OR user_id = auth.uid())
);

-- Staff can update notifications
CREATE POLICY "Staff can update notifications"
ON public.notifications
FOR UPDATE
USING (is_staff(auth.uid()) AND (user_id IS NULL OR user_id = auth.uid()));

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
