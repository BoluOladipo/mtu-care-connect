import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tables } from "@/integrations/supabase/types";

type Appointment = Tables<"appointments">;

interface StudentAppointmentsListProps {
  appointments: Appointment[];
  formatTime: (time: string) => string;
}

const StudentAppointmentsList = ({ appointments, formatTime }: StudentAppointmentsListProps) => {
  return (
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
                  <Badge variant="outline">{apt.type}</Badge>
                  <Badge
                    variant={apt.status === "confirmed" ? "default" : "secondary"}
                  >
                    {apt.status}
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
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentAppointmentsList;
