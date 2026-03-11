
-- Drop the auto role assignment trigger
DROP TRIGGER IF EXISTS on_auth_user_created_assign_role ON auth.users;
DROP FUNCTION IF EXISTS public.assign_default_student_role();
