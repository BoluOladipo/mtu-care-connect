import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  UserPlus,
  Play,
  Pause,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Stethoscope,
  FlaskConical,
  Pill,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { QueueStatus } from "@/types/clinic";

interface QueueEntry {
  id: string;
  ticketNumber: string;
  patientName: string;
  patientId: string;
  status: QueueStatus;
  priority: "normal" | "urgent" | "emergency";
  checkInTime: string;
  waitTime: number;
  assignedDoctor?: string;
  currentStation?: string;
}

const mockQueue: QueueEntry[] = [
  {
    id: "1",
    ticketNumber: "A001",
    patientName: "Grace Okafor",
    patientId: "MTU/2021/2345",
    status: "waiting",
    priority: "emergency",
    checkInTime: "08:30 AM",
    waitTime: 5,
  },
  {
    id: "2",
    ticketNumber: "A002",
    patientName: "Chiamaka Okonkwo",
    patientId: "MTU/2022/1234",
    status: "waiting",
    priority: "urgent",
    checkInTime: "08:45 AM",
    waitTime: 25,
  },
  {
    id: "3",
    ticketNumber: "A003",
    patientName: "Adebayo Oluwaseun",
    patientId: "MTU/2023/0451",
    status: "in_consultation",
    priority: "normal",
    checkInTime: "08:15 AM",
    waitTime: 45,
    assignedDoctor: "Dr. Johnson",
    currentStation: "Consultation Room 1",
  },
  {
    id: "4",
    ticketNumber: "A004",
    patientName: "Emmanuel Nwosu",
    patientId: "MTU/2024/0089",
    status: "in_lab",
    priority: "normal",
    checkInTime: "08:00 AM",
    waitTime: 60,
    currentStation: "Laboratory",
  },
  {
    id: "5",
    ticketNumber: "A005",
    patientName: "Fatima Abubakar",
    patientId: "MTU/2023/0567",
    status: "in_pharmacy",
    priority: "normal",
    checkInTime: "07:45 AM",
    waitTime: 80,
    currentStation: "Pharmacy",
  },
  {
    id: "6",
    ticketNumber: "A006",
    patientName: "Ibrahim Mohammed",
    patientId: "MTU/2024/0123",
    status: "waiting",
    priority: "normal",
    checkInTime: "09:00 AM",
    waitTime: 15,
  },
  {
    id: "7",
    ticketNumber: "A007",
    patientName: "Janet Adeyemi",
    patientId: "MTU/2022/3456",
    status: "completed",
    priority: "normal",
    checkInTime: "07:30 AM",
    waitTime: 0,
  },
];

const statusConfig: Record<QueueStatus, { label: string; icon: typeof Clock; color: string }> = {
  waiting: { label: "Waiting", icon: Clock, color: "bg-warning/20 text-warning border-warning/30" },
  in_consultation: { label: "In Consultation", icon: Stethoscope, color: "bg-info/20 text-info border-info/30" },
  in_lab: { label: "In Laboratory", icon: FlaskConical, color: "bg-chart-4/20 text-chart-4 border-chart-4/30" },
  in_pharmacy: { label: "In Pharmacy", icon: Pill, color: "bg-primary/20 text-primary border-primary/30" },
  completed: { label: "Completed", icon: CheckCircle, color: "bg-success/20 text-success border-success/30" },
};

const priorityConfig = {
  normal: { label: "Normal", color: "bg-muted text-muted-foreground" },
  urgent: { label: "Urgent", color: "bg-warning text-warning-foreground" },
  emergency: { label: "Emergency", color: "bg-destructive text-destructive-foreground animate-pulse-subtle" },
};

const Queue = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("all");

  const waitingQueue = mockQueue.filter((q) => q.status === "waiting");
  const inProgressQueue = mockQueue.filter(
    (q) => q.status === "in_consultation" || q.status === "in_lab" || q.status === "in_pharmacy"
  );
  const completedQueue = mockQueue.filter((q) => q.status === "completed");

  const renderQueueCard = (entry: QueueEntry) => {
    const status = statusConfig[entry.status];
    const priority = priorityConfig[entry.priority];
    const StatusIcon = status.icon;

    return (
      <Card
        key={entry.id}
        className={cn(
          "transition-all hover:shadow-md",
          entry.priority === "emergency" && "border-destructive/50 ring-2 ring-destructive/20"
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            {/* Ticket & Patient Info */}
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <span className="text-xs">Ticket</span>
                <span className="text-lg font-bold">{entry.ticketNumber}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{entry.patientName}</h3>
                  <Badge className={priority.color}>{priority.label}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{entry.patientId}</p>
                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Check-in: {entry.checkInTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Wait: {entry.waitTime} min
                  </span>
                </div>
                {entry.currentStation && (
                  <p className="mt-1 text-sm font-medium text-primary">
                    📍 {entry.currentStation}
                  </p>
                )}
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex flex-col items-end gap-2">
              <Badge variant="outline" className={cn("flex items-center gap-1", status.color)}>
                <StatusIcon className="h-3.5 w-3.5" />
                {status.label}
              </Badge>
              {entry.status === "waiting" && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Stethoscope className="h-3.5 w-3.5" />
                    Assign
                  </Button>
                  <Button size="sm" className="gap-1">
                    <Play className="h-3.5 w-3.5" />
                    Start
                  </Button>
                </div>
              )}
              {entry.status === "in_consultation" && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <FlaskConical className="h-3.5 w-3.5" />
                    To Lab
                  </Button>
                  <Button size="sm" className="gap-1">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Complete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <AppLayout title="Queue Management" subtitle="Live clinic queue and patient flow">
      <div className="space-y-6">
        {/* Stats Bar */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-warning/10 border-warning/20">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning text-warning-foreground">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{waitingQueue.length}</p>
                <p className="text-sm text-muted-foreground">Waiting</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-info/10 border-info/20">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info text-info-foreground">
                <Stethoscope className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inProgressQueue.length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-success/10 border-success/20">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success text-success-foreground">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedQueue.length}</p>
                <p className="text-sm text-muted-foreground">Completed Today</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">18 min</p>
                <p className="text-sm text-muted-foreground">Avg. Wait Time</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Doctors</SelectItem>
                <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                <SelectItem value="dr-adeyemi">Dr. Adeyemi</SelectItem>
                <SelectItem value="dr-obi">Dr. Obi</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add to Queue
          </Button>
        </div>

        {/* Queue Tabs */}
        <Tabs defaultValue="waiting" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="waiting" className="gap-2">
              <Clock className="h-4 w-4" />
              Waiting ({waitingQueue.length})
            </TabsTrigger>
            <TabsTrigger value="in_progress" className="gap-2">
              <Stethoscope className="h-4 w-4" />
              In Progress ({inProgressQueue.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed ({completedQueue.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="waiting" className="space-y-4">
            {waitingQueue.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No patients waiting</p>
                </CardContent>
              </Card>
            ) : (
              waitingQueue
                .sort((a, b) => {
                  const priorityOrder = { emergency: 0, urgent: 1, normal: 2 };
                  return priorityOrder[a.priority] - priorityOrder[b.priority];
                })
                .map(renderQueueCard)
            )}
          </TabsContent>

          <TabsContent value="in_progress" className="space-y-4">
            {inProgressQueue.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Stethoscope className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No patients in progress</p>
                </CardContent>
              </Card>
            ) : (
              inProgressQueue.map(renderQueueCard)
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedQueue.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No completed visits today</p>
                </CardContent>
              </Card>
            ) : (
              completedQueue.map(renderQueueCard)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Queue;
