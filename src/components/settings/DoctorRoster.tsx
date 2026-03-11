import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, Loader2, Save, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DAYS_OF_WEEK = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

interface DoctorProfile {
  user_id: string;
  full_name: string;
  department: string | null;
}

interface ScheduleEntry {
  id?: string;
  doctor_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export function DoctorRoster() {
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      fetchSchedules(selectedDoctor);
    }
  }, [selectedDoctor]);

  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "doctor");
      if (rolesError) throw rolesError;

      if (!roles || roles.length === 0) {
        setDoctors([]);
        setIsLoading(false);
        return;
      }

      const doctorIds = roles.map((r) => r.user_id);
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("user_id, full_name, department")
        .in("user_id", doctorIds);
      if (profilesError) throw profilesError;

      setDoctors(profiles || []);
      if (profiles && profiles.length > 0 && !selectedDoctor) {
        setSelectedDoctor(profiles[0].user_id);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to load doctors");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSchedules = async (doctorId: string) => {
    try {
      const { data, error } = await supabase
        .from("doctor_schedules")
        .select("*")
        .eq("doctor_id", doctorId)
        .order("day_of_week");
      if (error) throw error;

      // Ensure all 7 days exist in state
      const existing = new Map((data || []).map((s) => [s.day_of_week, s]));
      const fullSchedule: ScheduleEntry[] = DAYS_OF_WEEK.map((day) => {
        const ex = existing.get(day.value);
        return ex
          ? { id: ex.id, doctor_id: doctorId, day_of_week: day.value, start_time: ex.start_time, end_time: ex.end_time, is_available: ex.is_available }
          : { doctor_id: doctorId, day_of_week: day.value, start_time: "08:00", end_time: "16:00", is_available: false };
      });
      setSchedules(fullSchedule);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const updateSchedule = (dayOfWeek: number, field: keyof ScheduleEntry, value: string | boolean) => {
    setSchedules((prev) =>
      prev.map((s) => (s.day_of_week === dayOfWeek ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = async () => {
    if (!selectedDoctor) return;
    setIsSaving(true);
    try {
      // Upsert all schedules for this doctor
      for (const schedule of schedules) {
        if (schedule.id) {
          const { error } = await supabase
            .from("doctor_schedules")
            .update({
              start_time: schedule.start_time,
              end_time: schedule.end_time,
              is_available: schedule.is_available,
            })
            .eq("id", schedule.id);
          if (error) throw error;
        } else if (schedule.is_available) {
          // Only insert if marked as available
          const { error } = await supabase
            .from("doctor_schedules")
            .insert({
              doctor_id: schedule.doctor_id,
              day_of_week: schedule.day_of_week,
              start_time: schedule.start_time,
              end_time: schedule.end_time,
              is_available: schedule.is_available,
            });
          if (error) throw error;
        }
      }
      toast.success("Roster updated successfully");
      fetchSchedules(selectedDoctor);
    } catch (error) {
      console.error("Error saving schedules:", error);
      toast.error("Failed to save roster");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Doctor Duty Roster
        </CardTitle>
        <CardDescription>
          Manage weekly schedules for each doctor. New doctors are automatically added with a default Mon–Fri schedule.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {doctors.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
            <p>No doctors registered yet.</p>
            <p className="text-sm">Assign the "Doctor" role to a user in User Management first.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <Label>Select Doctor</Label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Choose a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doc) => (
                    <SelectItem key={doc.user_id} value={doc.user_id}>
                      {doc.full_name} {doc.department ? `(${doc.department})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedDoctor && (
              <>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Day</TableHead>
                        <TableHead>On Duty</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>End Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedules.map((schedule) => {
                        const day = DAYS_OF_WEEK.find((d) => d.value === schedule.day_of_week);
                        return (
                          <TableRow key={schedule.day_of_week}>
                            <TableCell className="font-medium">{day?.label}</TableCell>
                            <TableCell>
                              <Switch
                                checked={schedule.is_available}
                                onCheckedChange={(checked) =>
                                  updateSchedule(schedule.day_of_week, "is_available", checked)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="time"
                                value={schedule.start_time}
                                onChange={(e) =>
                                  updateSchedule(schedule.day_of_week, "start_time", e.target.value)
                                }
                                disabled={!schedule.is_available}
                                className="w-32"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="time"
                                value={schedule.end_time}
                                onChange={(e) =>
                                  updateSchedule(schedule.day_of_week, "end_time", e.target.value)
                                }
                                disabled={!schedule.is_available}
                                className="w-32"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Roster
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
