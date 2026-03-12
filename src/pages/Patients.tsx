import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  UserPlus,
  Eye,
  Loader2,
  ArrowLeft,
  Calendar,
  Pill,
  Stethoscope,
  FileText,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePatients, useCreatePatient, usePatient } from "@/hooks/usePatients";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

const FACULTIES = [
  "Engineering",
  "Science",
  "Management",
  "Environmental",
  "Information Technology",
];

const LEVELS = ["100", "200", "300", "400", "500"];

function usePatientHistory(patientId: string | null) {
  return useQuery({
    queryKey: ["patient-history", patientId],
    queryFn: async () => {
      if (!patientId) return null;

      const [
        { data: appointments },
        { data: consultations },
        { data: prescriptions },
      ] = await Promise.all([
        supabase
          .from("appointments")
          .select("*")
          .eq("patient_id", patientId)
          .order("appointment_date", { ascending: false })
          .limit(20),
        supabase
          .from("consultations")
          .select("*")
          .eq("patient_id", patientId)
          .order("consultation_date", { ascending: false })
          .limit(20),
        supabase
          .from("prescriptions")
          .select("*, drugs(name)")
          .in(
            "consultation_id",
            (
              await supabase
                .from("consultations")
                .select("id")
                .eq("patient_id", patientId)
            ).data?.map((c) => c.id) || []
          )
          .limit(50),
      ]);

      return { appointments, consultations, prescriptions };
    },
    enabled: !!patientId,
  });
}

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "male" as "male" | "female",
    faculty: "",
    level: "",
    email: "",
    phone: "",
    blood_type: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    emergency_contact_relationship: "",
  });

  const { data: patients = [], isLoading } = usePatients(searchQuery);
  const createPatient = useCreatePatient();
  const { data: selectedPatient } = usePatient(selectedPatientId || "");
  const { data: history, isLoading: loadingHistory } = usePatientHistory(selectedPatientId);

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName[0]}${lastName[0]}`.toUpperCase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPatient.mutateAsync({
      student_id: formData.student_id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
      faculty: formData.faculty,
      level: formData.level,
      email: formData.email || null,
      phone: formData.phone || null,
      blood_type: formData.blood_type || null,
      emergency_contact_name: formData.emergency_contact_name || null,
      emergency_contact_phone: formData.emergency_contact_phone || null,
      emergency_contact_relationship: formData.emergency_contact_relationship || null,
    });
    setIsDialogOpen(false);
    setFormData({
      student_id: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "male",
      faculty: "",
      level: "",
      email: "",
      phone: "",
      blood_type: "",
      emergency_contact_name: "",
      emergency_contact_phone: "",
      emergency_contact_relationship: "",
    });
  };

  // Patient detail view
  if (selectedPatientId && selectedPatient) {
    return (
      <AppLayout title="Patient Details" subtitle={`${selectedPatient.first_name} ${selectedPatient.last_name}`}>
        <div className="space-y-6">
          <Button variant="outline" onClick={() => setSelectedPatientId(null)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Patients
          </Button>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Patient Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {getInitials(selectedPatient.first_name, selectedPatient.last_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{selectedPatient.first_name} {selectedPatient.last_name}</p>
                    <p className="text-muted-foreground font-mono">{selectedPatient.student_id}</p>
                  </div>
                </div>
                <div className="border-t pt-3 space-y-2">
                  <p><span className="text-muted-foreground">Gender:</span> {selectedPatient.gender}</p>
                  <p><span className="text-muted-foreground">DOB:</span> {format(new Date(selectedPatient.date_of_birth), "MMM d, yyyy")}</p>
                  <p><span className="text-muted-foreground">Faculty:</span> {selectedPatient.faculty}</p>
                  <p><span className="text-muted-foreground">Level:</span> {selectedPatient.level}</p>
                  {selectedPatient.blood_type && <p><span className="text-muted-foreground">Blood Type:</span> {selectedPatient.blood_type}</p>}
                  {selectedPatient.email && <p><span className="text-muted-foreground">Email:</span> {selectedPatient.email}</p>}
                  {selectedPatient.phone && <p><span className="text-muted-foreground">Phone:</span> {selectedPatient.phone}</p>}
                  {selectedPatient.allergies && selectedPatient.allergies.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Allergies:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedPatient.allergies.map((a, i) => (
                          <Badge key={i} variant="destructive" className="text-xs">{a}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Visit History & Consultations */}
            <div className="lg:col-span-2 space-y-6">
              {loadingHistory ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  {/* Appointments History */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Calendar className="h-4 w-4 text-primary" />
                        Visit History ({history?.appointments?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {!history?.appointments?.length ? (
                        <p className="text-sm text-muted-foreground">No visit records</p>
                      ) : (
                        <ScrollArea className="max-h-[300px]">
                          <div className="space-y-2">
                            {history.appointments.map((apt: any) => (
                              <div key={apt.id} className="rounded-lg border p-3 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{format(new Date(apt.appointment_date), "MMM d, yyyy")}</span>
                                  <Badge variant="outline" className="text-xs">{apt.status}</Badge>
                                </div>
                                <p className="text-muted-foreground capitalize">{apt.type.replace("_", " ")}</p>
                                {apt.reason && <p className="text-xs text-muted-foreground mt-1">Reason: {apt.reason}</p>}
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </CardContent>
                  </Card>

                  {/* Consultations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Stethoscope className="h-4 w-4 text-primary" />
                        Consultations ({history?.consultations?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {!history?.consultations?.length ? (
                        <p className="text-sm text-muted-foreground">No consultation records</p>
                      ) : (
                        <ScrollArea className="max-h-[300px]">
                          <div className="space-y-2">
                            {history.consultations.map((con: any) => (
                              <div key={con.id} className="rounded-lg border p-3 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{format(new Date(con.consultation_date), "MMM d, yyyy")}</span>
                                  <Badge variant="outline" className="text-xs">{con.status}</Badge>
                                </div>
                                <p className="text-muted-foreground">Complaint: {con.chief_complaint}</p>
                                {con.diagnosis && con.diagnosis.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {con.diagnosis.map((d: string, i: number) => (
                                      <Badge key={i} variant="secondary" className="text-xs">{d}</Badge>
                                    ))}
                                  </div>
                                )}
                                {con.notes && <p className="text-xs text-muted-foreground mt-1">{con.notes}</p>}
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </CardContent>
                  </Card>

                  {/* Prescriptions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Pill className="h-4 w-4 text-primary" />
                        Prescriptions ({history?.prescriptions?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {!history?.prescriptions?.length ? (
                        <p className="text-sm text-muted-foreground">No prescription records</p>
                      ) : (
                        <ScrollArea className="max-h-[300px]">
                          <div className="space-y-2">
                            {history.prescriptions.map((p: any) => (
                              <div key={p.id} className="rounded-lg border p-3 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{(p.drugs as any)?.name || "Unknown Drug"}</span>
                                  <Badge variant={p.dispensed ? "default" : "secondary"} className="text-xs">
                                    {p.dispensed ? "Dispensed" : "Pending"}
                                  </Badge>
                                </div>
                                <p className="text-muted-foreground">
                                  {p.dosage} • {p.frequency} • {p.duration}
                                </p>
                                {p.instructions && <p className="text-xs text-muted-foreground mt-1">{p.instructions}</p>}
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  const activeCount = patients.filter((p) => p.status === "active").length;

  return (
    <AppLayout title="Patients" subtitle="Manage patient records and registrations">
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or matric number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Button className="gap-2" onClick={() => setIsDialogOpen(true)}>
            <UserPlus className="h-4 w-4" />
            Register Patient
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{patients.length}</div>
              <p className="text-sm text-muted-foreground">Total Patients</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">{activeCount}</div>
              <p className="text-sm text-muted-foreground">Active Records</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">
                {patients.filter((p) => {
                  const created = new Date(p.created_at);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return created > weekAgo;
                }).length}
              </div>
              <p className="text-sm text-muted-foreground">New This Week</p>
            </CardContent>
          </Card>
        </div>

        {/* Patients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : patients.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <UserPlus className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  {searchQuery ? "No patients found" : "No patients registered yet"}
                </p>
                {!searchQuery && (
                  <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                    Register First Patient
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Matric Number</TableHead>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow
                        key={patient.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedPatientId(patient.id)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                {getInitials(patient.first_name, patient.last_name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {patient.first_name} {patient.last_name}
                              </p>
                              <p className="text-sm text-muted-foreground capitalize">
                                {patient.gender}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{patient.student_id}</TableCell>
                        <TableCell>{patient.faculty}</TableCell>
                        <TableCell>{patient.level} Level</TableCell>
                        <TableCell>
                          {format(new Date(patient.created_at), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={patient.status === "active" ? "default" : "secondary"}
                            className={patient.status === "active" ? "bg-success/20 text-success" : ""}
                          >
                            {patient.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPatientId(patient.id);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Register Patient Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Register New Patient</DialogTitle>
            <DialogDescription>
              Enter the patient's information to create a new record
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="student_id">Matric Number *</Label>
                  <Input
                    id="student_id"
                    placeholder="MTU/2024/0001"
                    value={formData.student_id}
                    onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(v) => setFormData({ ...formData, gender: v as "male" | "female" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth *</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blood_type">Blood Type</Label>
                  <Select
                    value={formData.blood_type}
                    onValueChange={(v) => setFormData({ ...formData, blood_type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="faculty">Faculty *</Label>
                  <Select
                    value={formData.faculty}
                    onValueChange={(v) => setFormData({ ...formData, faculty: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select faculty..." />
                    </SelectTrigger>
                    <SelectContent>
                      {FACULTIES.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Level *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(v) => setFormData({ ...formData, level: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level..." />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVELS.map((l) => (
                        <SelectItem key={l} value={l}>
                          {l} Level
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium mb-4">Emergency Contact</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="emergency_name">Name</Label>
                    <Input
                      id="emergency_name"
                      value={formData.emergency_contact_name}
                      onChange={(e) =>
                        setFormData({ ...formData, emergency_contact_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency_phone">Phone</Label>
                    <Input
                      id="emergency_phone"
                      type="tel"
                      value={formData.emergency_contact_phone}
                      onChange={(e) =>
                        setFormData({ ...formData, emergency_contact_phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency_rel">Relationship</Label>
                    <Input
                      id="emergency_rel"
                      value={formData.emergency_contact_relationship}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergency_contact_relationship: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createPatient.isPending}>
                {createPatient.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Register Patient
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Patients;
