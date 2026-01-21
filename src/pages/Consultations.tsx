import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, FileText, Stethoscope, ClipboardList } from "lucide-react";
import { useState } from "react";

// Mock data for consultations
const mockConsultations = [
  {
    id: "1",
    patientName: "Adebayo Johnson",
    studentId: "MTU/2021/001",
    date: "2024-01-15",
    time: "09:30 AM",
    chiefComplaint: "Persistent headache and fever",
    diagnosis: ["Malaria", "Tension headache"],
    doctorName: "Dr. Okonkwo",
    status: "completed",
  },
  {
    id: "2",
    patientName: "Chioma Obi",
    studentId: "MTU/2022/045",
    date: "2024-01-15",
    time: "10:15 AM",
    chiefComplaint: "Stomach pain and nausea",
    diagnosis: ["Gastritis"],
    doctorName: "Dr. Adeyemi",
    status: "in_progress",
  },
  {
    id: "3",
    patientName: "Emmanuel Nwosu",
    studentId: "MTU/2020/112",
    date: "2024-01-15",
    time: "11:00 AM",
    chiefComplaint: "Cough and chest congestion",
    diagnosis: [],
    doctorName: "Dr. Okonkwo",
    status: "pending",
  },
];

const Consultations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredConsultations = mockConsultations.filter((consultation) => {
    const matchesSearch =
      consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || consultation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-info/10 text-info hover:bg-info/20">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AppLayout title="Consultations" subtitle="Manage patient consultations and diagnoses">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Stethoscope className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today's Consultations</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-info/10">
                  <ClipboardList className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                  <FileText className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">21</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                  <Stethoscope className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Consultation Records</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Consultation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Start New Consultation</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="patient">Patient</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient from queue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Adebayo Johnson - MTU/2021/001</SelectItem>
                        <SelectItem value="2">Chioma Obi - MTU/2022/045</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="complaint">Chief Complaint</Label>
                    <Textarea
                      id="complaint"
                      placeholder="Describe the patient's main complaint..."
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="history">Present Illness History</Label>
                    <Textarea
                      id="history"
                      placeholder="Document the history of present illness..."
                      rows={4}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="diagnosis">Diagnosis</Label>
                    <Input id="diagnosis" placeholder="Enter diagnosis" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Clinical Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional clinical notes..."
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Save as Draft</Button>
                    <Button>Complete Consultation</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by patient name or ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Chief Complaint</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsultations.map((consultation) => (
                    <TableRow key={consultation.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{consultation.patientName}</p>
                          <p className="text-sm text-muted-foreground">
                            {consultation.studentId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{consultation.date}</p>
                          <p className="text-sm text-muted-foreground">
                            {consultation.time}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {consultation.chiefComplaint}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {consultation.diagnosis.length > 0 ? (
                            consultation.diagnosis.map((d, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {d}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{consultation.doctorName}</TableCell>
                      <TableCell>{getStatusBadge(consultation.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Consultations;
