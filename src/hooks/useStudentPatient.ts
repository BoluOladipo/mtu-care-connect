import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useAuth } from "@/contexts/AuthContext";

export type Patient = Tables<"patients">;

export function useStudentPatient() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["student-patient", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;

      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.email,
  });
}

export function useStudentAppointments(patientId: string | undefined) {
  return useQuery({
    queryKey: ["student-appointments", patientId],
    queryFn: async () => {
      if (!patientId) return [];

      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("patient_id", patientId)
        .order("appointment_date", { ascending: true })
        .order("appointment_time", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!patientId,
  });
}
