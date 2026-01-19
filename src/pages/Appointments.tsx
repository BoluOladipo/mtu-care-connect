import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarPlus,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSlot {
  time: string;
  available: boolean;
  appointment?: {
    id: string;
    patientName: string;
    type: string;
    status: "scheduled" | "confirmed" | "completed" | "cancelled";
  };
}

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const times = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  ];

  const appointments = [
    { time: "08:30 AM", patientName: "Adebayo Oluwaseun", type: "General Checkup", status: "confirmed" as const },
    { time: "09:30 AM", patientName: "Chiamaka Okonkwo", type: "Follow-up", status: "confirmed" as const },
    { time: "10:30 AM", patientName: "Emmanuel Nwosu", type: "Immunization", status: "scheduled" as const },
    { time: "11:30 AM", patientName: "Fatima Abubakar", type: "Medical Fitness", status: "scheduled" as const },
    { time: "02:00 PM", patientName: "Grace Okafor", type: "General Checkup", status: "scheduled" as const },
    { time: "03:30 PM", patientName: "Ibrahim Mohammed", type: "Specialist", status: "scheduled" as const },
  ];

  times.forEach((time) => {
    const apt = appointments.find((a) => a.time === time);
    slots.push({
      time,
      available: !apt,
      appointment: apt ? { id: Math.random().toString(), ...apt } : undefined,
    });
  });

  return slots;
};

const statusColors = {
  scheduled: "bg-muted text-muted-foreground border-muted",
  confirmed: "bg-success/20 text-success border-success/30",
  completed: "bg-info/20 text-info border-info/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
};

const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState("dr-johnson");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const timeSlots = generateTimeSlots();

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <AppLayout title="Appointments" subtitle="Schedule and manage patient appointments">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Sidebar - Calendar & Filters */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Doctor</Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="dr-adeyemi">Dr. Adeyemi</SelectItem>
                    <SelectItem value="dr-obi">Dr. Obi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Appointment Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="general">General Checkup</SelectItem>
                    <SelectItem value="follow_up">Follow-up</SelectItem>
                    <SelectItem value="immunization">Immunization</SelectItem>
                    <SelectItem value="fitness">Medical Fitness</SelectItem>
                    <SelectItem value="specialist">Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Slots</span>
                <span className="font-medium">{timeSlots.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Booked</span>
                <span className="font-medium text-primary">
                  {timeSlots.filter((s) => !s.available).length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Available</span>
                <span className="font-medium text-success">
                  {timeSlots.filter((s) => s.available).length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Schedule View */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold">
                {date ? formatDate(date) : "Select a date"}
              </h2>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <CalendarPlus className="h-4 w-4" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Book New Appointment</DialogTitle>
                  <DialogDescription>
                    Schedule a new appointment for a patient.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Patient ID</Label>
                    <Input placeholder="MTU/2024/0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots
                            .filter((s) => s.available)
                            .map((slot) => (
                              <SelectItem key={slot.time} value={slot.time}>
                                {slot.time}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Appointment Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Checkup</SelectItem>
                        <SelectItem value="follow_up">Follow-up</SelectItem>
                        <SelectItem value="immunization">Immunization</SelectItem>
                        <SelectItem value="fitness">Medical Fitness</SelectItem>
                        <SelectItem value="specialist">Specialist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Doctor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                        <SelectItem value="dr-adeyemi">Dr. Adeyemi</SelectItem>
                        <SelectItem value="dr-obi">Dr. Obi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Reason for Visit</Label>
                    <Textarea placeholder="Brief description of the reason for visit" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>
                    Book Appointment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Time Slots Grid */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Dr. Johnson's Schedule
                </CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-success" />
                    <span className="text-muted-foreground">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Booked</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {timeSlots.map((slot) => (
                  <div
                    key={slot.time}
                    className={cn(
                      "rounded-lg border p-4 transition-all",
                      slot.available
                        ? "border-dashed border-success/50 bg-success/5 hover:border-success hover:bg-success/10 cursor-pointer"
                        : "border-primary/30 bg-primary/5"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{slot.time}</span>
                      </div>
                      {slot.available ? (
                        <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                          Open
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className={statusColors[slot.appointment!.status]}
                        >
                          {slot.appointment!.status}
                        </Badge>
                      )}
                    </div>
                    {slot.appointment && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          {slot.appointment.patientName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {slot.appointment.type}
                        </p>
                      </div>
                    )}
                    {slot.available && (
                      <p className="text-sm text-success">Click to book</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Appointments;
