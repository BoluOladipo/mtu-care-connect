import { useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { Calendar, Clock, User, Stethoscope, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useDoctorsOnDuty, useAvailableTimeSlots } from "@/hooks/useDoctorSchedules";
import { useCreateAppointment, useAppointments } from "@/hooks/useAppointments";
import { usePatients } from "@/hooks/usePatients";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const StudentPortal = () => {
  const { user, profile, signOut } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState<string>("general");
  const [reason, setReason] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { data: doctorsOnDuty, isLoading: loadingDoctors } = useDoctorsOnDuty(selectedDate);
  const { data: availableSlots, isLoading: loadingSlots } = useAvailableTimeSlots(
    selectedDoctor || "",
    selectedDate
  );
  const { data: patients } = usePatients();
  const { data: myAppointments } = useAppointments();
  const createAppointment = useCreateAppointment();

  // Find student's patient record by email
  const myPatientRecord = patients?.find((p) => p.email === user?.email);

  // Filter to show only student's own appointments
  const studentAppointments = myAppointments?.filter(
    (apt) => apt.patient_id === myPatientRecord?.id
  ) || [];

  const upcomingAppointments = studentAppointments.filter(
    (apt) => apt.status !== "cancelled" && apt.status !== "completed"
  );

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedTime || !myPatientRecord) {
      toast.error("Please select a doctor and time slot");
      return;
    }

    try {
      await createAppointment.mutateAsync({
        patient_id: myPatientRecord.id,
        doctor_id: selectedDoctor,
        appointment_date: format(selectedDate, "yyyy-MM-dd"),
        appointment_time: selectedTime,
        type: appointmentType,
        reason: reason || undefined,
        status: "scheduled",
      });

      setIsConfirmOpen(false);
      setIsBookingOpen(false);
      setSelectedDoctor(null);
      setSelectedTime(null);
      setReason("");
      toast.success("Appointment booked successfully!");
    } catch (error) {
      toast.error("Failed to book appointment");
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Generate next 14 days for selection
  const availableDates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Stethoscope className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold">MTU Clinic</h1>
              <p className="text-xs text-muted-foreground">Student Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {profile?.full_name || user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Calendar & Doctors */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Book an Appointment
                </CardTitle>
                <CardDescription>
                  Select a date to see available doctors and time slots
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!myPatientRecord && (
                  <div className="mb-4 rounded-lg border border-warning bg-warning/10 p-4">
                    <p className="text-sm text-warning-foreground">
                      <strong>Note:</strong> Your student record was not found. Please visit the clinic 
                      to register as a patient before booking appointments.
                    </p>
                  </div>
                )}

                {/* Date Selection */}
                <div className="mb-6">
                  <Label className="mb-3 block">Select Date</Label>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {availableDates.map((date) => (
                      <Button
                        key={date.toISOString()}
                        variant={isSameDay(date, selectedDate) ? "default" : "outline"}
                        className="flex-shrink-0 flex-col h-auto py-2 px-3"
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedDoctor(null);
                          setSelectedTime(null);
                        }}
                      >
                        <span className="text-xs">{format(date, "EEE")}</span>
                        <span className="text-lg font-bold">{format(date, "d")}</span>
                        <span className="text-xs">{format(date, "MMM")}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Doctors on Duty */}
                <div>
                  <Label className="mb-3 block">Doctors Available on {format(selectedDate, "EEEE, MMMM d")}</Label>
                  {loadingDoctors ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : doctorsOnDuty && doctorsOnDuty.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {doctorsOnDuty.map((doctor) => (
                        <Card
                          key={doctor.id}
                          className={cn(
                            "cursor-pointer transition-all hover:shadow-md",
                            selectedDoctor === doctor.user_id && "ring-2 ring-primary"
                          )}
                          onClick={() => {
                            setSelectedDoctor(doctor.user_id);
                            setSelectedTime(null);
                          }}
                        >
                          <CardContent className="flex items-center gap-3 p-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                              <User className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{doctor.full_name}</p>
                              <p className="text-sm text-muted-foreground">
                                {doctor.department || "General Practice"}
                              </p>
                              {doctor.schedules[0] && (
                                <p className="text-xs text-muted-foreground">
                                  <Clock className="mr-1 inline h-3 w-3" />
                                  {formatTime(doctor.schedules[0].start_time)} - {formatTime(doctor.schedules[0].end_time)}
                                </p>
                              )}
                            </div>
                            {selectedDoctor === doctor.user_id && (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed p-8 text-center">
                      <Calendar className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">No doctors available on this day</p>
                      <p className="text-sm text-muted-foreground">Please select another date</p>
                    </div>
                  )}
                </div>

                {/* Time Slots */}
                {selectedDoctor && (
                  <div className="mt-6">
                    <Label className="mb-3 block">Available Time Slots</Label>
                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : availableSlots && availableSlots.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {availableSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedTime === slot ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(slot)}
                          >
                            {formatTime(slot)}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No available slots for this doctor</p>
                    )}
                  </div>
                )}

                {/* Book Button */}
                {selectedDoctor && selectedTime && (
                  <div className="mt-6">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => setIsBookingOpen(true)}
                      disabled={!myPatientRecord}
                    >
                      Continue Booking
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - My Appointments */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  My Appointments
                </CardTitle>
                <CardDescription>Your upcoming clinic visits</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No upcoming appointments</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcomingAppointments.map((apt) => (
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

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Clinic Hours</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM</p>
                <p>Sunday: Closed</p>
                <p className="pt-2 text-xs">
                  For emergencies, please call the clinic hotline.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Booking Details Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Booking</DialogTitle>
            <DialogDescription>
              Provide additional details for your appointment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Appointment Type</Label>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Consultation</SelectItem>
                  <SelectItem value="follow_up">Follow-up Visit</SelectItem>
                  <SelectItem value="immunization">Immunization</SelectItem>
                  <SelectItem value="fitness_exam">Medical Fitness Exam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Reason for Visit (Optional)</Label>
              <Textarea
                placeholder="Briefly describe your symptoms or reason for visit..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="rounded-lg bg-muted p-3 text-sm">
              <p><strong>Date:</strong> {format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
              <p><strong>Time:</strong> {selectedTime && formatTime(selectedTime)}</p>
              <p><strong>Doctor:</strong> {doctorsOnDuty?.find((d) => d.user_id === selectedDoctor)?.full_name}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setIsBookingOpen(false);
              setIsConfirmOpen(true);
            }}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Appointment</DialogTitle>
            <DialogDescription>
              Please review and confirm your appointment details
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-lg border p-4 space-y-2">
              <p><strong>Date:</strong> {format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
              <p><strong>Time:</strong> {selectedTime && formatTime(selectedTime)}</p>
              <p><strong>Doctor:</strong> {doctorsOnDuty?.find((d) => d.user_id === selectedDoctor)?.full_name}</p>
              <p><strong>Type:</strong> {appointmentType.replace("_", " ")}</p>
              {reason && <p><strong>Reason:</strong> {reason}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              Go Back
            </Button>
            <Button 
              onClick={handleBookAppointment}
              disabled={createAppointment.isPending}
            >
              {createAppointment.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Book Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentPortal;
