import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CalendarPlus, Calendar, Clock, User, ChevronLeft, ChevronRight, Loader2, CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppointments, useCreateAppointment, useCancelAppointment, useUpdateAppointment } from "@/hooks/useAppointments";
import { usePatients } from "@/hooks/usePatients";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { format, addDays, subDays } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const appointmentTypes = [
  { value: "general", label: "General Checkup" },
  { value: "follow_up", label: "Follow-up" },
  { value: "immunization", label: "Immunization" },
  { value: "fitness_exam", label: "Medical Fitness" },
  { value: "specialist", label: "Specialist" },
];

const statusColors: Record<string, string> = {
  scheduled: "bg-muted text-muted-foreground border-muted",
  confirmed: "bg-success/20 text-success border-success/30",
  completed: "bg-info/20 text-info border-info/30",
  attended: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300",
  missed: "bg-warning/20 text-warning border-warning/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
};

const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [patientSearch, setPatientSearch] = useState("");
  const [attendanceAppointment, setAttendanceAppointment] = useState<any>(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const selectedDate = date ? format(date, "yyyy-MM-dd") : undefined;
  const { data: appointments = [], isLoading } = useAppointments(selectedDate);
  const { data: patients = [] } = usePatients(patientSearch);
  const { data: drugs = [] } = useQuery({
    queryKey: ["drugs-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("drugs").select("id, name, current_stock").order("name");
      if (error) throw error;
      return data;
    },
  });

  const createAppointment = useCreateAppointment();
  const cancelAppointment = useCancelAppointment();
  const updateAppointment = useUpdateAppointment();

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      patient_id: "", appointment_date: "", appointment_time: "", type: "", reason: "",
    },
  });

  const selectedPatientId = watch("patient_id");

  // Attendance form state
  const [attForm, setAttForm] = useState({
    bp_systolic: "",
    bp_diastolic: "",
    temperature: "",
    symptoms: "",
    conclusion: "",
    selectedDrugs: [] as { drug_id: string; name: string; quantity: number; dosage: string; frequency: string; duration: string }[],
  });
  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    if (!user?.id) return;
    await createAppointment.mutateAsync({
      patient_id: data.patient_id,
      doctor_id: user.id,
      appointment_date: data.appointment_date,
      appointment_time: data.appointment_time,
      type: data.type,
      reason: data.reason || null,
      status: "scheduled",
    });
    reset();
    setIsDialogOpen(false);
  });

  const handleAttendanceSubmit = async () => {
    if (!attendanceAppointment || !user?.id) return;
    const apt = attendanceAppointment;

    if (!attForm.bp_systolic || !attForm.bp_diastolic || !attForm.temperature || !attForm.symptoms || !attForm.conclusion) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmittingAttendance(true);
    try {
      // 1. Record vitals
      await supabase.from("vitals").insert({
        patient_id: apt.patient_id,
        recorded_by: user.id,
        blood_pressure_systolic: parseInt(attForm.bp_systolic),
        blood_pressure_diastolic: parseInt(attForm.bp_diastolic),
        temperature: parseFloat(attForm.temperature),
        notes: `Symptoms: ${attForm.symptoms}`,
      });

      // 2. Create consultation
      const { data: consultation, error: conErr } = await supabase.from("consultations").insert({
        patient_id: apt.patient_id,
        doctor_id: user.id,
        chief_complaint: attForm.symptoms,
        diagnosis: [attForm.conclusion],
        notes: attForm.conclusion,
        status: "completed",
      }).select().single();

      if (conErr) throw conErr;

      // 3. Create prescriptions for selected drugs
      if (consultation && attForm.selectedDrugs.length > 0) {
        const prescriptions = attForm.selectedDrugs.map((d) => ({
          consultation_id: consultation.id,
          drug_id: d.drug_id,
          dosage: d.dosage || "As directed",
          frequency: d.frequency || "3 times daily",
          duration: d.duration || "5 days",
          quantity: d.quantity || 1,
          dispensed: true,
          dispensed_by: user.id,
          dispensed_at: new Date().toISOString(),
        }));
        const { error: rxErr } = await supabase.from("prescriptions").insert(prescriptions);
        if (rxErr) throw rxErr;
      }

      // 4. Mark appointment as attended
      await supabase.from("appointments").update({ status: "attended" }).eq("id", apt.id);

      toast.success("Patient attended to successfully!");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["drugs-list"] });

      setAttendanceAppointment(null);
      setAttForm({ bp_systolic: "", bp_diastolic: "", temperature: "", symptoms: "", conclusion: "", selectedDrugs: [] });
    } catch (error: any) {
      toast.error(`Failed: ${error.message}`);
    } finally {
      setIsSubmittingAttendance(false);
    }
  };

  const toggleDrug = (drug: { id: string; name: string; current_stock: number }) => {
    setAttForm((prev) => {
      const exists = prev.selectedDrugs.find((d) => d.drug_id === drug.id);
      if (exists) {
        return { ...prev, selectedDrugs: prev.selectedDrugs.filter((d) => d.drug_id !== drug.id) };
      }
      return {
        ...prev,
        selectedDrugs: [...prev.selectedDrugs, {
          drug_id: drug.id, name: drug.name, quantity: 1, dosage: "As directed", frequency: "3 times daily", duration: "5 days",
        }],
      };
    });
  };

  const updateDrugField = (drugId: string, field: string, value: string | number) => {
    setAttForm((prev) => ({
      ...prev,
      selectedDrugs: prev.selectedDrugs.map((d) => d.drug_id === drugId ? { ...d, [field]: value } : d),
    }));
  };

  const formatDisplayDate = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
  };

  const scheduledCount = appointments.filter((a) => a.status === "scheduled").length;
  const attendedCount = appointments.filter((a) => a.status === "attended").length;
  const missedCount = appointments.filter((a) => a.status === "missed").length;
  const cancelledCount = appointments.filter((a) => a.status === "cancelled").length;

  return (
    <AppLayout title="Appointments" subtitle="Schedule and manage patient appointments">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-3">
              <CalendarComponent mode="single" selected={date} onSelect={setDate} className="rounded-md" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Day Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Scheduled</span><span className="font-medium text-primary">{scheduledCount}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Attended</span><span className="font-medium text-success">{attendedCount}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Missed</span><span className="font-medium text-warning">{missedCount}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Cancelled</span><span className="font-medium text-destructive">{cancelledCount}</span></div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => date && setDate(subDays(date, 1))}><ChevronLeft className="h-4 w-4" /></Button>
              <h2 className="text-lg font-semibold">{date ? formatDisplayDate(date) : "Select a date"}</h2>
              <Button variant="outline" size="icon" onClick={() => date && setDate(addDays(date, 1))}><ChevronRight className="h-4 w-4" /></Button>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2"><CalendarPlus className="h-4 w-4" />New Appointment</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Book New Appointment</DialogTitle>
                  <DialogDescription>Schedule a new appointment for a patient.</DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Search Patient</Label>
                    <Input placeholder="Type to search patients..." value={patientSearch} onChange={(e) => setPatientSearch(e.target.value)} />
                    {patientSearch && patients.length > 0 && (
                      <div className="max-h-32 overflow-y-auto rounded border bg-background">
                        {patients.slice(0, 5).map((patient) => (
                          <button key={patient.id} type="button" className={cn("w-full px-3 py-2 text-left text-sm hover:bg-muted", selectedPatientId === patient.id && "bg-primary/10")} onClick={() => { setValue("patient_id", patient.id); setPatientSearch(`${patient.first_name} ${patient.last_name}`); }}>
                            <p className="font-medium">{patient.first_name} {patient.last_name}</p>
                            <p className="text-xs text-muted-foreground">{patient.student_id}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Date</Label><Input type="date" {...register("appointment_date", { required: true })} defaultValue={selectedDate} /></div>
                    <div className="space-y-2"><Label>Time</Label><Input type="time" step="1800" {...register("appointment_time", { required: true })} /></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select onValueChange={(val) => setValue("type", val)}><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>{appointmentTypes.map((t) => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}</SelectContent></Select>
                  </div>
                  <div className="space-y-2"><Label>Reason</Label><Textarea placeholder="Reason for visit" {...register("reason")} /></div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit" disabled={createAppointment.isPending || !selectedPatientId}>{createAppointment.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Book</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary" />Schedule</CardTitle>
                <Badge variant="outline">{appointments.length} appointment{appointments.length !== 1 ? "s" : ""}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
              ) : appointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="mb-3 h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground">No appointments for this day</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className={cn("rounded-lg border p-4 transition-all", appointment.status === "cancelled" || appointment.status === "missed" ? "opacity-60" : appointment.status === "attended" ? "border-success/30 bg-success/5" : "border-primary/30 bg-primary/5")}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="font-medium">{formatTime(appointment.appointment_time)}</span></div>
                        <Badge variant="outline" className={statusColors[appointment.status]}>
                          {appointment.status === "attended" && <CheckCircle className="mr-1 h-3 w-3" />}
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">{appointment.patients.first_name} {appointment.patients.last_name}</p>
                        <p className="text-xs text-muted-foreground">{appointmentTypes.find((t) => t.value === appointment.type)?.label || appointment.type}</p>
                        {appointment.reason && <p className="text-xs text-muted-foreground">Reason: {appointment.reason}</p>}
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {appointment.status === "scheduled" && (
                            <>
                              <Button size="sm" variant="default" className="h-7 text-xs" onClick={(e) => { e.stopPropagation(); setAttendanceAppointment(appointment); }}>
                                <CheckCircle className="mr-1 h-3 w-3" />Mark as Attended
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); cancelAppointment.mutate(appointment.id); }}>Cancel</Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Attendance Form Dialog */}
      <Dialog open={!!attendanceAppointment} onOpenChange={(open) => { if (!open) setAttendanceAppointment(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Patient Attendance Form</DialogTitle>
            <DialogDescription>
              Record vitals, symptoms, diagnosis, and prescriptions for {attendanceAppointment?.patients?.first_name} {attendanceAppointment?.patients?.last_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-4">
            {/* Vitals */}
            <div>
              <h4 className="font-medium mb-3">Vitals</h4>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>BP Systolic (mmHg) *</Label>
                  <Input type="number" placeholder="120" value={attForm.bp_systolic} onChange={(e) => setAttForm({ ...attForm, bp_systolic: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>BP Diastolic (mmHg) *</Label>
                  <Input type="number" placeholder="80" value={attForm.bp_diastolic} onChange={(e) => setAttForm({ ...attForm, bp_diastolic: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Temperature (°C) *</Label>
                  <Input type="number" step="0.1" placeholder="36.5" value={attForm.temperature} onChange={(e) => setAttForm({ ...attForm, temperature: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div className="space-y-2">
              <Label>Symptoms / Chief Complaint *</Label>
              <Textarea placeholder="Describe the patient's symptoms..." value={attForm.symptoms} onChange={(e) => setAttForm({ ...attForm, symptoms: e.target.value })} rows={3} />
            </div>

            {/* Conclusion */}
            <div className="space-y-2">
              <Label>Conclusion / Diagnosis *</Label>
              <Textarea placeholder="Your diagnosis and conclusion..." value={attForm.conclusion} onChange={(e) => setAttForm({ ...attForm, conclusion: e.target.value })} rows={2} />
            </div>

            {/* Drugs */}
            <div>
              <Label className="mb-3 block">Drugs Given</Label>
              <ScrollArea className="max-h-48 rounded-lg border p-3">
                <div className="space-y-2">
                  {drugs.map((drug) => (
                    <div key={drug.id} className="flex items-center gap-3">
                      <Checkbox
                        checked={attForm.selectedDrugs.some((d) => d.drug_id === drug.id)}
                        onCheckedChange={() => toggleDrug(drug)}
                      />
                      <span className="text-sm flex-1">{drug.name}</span>
                      <Badge variant="outline" className="text-xs">{drug.current_stock} left</Badge>
                    </div>
                  ))}
                  {drugs.length === 0 && <p className="text-sm text-muted-foreground">No drugs in inventory</p>}
                </div>
              </ScrollArea>

              {/* Selected drugs details */}
              {attForm.selectedDrugs.length > 0 && (
                <div className="mt-3 space-y-3">
                  {attForm.selectedDrugs.map((d) => (
                    <div key={d.drug_id} className="rounded-lg border p-3">
                      <p className="text-sm font-medium mb-2">{d.name}</p>
                      <div className="grid gap-2 sm:grid-cols-4">
                        <div className="space-y-1">
                          <Label className="text-xs">Qty</Label>
                          <Input type="number" min="1" value={d.quantity} onChange={(e) => updateDrugField(d.drug_id, "quantity", parseInt(e.target.value) || 1)} className="h-8 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Dosage</Label>
                          <Input value={d.dosage} onChange={(e) => updateDrugField(d.drug_id, "dosage", e.target.value)} className="h-8 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Frequency</Label>
                          <Input value={d.frequency} onChange={(e) => updateDrugField(d.drug_id, "frequency", e.target.value)} className="h-8 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Duration</Label>
                          <Input value={d.duration} onChange={(e) => updateDrugField(d.drug_id, "duration", e.target.value)} className="h-8 text-sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAttendanceAppointment(null)}>Cancel</Button>
            <Button onClick={handleAttendanceSubmit} disabled={isSubmittingAttendance}>
              {isSubmittingAttendance && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Complete & Mark Attended
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Appointments;
