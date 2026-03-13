import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { CalendarDays, Loader2, Printer, Shuffle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DAYS_OF_WEEK = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 0, label: "Sunday" },
];

interface ScheduleEntry {
  id: string;
  doctor_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  doctor_name?: string;
}

export function DoctorRoster() {
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRandomizing, setIsRandomizing] = useState(false);

  useEffect(() => {
    fetchAllSchedules();
  }, []);

  const fetchAllSchedules = async () => {
    setIsLoading(true);
    try {
      const { data: schData, error: schErr } = await supabase
        .from("doctor_schedules")
        .select("*")
        .eq("is_available", true)
        .order("day_of_week");
      if (schErr) throw schErr;

      if (!schData || schData.length === 0) {
        setSchedules([]);
        setIsLoading(false);
        return;
      }

      const doctorIds = [...new Set(schData.map((s) => s.doctor_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name")
        .in("user_id", doctorIds);

      const nameMap = new Map(profiles?.map((p) => [p.user_id, p.full_name]) || []);

      setSchedules(schData.map((s) => ({ ...s, doctor_name: nameMap.get(s.doctor_id) || "Unknown" })));
    } catch (error) {
      console.error("Error fetching schedules:", error);
      toast.error("Failed to load roster");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomize = async () => {
    setIsRandomizing(true);
    try {
      const { error } = await supabase.functions.invoke("randomize-doctor-roster");
      if (error) throw error;
      toast.success("Doctor roster has been randomized!");
      fetchAllSchedules();
    } catch (error: any) {
      toast.error(`Failed to randomize: ${error.message}`);
    } finally {
      setIsRandomizing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
  };

  // Build timetable: for each day, find morning (start < 14:00) and night (start >= 14:00) doctors
  const getDoctorsForDay = (dayValue: number) => {
    const daySchedules = schedules.filter((s) => s.day_of_week === dayValue);
    const morning = daySchedules.find((s) => {
      const hour = parseInt(s.start_time.split(":")[0]);
      return hour < 14;
    });
    const night = daySchedules.find((s) => {
      const hour = parseInt(s.start_time.split(":")[0]);
      return hour >= 14;
    });
    // If only one doctor for the day, show them in morning slot
    if (!morning && !night && daySchedules.length > 0) {
      return { morning: daySchedules[0], night: daySchedules[1] || null };
    }
    return { morning: morning || null, night: night || null };
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
    <Card className="print:shadow-none print:border-0">
      <CardHeader className="print:pb-2">
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Doctor Duty Roster
        </CardTitle>
        <CardDescription>
          Automatically randomized on the 1st of every month. 2 doctors per day — morning &amp; night shift.
        </CardDescription>
        <div className="flex gap-2 print:hidden pt-2">
          <Button variant="outline" onClick={handleRandomize} disabled={isRandomizing} className="gap-2">
            {isRandomizing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shuffle className="h-4 w-4" />}
            Randomize Roster
          </Button>
          <Button variant="outline" onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Print Roster
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {schedules.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
            <p>No roster data yet.</p>
            <p className="text-sm">Assign the "Doctor" role to users, then click "Randomize Roster".</p>
          </div>
        ) : (
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px] font-bold">Day</TableHead>
                  <TableHead className="text-center font-bold">
                    <div>Morning Shift</div>
                    <div className="text-xs font-normal text-muted-foreground">8:00 AM – 2:00 PM</div>
                  </TableHead>
                  <TableHead className="text-center font-bold">
                    <div>Night Shift</div>
                    <div className="text-xs font-normal text-muted-foreground">2:00 PM – 8:00 PM</div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DAYS_OF_WEEK.map((day) => {
                  const { morning, night } = getDoctorsForDay(day.value);
                  return (
                    <TableRow key={day.value}>
                      <TableCell className="font-semibold">{day.label}</TableCell>
                      <TableCell className="text-center">
                        {morning ? (
                          <div>
                            <p className="font-medium text-sm">{morning.doctor_name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatTime(morning.start_time)} – {formatTime(morning.end_time)}
                            </p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {night ? (
                          <div>
                            <p className="font-medium text-sm">{night.doctor_name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatTime(night.start_time)} – {formatTime(night.end_time)}
                            </p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
