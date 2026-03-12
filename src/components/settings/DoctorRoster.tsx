import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { CalendarDays, Loader2, RefreshCw, Shuffle } from "lucide-react";
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
  const [isRandomizing, setIsRandomizing] = useState(false);

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

      setSchedules(data || []);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const handleRandomize = async () => {
    setIsRandomizing(true);
    try {
      const { data, error } = await supabase.functions.invoke("randomize-doctor-roster");
      if (error) throw error;
      toast.success("Doctor roster has been randomized for this month!");
      if (selectedDoctor) {
        fetchSchedules(selectedDoctor);
      }
    } catch (error: any) {
      toast.error(`Failed to randomize roster: ${error.message}`);
    } finally {
      setIsRandomizing(false);
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
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
          The roster is automatically randomized at the start of each month. New doctors are assigned a default schedule when their role is set.
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
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
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
              <Button
                variant="outline"
                onClick={handleRandomize}
                disabled={isRandomizing}
                className="gap-2"
              >
                {isRandomizing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Shuffle className="h-4 w-4" />
                )}
                Randomize All Rosters
              </Button>
            </div>

            {selectedDoctor && (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Shift Hours</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {DAYS_OF_WEEK.map((day) => {
                      const schedule = schedules.find(
                        (s) => s.day_of_week === day.value && s.is_available
                      );
                      return (
                        <TableRow key={day.value}>
                          <TableCell className="font-medium">{day.label}</TableCell>
                          <TableCell>
                            {schedule ? (
                              <Badge className="bg-success/20 text-success">On Duty</Badge>
                            ) : (
                              <Badge variant="secondary">Off</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {schedule
                              ? `${formatTime(schedule.start_time)} - ${formatTime(schedule.end_time)}`
                              : "—"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
