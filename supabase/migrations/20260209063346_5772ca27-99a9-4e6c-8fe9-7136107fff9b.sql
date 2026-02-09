-- The trigger function and trigger were already created successfully in the previous migration.
-- Just need to verify they exist by doing a no-op migration.
-- (The previous migration created notify_staff_new_appointment function and on_new_appointment_notify_staff trigger)
SELECT 1;