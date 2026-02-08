import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface DoctorSchedule {
  id: string;
  doctor_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at: string;
}

export interface DoctorWithSchedule {
  id: string;
  user_id: string;
  full_name: string;
  department: string | null;
  schedules: DoctorSchedule[];
}

export function useDoctorSchedules() {
  return useQuery({
    queryKey: ["doctor-schedules"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("doctor_schedules")
        .select("*")
        .order("day_of_week");
      if (error) throw error;
      return data as DoctorSchedule[];
    },
  });
}

export function useDoctorsOnDuty(date?: Date) {
  const dayOfWeek = date ? date.getDay() : new Date().getDay();

  return useQuery({
    queryKey: ["doctors-on-duty", dayOfWeek],
    queryFn: async () => {
      // Get all schedules for the day
      const { data: schedules, error: scheduleError } = await supabase
        .from("doctor_schedules")
        .select("*")
        .eq("day_of_week", dayOfWeek)
        .eq("is_available", true);

      if (scheduleError) throw scheduleError;

      if (!schedules || schedules.length === 0) {
        return [];
      }

      // Get unique doctor IDs from schedules (no need to check user_roles —
      // having a schedule implies they are a doctor, and this avoids RLS issues for students)
      const doctorIds = [...new Set(schedules.map((s) => s.doctor_id))];

      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .in("user_id", doctorIds);

      if (profileError) throw profileError;

      // Combine profiles with their schedules
      const doctorsWithSchedules: DoctorWithSchedule[] = (profiles || []).map((profile) => ({
        id: profile.id,
        user_id: profile.user_id,
        full_name: profile.full_name,
        department: profile.department,
        schedules: schedules.filter((s) => s.doctor_id === profile.user_id),
      }));

      return doctorsWithSchedules;
    },
  });
}

export function useCreateDoctorSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (schedule: Omit<DoctorSchedule, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("doctor_schedules")
        .insert(schedule)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-schedules"] });
      queryClient.invalidateQueries({ queryKey: ["doctors-on-duty"] });
      toast.success("Schedule created successfully");
    },
    onError: (error) => {
      toast.error(`Failed to create schedule: ${error.message}`);
    },
  });
}

export function useAvailableTimeSlots(doctorId: string, date: Date) {
  return useQuery({
    queryKey: ["available-slots", doctorId, date.toISOString().split("T")[0]],
    queryFn: async () => {
      const dayOfWeek = date.getDay();
      const dateStr = date.toISOString().split("T")[0];

      // Get doctor's schedule for this day
      const { data: schedule, error: scheduleError } = await supabase
        .from("doctor_schedules")
        .select("*")
        .eq("doctor_id", doctorId)
        .eq("day_of_week", dayOfWeek)
        .eq("is_available", true)
        .maybeSingle();

      if (scheduleError) throw scheduleError;
      if (!schedule) return [];

      // Get existing appointments for this doctor on this date
      const { data: existingAppointments, error: aptError } = await supabase
        .from("appointments")
        .select("appointment_time")
        .eq("doctor_id", doctorId)
        .eq("appointment_date", dateStr)
        .neq("status", "cancelled");

      if (aptError) throw aptError;

      const bookedTimes = new Set(existingAppointments?.map((a) => a.appointment_time) || []);

      // Generate 30-minute slots between start and end time
      const slots: string[] = [];
      const startParts = schedule.start_time.split(":");
      const endParts = schedule.end_time.split(":");
      
      let startMinutes = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
      const endMinutes = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);

      while (startMinutes < endMinutes) {
        const hours = Math.floor(startMinutes / 60);
        const mins = startMinutes % 60;
        const timeStr = `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:00`;
        
        if (!bookedTimes.has(timeStr)) {
          slots.push(timeStr);
        }
        
        startMinutes += 30; // 30-minute slots
      }

      return slots;
    },
    enabled: !!doctorId && !!date,
  });
}
