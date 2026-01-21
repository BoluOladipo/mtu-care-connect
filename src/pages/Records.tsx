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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  FileText,
  Download,
  Eye,
  Filter,
  Calendar,
  User,
  Activity,
} from "lucide-react";
import { useState } from "react";

const mockMedicalRecords = [
  {
    id: "1",
    patientName: "Adebayo Johnson",
    studentId: "MTU/2021/001",
    recordType: "Consultation",
    date: "2024-01-15",
    doctor: "Dr. Okonkwo",
    summary: "Malaria treatment - Artemether prescribed",
  },
  {
    id: "2",
    patientName: "Chioma Obi",
    studentId: "MTU/2022/045",
    recordType: "Lab Result",
    date: "2024-01-14",
    doctor: "Dr. Adeyemi",
    summary: "Blood test - Normal CBC values",
  },
  {
    id: "3",
    patientName: "Emmanuel Nwosu",
    studentId: "MTU/2020/112",
    recordType: "Immunization",
    date: "2024-01-13",
    doctor: "Nurse Fatima",
    summary: "Hepatitis B vaccination - Dose 2",
  },
  {
    id: "4",
    patientName: "Fatima Ahmed",
    studentId: "MTU/2023/078",
    recordType: "Fitness Cert",
    date: "2024-01-12",
    doctor: "Dr. Okonkwo",
    summary: "Medical fitness certificate issued",
  },
];

const mockFitnessCerts = [
  {
    id: "1",
    studentName: "Adebayo Johnson",
    studentId: "MTU/2021/001",
    issueDate: "2024-01-10",
    expiryDate: "2025-01-10",
    status: "valid",
    examiner: "Dr. Okonkwo",
  },
  {
    id: "2",
    studentName: "Chioma Obi",
    studentId: "MTU/2022/045",
    issueDate: "2023-09-15",
    expiryDate: "2024-09-15",
    status: "valid",
    examiner: "Dr. Adeyemi",
  },
  {
    id: "3",
    studentName: "David Eze",
    studentId: "MTU/2019/034",
    issueDate: "2023-02-20",
    expiryDate: "2024-02-20",
    status: "expired",
    examiner: "Dr. Okonkwo",
  },
];

const Records = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordType, setRecordType] = useState("all");

  const filteredRecords = mockMedicalRecords.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = recordType === "all" || record.recordType.toLowerCase().includes(recordType.toLowerCase());
    return matchesSearch && matchesType;
  });

  const getRecordTypeBadge = (type: string) => {
    switch (type) {
      case "Consultation":
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{type}</Badge>;
      case "Lab Result":
        return <Badge className="bg-info/10 text-info hover:bg-info/20">{type}</Badge>;
      case "Immunization":
        return <Badge className="bg-success/10 text-success hover:bg-success/20">{type}</Badge>;
      case "Fitness Cert":
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">{type}</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "valid" ? (
      <Badge className="bg-success/10 text-success hover:bg-success/20">Valid</Badge>
    ) : (
      <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Expired</Badge>
    );
  };

  return (
    <AppLayout title="Medical Records" subtitle="Access and manage patient health records">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                  <p className="text-2xl font-bold">12,450</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-info/10">
                  <User className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Patients</p>
                  <p className="text-2xl font-bold">3,280</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                  <Activity className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valid Fitness Certs</p>
                  <p className="text-2xl font-bold">2,890</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                  <Calendar className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expiring Soon</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all-records" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all-records">All Records</TabsTrigger>
            <TabsTrigger value="fitness-certs">Fitness Certificates</TabsTrigger>
            <TabsTrigger value="archive">Archive</TabsTrigger>
          </TabsList>

          <TabsContent value="all-records">
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
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
                  <Select value={recordType} onValueChange={setRecordType}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Record type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="lab">Lab Result</SelectItem>
                      <SelectItem value="immunization">Immunization</SelectItem>
                      <SelectItem value="fitness">Fitness Cert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Table */}
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Record Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Summary</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{record.patientName}</p>
                              <p className="text-sm text-muted-foreground">{record.studentId}</p>
                            </div>
                          </TableCell>
                          <TableCell>{getRecordTypeBadge(record.recordType)}</TableCell>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.doctor}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{record.summary}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fitness-certs">
            <Card>
              <CardHeader>
                <CardTitle>Medical Fitness Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Examiner</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockFitnessCerts.map((cert) => (
                        <TableRow key={cert.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{cert.studentName}</p>
                              <p className="text-sm text-muted-foreground">{cert.studentId}</p>
                            </div>
                          </TableCell>
                          <TableCell>{cert.issueDate}</TableCell>
                          <TableCell>{cert.expiryDate}</TableCell>
                          <TableCell>{cert.examiner}</TableCell>
                          <TableCell>{getStatusBadge(cert.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archive">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">Archived Records</h3>
                  <p className="text-muted-foreground mt-2">
                    Access historical patient records and archived documents
                  </p>
                  <Button className="mt-4" variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Browse Archive
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Records;
