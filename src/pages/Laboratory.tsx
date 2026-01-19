import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  FlaskConical,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface LabRequest {
  id: string;
  patientName: string;
  studentId: string;
  testType: string;
  requestedBy: string;
  requestedAt: string;
  status: "pending" | "in_progress" | "completed";
  results?: string;
  completedAt?: string;
  priority: "normal" | "urgent";
}

const mockLabRequests: LabRequest[] = [
  {
    id: "1",
    patientName: "Adebayo Oluwaseun",
    studentId: "MTU/2023/0451",
    testType: "Complete Blood Count (CBC)",
    requestedBy: "Dr. Johnson",
    requestedAt: "2024-01-15 09:30",
    status: "in_progress",
    priority: "normal",
  },
  {
    id: "2",
    patientName: "Chiamaka Okonkwo",
    studentId: "MTU/2022/1234",
    testType: "Malaria Parasite Test",
    requestedBy: "Dr. Adeyemi",
    requestedAt: "2024-01-15 10:00",
    status: "pending",
    priority: "urgent",
  },
  {
    id: "3",
    patientName: "Emmanuel Nwosu",
    studentId: "MTU/2024/0089",
    testType: "Urinalysis",
    requestedBy: "Dr. Johnson",
    requestedAt: "2024-01-15 08:00",
    status: "completed",
    results: "Normal - No abnormalities detected",
    completedAt: "2024-01-15 10:30",
    priority: "normal",
  },
  {
    id: "4",
    patientName: "Fatima Abubakar",
    studentId: "MTU/2023/0567",
    testType: "Blood Glucose (Fasting)",
    requestedBy: "Dr. Obi",
    requestedAt: "2024-01-15 07:30",
    status: "completed",
    results: "Fasting glucose: 95 mg/dL (Normal)",
    completedAt: "2024-01-15 09:00",
    priority: "normal",
  },
  {
    id: "5",
    patientName: "Grace Okafor",
    studentId: "MTU/2021/2345",
    testType: "Widal Test",
    requestedBy: "Dr. Adeyemi",
    requestedAt: "2024-01-15 11:00",
    status: "pending",
    priority: "normal",
  },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-warning/20 text-warning", icon: Clock },
  in_progress: { label: "In Progress", color: "bg-info/20 text-info", icon: FlaskConical },
  completed: { label: "Completed", color: "bg-success/20 text-success", icon: CheckCircle },
};

const Laboratory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = mockLabRequests.filter(
    (req) =>
      req.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.testType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = mockLabRequests.filter((r) => r.status === "pending").length;
  const inProgressCount = mockLabRequests.filter((r) => r.status === "in_progress").length;
  const completedCount = mockLabRequests.filter((r) => r.status === "completed").length;

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts.map((p) => p[0]).join("").toUpperCase();
  };

  return (
    <AppLayout title="Laboratory" subtitle="Lab requests and test results">
      <div className="space-y-6">
        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <FlaskConical className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockLabRequests.length}</p>
                <p className="text-sm text-muted-foreground">Total Requests</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-warning/30 bg-warning/5">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning text-warning-foreground">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-info/30 bg-info/5">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info text-info-foreground">
                <FlaskConical className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inProgressCount}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
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
                <p className="text-sm text-muted-foreground">Completed Today</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <Tabs defaultValue="requests" className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="requests" className="gap-2">
                <FlaskConical className="h-4 w-4" />
                Requests
              </TabsTrigger>
              <TabsTrigger value="results" className="gap-2">
                <FileText className="h-4 w-4" />
                Results
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:w-64"
                />
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Request
              </Button>
            </div>
          </div>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Lab Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Test Type</TableHead>
                        <TableHead>Requested By</TableHead>
                        <TableHead>Requested At</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => {
                        const status = statusConfig[request.status];
                        const StatusIcon = status.icon;

                        return (
                          <TableRow key={request.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                    {getInitials(request.patientName)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{request.patientName}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {request.studentId}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="font-medium">{request.testType}</p>
                            </TableCell>
                            <TableCell>{request.requestedBy}</TableCell>
                            <TableCell>
                              {new Date(request.requestedAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={request.priority === "urgent" ? "destructive" : "secondary"}
                              >
                                {request.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={`${status.color} flex w-fit items-center gap-1`}>
                                <StatusIcon className="h-3 w-3" />
                                {status.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {request.status === "pending" && (
                                <Button size="sm" variant="outline">
                                  Start
                                </Button>
                              )}
                              {request.status === "in_progress" && (
                                <Button size="sm">Enter Results</Button>
                              )}
                              {request.status === "completed" && (
                                <Button size="sm" variant="ghost" className="gap-1">
                                  <FileText className="h-3 w-3" />
                                  View
                                </Button>
                              )}
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

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Completed Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLabRequests
                    .filter((r) => r.status === "completed")
                    .map((request) => (
                      <div
                        key={request.id}
                        className="flex items-start justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {getInitials(request.patientName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{request.patientName}</p>
                            <p className="text-sm text-muted-foreground">
                              {request.testType}
                            </p>
                            <p className="mt-2 text-sm">
                              <span className="font-medium">Result:</span> {request.results}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Completed: {request.completedAt}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Laboratory;
