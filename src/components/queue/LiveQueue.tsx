import { useEffect } from "react";
import { Clock, User, Stethoscope, FlaskConical, Pill, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useQueue, QueueEntryWithPatient } from "@/hooks/useQueue";
import { supabase } from "@/integrations/supabase/client";
import { differenceInMinutes, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type QueueStatus = "waiting" | "in_consultation" | "in_lab" | "in_pharmacy" | "completed";

const statusConfig: Record<QueueStatus, { label: string; icon: typeof Clock; className: string }> = {
  waiting: { label: "Waiting", icon: Clock, className: "status-waiting" },
  in_consultation: { label: "In Consultation", icon: Stethoscope, className: "status-in-progress" },
  in_lab: { label: "In Laboratory", icon: FlaskConical, className: "status-in-progress" },
  in_pharmacy: { label: "In Pharmacy", icon: Pill, className: "status-in-progress" },
  completed: { label: "Completed", icon: CheckCircle, className: "status-completed" },
};

const priorityConfig = {
  normal: { label: "Normal", className: "bg-muted text-muted-foreground" },
  urgent: { label: "Urgent", className: "bg-warning text-warning-foreground" },
  emergency: { label: "Emergency", className: "bg-destructive text-destructive-foreground animate-pulse-subtle" },
};

interface LiveQueueProps {
  compact?: boolean;
}

export function LiveQueue({ compact = false }: LiveQueueProps) {
  const { data: queue = [], isLoading, refetch } = useQueue();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("dashboard-queue-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "queue_entries" },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const activeQueue = queue.filter((q) => q.status !== "completed");
  const waitingCount = queue.filter((q) => q.status === "waiting").length;
  const inProgressCount = queue.filter(
    (q) => q.status === "in_consultation" || q.status === "in_lab" || q.status === "in_pharmacy"
  ).length;

  // Check if current doctor is attending someone
  const myActivePatient = queue.find(
    (q) => q.assigned_doctor_id === user?.id && q.status === "in_consultation"
  );

  return (
    <Card className={cn("flex flex-col", compact ? "h-[400px]" : "h-full")}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg">Live Queue</CardTitle>
          <p className="text-sm text-muted-foreground">
            {waitingCount} waiting • {inProgressCount} in progress
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={() => navigate("/queue")}>
          View All
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        {/* Doctor currently attending indicator */}
        {myActivePatient && (
          <div className="mx-6 mb-3 rounded-lg border-2 border-primary bg-primary/10 p-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">Currently Attending</span>
            </div>
            <p className="mt-1 font-medium">
              {myActivePatient.patients.first_name} {myActivePatient.patients.last_name}
            </p>
            <p className="text-xs text-muted-foreground">{myActivePatient.patients.student_id}</p>
          </div>
        )}

        <ScrollArea className="h-full px-6 pb-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : activeQueue.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Clock className="mb-2 h-8 w-8" />
              <p className="text-sm">No patients in queue</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeQueue.map((item, index) => {
                const status = statusConfig[item.status as QueueStatus] || statusConfig.waiting;
                const priority = priorityConfig[item.priority as keyof typeof priorityConfig] || priorityConfig.normal;
                const StatusIcon = status.icon;
                const waitTime = differenceInMinutes(new Date(), new Date(item.check_in_time));

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-4 transition-all hover:shadow-sm",
                      item.priority === "emergency" && "border-destructive/50 bg-destructive/5",
                      item.assigned_doctor_id === user?.id && item.status === "in_consultation" && "border-primary/50 bg-primary/5"
                    )}
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground truncate">
                          {item.patients.first_name} {item.patients.last_name}
                        </p>
                        <Badge className={priority.className} variant="secondary">
                          {priority.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.patients.student_id}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className={cn("flex items-center gap-1", status.className)}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{waitTime} min</span>
                    </div>
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
