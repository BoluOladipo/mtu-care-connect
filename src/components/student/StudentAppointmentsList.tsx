import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tables } from "@/integrations/supabase/types";
import { useCancelAppointment } from "@/hooks/useAppointments";

type Appointment = Tables<"appointments">;

interface StudentAppointmentsListProps {
  appointments: Appointment[];
  formatTime: (time: string) => string;
}

const statusColors: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  confirmed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  attended: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  missed: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
};

const StudentAppointmentsList = ({ appointments, formatTime }: StudentAppointmentsListProps) => {
  const [cancelId, setCancelId] = useState<string | null>(null);
  const cancelAppointment = useCancelAppointment();

  const handleCancel = async () => {
    if (!cancelId) return;
    await cancelAppointment.mutateAsync(cancelId);
    setCancelId(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            My Appointments
          </CardTitle>
          <CardDescription>Your upcoming clinic visits</CardDescription>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">No upcoming appointments</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="rounded-lg border p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{apt.type.replace("_", " ")}</Badge>
                    <Badge className={statusColors[apt.status] || "bg-muted text-muted-foreground"}>
                      {apt.status === "missed" ? "Missed" : apt.status}
                    </Badge>
                  </div>
                  <p className="font-medium">
                    {format(new Date(apt.appointment_date), "EEEE, MMM d")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <Clock className="mr-1 inline h-3 w-3" />
                    {formatTime(apt.appointment_time)}
                  </p>
                  {apt.reason && (
                    <p className="text-sm text-muted-foreground">{apt.reason}</p>
                  )}
                  {apt.notes && apt.status === "missed" && (
                    <p className="text-xs text-orange-600 dark:text-orange-400">
                      {apt.notes}
                    </p>
                  )}
                  {/* Allow cancellation of scheduled appointments */}
                  {apt.status === "scheduled" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs text-destructive hover:text-destructive"
                      onClick={() => setCancelId(apt.id)}
                    >
                      Cancel Appointment
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cancel confirmation dialog */}
      <Dialog open={!!cancelId} onOpenChange={(open) => !open && setCancelId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelId(null)}>
              Keep Appointment
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={cancelAppointment.isPending}
            >
              {cancelAppointment.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Yes, Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StudentAppointmentsList;
