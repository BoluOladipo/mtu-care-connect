import { Calendar, Clock, ChevronRight, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useTodayAppointments } from "@/hooks/useAppointments";
import { useNavigate } from "react-router-dom";

const statusConfig: Record<string, { label: string; className: string }> = {
  scheduled: { label: "Scheduled", className: "bg-muted text-muted-foreground" },
  confirmed: { label: "Confirmed", className: "bg-info/20 text-info" },
  in_progress: { label: "In Progress", className: "bg-primary/20 text-primary" },
  completed: { label: "Completed", className: "bg-success/20 text-success" },
  attended: { label: "Attended", className: "bg-success/20 text-success" },
  missed: { label: "Missed", className: "bg-warning/20 text-warning" },
  cancelled: { label: "Cancelled", className: "bg-destructive/20 text-destructive" },
};

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export function TodayAppointments() {
  const { data: appointments = [], isLoading } = useTodayAppointments();
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="flex h-[400px] flex-col">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg">Today's Appointments</CardTitle>
          <p className="text-sm text-muted-foreground">{today}</p>
        </div>
        <Button size="sm" variant="outline" onClick={() => navigate("/appointments")}>
          View All
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-6 pb-6">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          ) : appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">No appointments today</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((appointment) => {
                const status = statusConfig[appointment.status] || statusConfig.scheduled;

                return (
                  <div
                    key={appointment.id}
                    className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 px-3 py-2">
                      <Clock className="mb-1 h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">
                        {formatTime(appointment.appointment_time)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {appointment.patients.first_name} {appointment.patients.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {appointment.type.replace("_", " ")}
                      </p>
                    </div>
                    <Badge variant="secondary" className={status.className}>
                      {appointment.status === "attended" && <CheckCircle className="mr-1 h-3 w-3" />}
                      {status.label}
                    </Badge>
                    <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
