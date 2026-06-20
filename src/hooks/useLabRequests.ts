import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { toast } from "sonner";

export type LabRequest = Tables<"lab_requests">;
export type LabRequestInsert = TablesInsert<"lab_requests">;
export type LabRequestUpdate = TablesUpdate<"lab_requests">;

export interface LabRequestWithPatient extends LabRequest {
  patients: {
    first_name: string;
    last_name: string;
    student_id: string;
  };
}

export function useLabRequests(searchQuery?: string) {
  return useQuery({
    queryKey: ["lab_requests", searchQuery],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lab_requests")
        .select(`
          *,
          patients ( first_name, last_name, student_id )
        `)
        .order("requested_at", { ascending: false });

      if (error) throw error;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (data as LabRequestWithPatient[]).filter(
          (r) =>
            r.patients.first_name.toLowerCase().includes(q) ||
            r.patients.last_name.toLowerCase().includes(q) ||
            r.patients.student_id.toLowerCase().includes(q) ||
            r.test_type.toLowerCase().includes(q) ||
            (r.accession_number ?? "").toLowerCase().includes(q)
        );
      }
      return data as LabRequestWithPatient[];
    },
  });
}

export function useCreateLabRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (request: LabRequestInsert) => {
      const { data, error } = await supabase
        .from("lab_requests")
        .insert(request)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lab_requests"] });
      toast.success("Lab request created");
    },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });
}

export function useCollectSample() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, collectedBy }: { id: string; collectedBy: string }) => {
      const { data, error } = await supabase
        .from("lab_requests")
        .update({
          status: "sample_collected",
          sample_collected_at: new Date().toISOString(),
          sample_collected_by: collectedBy,
        })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lab_requests"] });
      toast.success("Sample collected & accessioned");
    },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });
}

export function useStartLabRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("lab_requests")
        .update({ status: "in_progress" })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lab_requests"] });
      toast.success("Testing started");
    },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });
}

export function useSubmitForValidation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: string;
      results: string;
      unit?: string;
      reference_range?: string;
      is_abnormal?: boolean;
      is_critical?: boolean;
      technician_notes?: string;
      completedBy: string;
    }) => {
      const { data, error } = await supabase
        .from("lab_requests")
        .update({
          status: "awaiting_validation",
          results: args.results,
          unit: args.unit ?? null,
          reference_range: args.reference_range ?? null,
          is_abnormal: !!args.is_abnormal,
          is_critical: !!args.is_critical,
          technician_notes: args.technician_notes ?? null,
          completed_by: args.completedBy,
        })
        .eq("id", args.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lab_requests"] });
      toast.success("Submitted for validation");
    },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });
}

export function useValidateAndComplete() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, validatedBy }: { id: string; validatedBy: string }) => {
      const { data, error } = await supabase
        .from("lab_requests")
        .update({
          status: "completed",
          validated_by: validatedBy,
          validated_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lab_requests"] });
      toast.success("Report validated & released");
    },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });
}

export function useRequestRepeat() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("lab_requests")
        .update({ status: "in_progress", results: null })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lab_requests"] });
      toast.success("Repeat test requested");
    },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });
}

// Backwards-compat alias (old import name kept for any consumers)
export const useCompleteLabRequest = useValidateAndComplete;
