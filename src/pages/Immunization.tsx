import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Syringe,
  Calendar,
  Download,
  FileText,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ImmunizationRecord {
  id: string;
  patientId: string;
  patientName: string;
  studentId: string;
  vaccineName: string;
  dateAdministered: string;
  administeredBy: string;
  batchNumber: string;
  nextDoseDate?: string;
  status: "completed" | "due" | "overdue";
}

const mockRecords: ImmunizationRecord[] = [
  {
    id: "1",
    patientId: "p1",
    patientName: "Adebayo Oluwaseun",
    studentId: "MTU/2023/0451",
    vaccineName: "Hepatitis B - Dose 1",
    dateAdministered: "2024-01-10",
    administeredBy: "Nurse Mary",
    batchNumber: "HB-2024-001",
    nextDoseDate: "2024-02-10",
    status: "completed",
  },
  {
    id: "2",
    patientId: "p2",
    patientName: "Chiamaka Okonkwo",
    studentId: "MTU/2022/1234",
    vaccineName: "Meningitis ACYW135",
    dateAdministered: "2024-01-12",
    administeredBy: "Dr. Johnson",
    batchNumber: "MN-2024-002",
    status: "completed",
  },
  {
    id: "3",
    patientId: "p3",
    patientName: "Emmanuel Nwosu",
    studentId: "MTU/2024/0089",
    vaccineName: "Hepatitis B - Dose 2",
    dateAdministered: "",
    administeredBy: "",
    batchNumber: "",
    nextDoseDate: "2024-01-20",
    status: "due",
  },
  {
    id: "4",
    patientId: "p4",
    patientName: "Fatima Abubakar",
    studentId: "MTU/2023/0567",
    vaccineName: "Yellow Fever",
    dateAdministered: "2024-01-08",
    administeredBy: "Nurse Grace",
    batchNumber: "YF-2024-003",
    status: "completed",
  },
  {
    id: "5",
    patientId: "p5",
    patientName: "Grace Okafor",
    studentId: "MTU/2021/2345",
    vaccineName: "Tetanus Booster",
    dateAdministered: "",
    administeredBy: "",
    batchNumber: "",
    nextDoseDate: "2024-01-05",
    status: "overdue",
  },
];

const statusConfig = {
  completed: { label: "Completed", color: "bg-success/20 text-success" },
  due: { label: "Due", color: "bg-warning/20 text-warning" },
  overdue: { label: "Overdue", color: "bg-destructive/20 text-destructive" },
};

const Immunization = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecords = mockRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.vaccineName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = mockRecords.filter((r) => r.status === "completed").length;
  const dueCount = mockRecords.filter((r) => r.status === "due").length;
  const overdueCount = mockRecords.filter((r) => r.status === "overdue").length;

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts.map((p) => p[0]).join("").toUpperCase();
  };

  return (
    <AppLayout title="Immunization" subtitle="Vaccination records and schedules">
      <div className="space-y-6">
        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Syringe className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockRecords.length}</p>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-success/30 bg-success/5">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success text-success-foreground">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedCount}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-warning/30 bg-warning/5">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning text-warning-foreground">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dueCount}</p>
                <p className="text-sm text-muted-foreground">Due Soon</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive text-destructive-foreground">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{overdueCount}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <Tabs defaultValue="records" className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="records" className="gap-2">
                <Syringe className="h-4 w-4" />
                Records
              </TabsTrigger>
              <TabsTrigger value="schedule" className="gap-2">
                <Calendar className="h-4 w-4" />
                Schedule
              </TabsTrigger>
              <TabsTrigger value="certificates" className="gap-2">
                <FileText className="h-4 w-4" />
                Certificates
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:w-64"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Record
              </Button>
            </div>
          </div>

          <TabsContent value="records">
            <Card>
              <CardHeader>
                <CardTitle>Vaccination Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Vaccine</TableHead>
                        <TableHead>Date Administered</TableHead>
                        <TableHead>Administered By</TableHead>
                        <TableHead>Next Dose</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.map((record) => {
                        const status = statusConfig[record.status];

                        return (
                          <TableRow key={record.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                    {getInitials(record.patientName)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{record.patientName}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {record.studentId}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="font-medium">{record.vaccineName}</p>
                              {record.batchNumber && (
                                <p className="text-sm text-muted-foreground">
                                  Batch: {record.batchNumber}
                                </p>
                              )}
                            </TableCell>
                            <TableCell>
                              {record.dateAdministered
                                ? new Date(record.dateAdministered).toLocaleDateString()
                                : "-"}
                            </TableCell>
                            <TableCell>{record.administeredBy || "-"}</TableCell>
                            <TableCell>
                              {record.nextDoseDate
                                ? new Date(record.nextDoseDate).toLocaleDateString()
                                : "N/A"}
                            </TableCell>
                            <TableCell>
                              <Badge className={status.color}>{status.label}</Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">
                  Immunization Schedule
                </p>
                <p className="text-muted-foreground text-center max-w-md">
                  View and manage vaccination schedules. Send reminders to students for
                  upcoming doses.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">
                  Vaccination Certificates
                </p>
                <p className="text-muted-foreground text-center max-w-md">
                  Generate and download vaccination certificates for students.
                </p>
                <Button className="mt-4 gap-2">
                  <Download className="h-4 w-4" />
                  Generate Certificate
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Immunization;
