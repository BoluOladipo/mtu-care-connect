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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  UserPlus,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  FileText,
  Stethoscope,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Patient {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  faculty: string;
  level: string;
  lastVisit: string;
  status: "active" | "inactive";
}

const mockPatients: Patient[] = [
  {
    id: "1",
    studentId: "MTU/2023/0451",
    firstName: "Adebayo",
    lastName: "Oluwaseun",
    gender: "male",
    faculty: "Engineering",
    level: "300",
    lastVisit: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    studentId: "MTU/2022/1234",
    firstName: "Chiamaka",
    lastName: "Okonkwo",
    gender: "female",
    faculty: "Sciences",
    level: "400",
    lastVisit: "2024-01-14",
    status: "active",
  },
  {
    id: "3",
    studentId: "MTU/2024/0089",
    firstName: "Emmanuel",
    lastName: "Nwosu",
    gender: "male",
    faculty: "Arts",
    level: "100",
    lastVisit: "2024-01-13",
    status: "active",
  },
  {
    id: "4",
    studentId: "MTU/2023/0567",
    firstName: "Fatima",
    lastName: "Abubakar",
    gender: "female",
    faculty: "Medicine",
    level: "500",
    lastVisit: "2024-01-12",
    status: "active",
  },
  {
    id: "5",
    studentId: "MTU/2021/2345",
    firstName: "Grace",
    lastName: "Okafor",
    gender: "female",
    faculty: "Law",
    level: "400",
    lastVisit: "2024-01-10",
    status: "inactive",
  },
  {
    id: "6",
    studentId: "MTU/2024/0123",
    firstName: "Ibrahim",
    lastName: "Mohammed",
    gender: "male",
    faculty: "Business",
    level: "200",
    lastVisit: "2024-01-09",
    status: "active",
  },
  {
    id: "7",
    studentId: "MTU/2022/3456",
    firstName: "Janet",
    lastName: "Adeyemi",
    gender: "female",
    faculty: "Education",
    level: "300",
    lastVisit: "2024-01-08",
    status: "active",
  },
  {
    id: "8",
    studentId: "MTU/2023/0789",
    firstName: "Kingsley",
    lastName: "Eze",
    gender: "male",
    faculty: "Engineering",
    level: "200",
    lastVisit: "2024-01-07",
    status: "active",
  },
];

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName[0]}${lastName[0]}`.toUpperCase();

  return (
    <AppLayout title="Patients" subtitle="Manage patient records and registrations">
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or student ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Register Patient
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {mockPatients.length}
              </div>
              <p className="text-sm text-muted-foreground">Total Patients</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">
                {mockPatients.filter((p) => p.status === "active").length}
              </div>
              <p className="text-sm text-muted-foreground">Active Records</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">12</div>
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Faculty</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {getInitials(patient.firstName, patient.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {patient.firstName} {patient.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground capitalize">
                              {patient.gender}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {patient.studentId}
                      </TableCell>
                      <TableCell>{patient.faculty}</TableCell>
                      <TableCell>{patient.level} Level</TableCell>
                      <TableCell>
                        {new Date(patient.lastVisit).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={patient.status === "active" ? "default" : "secondary"}
                          className={
                            patient.status === "active"
                              ? "bg-success/20 text-success"
                              : ""
                          }
                        >
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <FileText className="h-4 w-4" />
                              View EHR
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Stethoscope className="h-4 w-4" />
                              Start Consultation
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

export default Patients;
