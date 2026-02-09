-- Enable realtime for appointments table so changes sync instantly
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;