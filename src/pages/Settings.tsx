import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Settings as SettingsIcon,
  Users,
  Shield,
  Bell,
  Database,
  Calendar,
  Building2,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

const mockUsers = [
  { id: "1", name: "Dr. Okonkwo", email: "okonkwo@mtu.edu.ng", role: "Doctor", status: "active" },
  { id: "2", name: "Dr. Adeyemi", email: "adeyemi@mtu.edu.ng", role: "Doctor", status: "active" },
  { id: "3", name: "Nurse Fatima", email: "fatima@mtu.edu.ng", role: "Nurse", status: "active" },
  { id: "4", name: "Pharm. Chukwu", email: "chukwu@mtu.edu.ng", role: "Pharmacist", status: "active" },
  { id: "5", name: "Lab Tech. Bello", email: "bello@mtu.edu.ng", role: "Lab Technician", status: "inactive" },
];

const Settings = () => {
  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      Admin: "bg-destructive/10 text-destructive",
      Doctor: "bg-primary/10 text-primary",
      Nurse: "bg-info/10 text-info",
      Pharmacist: "bg-success/10 text-success",
      "Lab Technician": "bg-warning/10 text-warning",
    };
    return <Badge className={colors[role] || "bg-muted text-muted-foreground"}>{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-success/10 text-success">Active</Badge>
    ) : (
      <Badge className="bg-muted text-muted-foreground">Inactive</Badge>
    );
  };

  return (
    <AppLayout title="Settings" subtitle="Configure system settings and manage users">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-6">
          <TabsTrigger value="general" className="gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Roles</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Appointments</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Clinic Information
                </CardTitle>
                <CardDescription>Basic information about the health centre</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="clinicName">Clinic Name</Label>
                    <Input id="clinicName" defaultValue="MTU Health Centre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+234 803 123 4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="health@mtu.edu.ng" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="Mountain Top University, Ogun State" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operating Hours</CardTitle>
                <CardDescription>Set the clinic's operating schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Weekdays</Label>
                    <div className="flex gap-2">
                      <Input defaultValue="08:00" type="time" />
                      <span className="self-center">to</span>
                      <Input defaultValue="18:00" type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Weekends</Label>
                    <div className="flex gap-2">
                      <Input defaultValue="09:00" type="time" />
                      <span className="self-center">to</span>
                      <Input defaultValue="14:00" type="time" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="emergency" defaultChecked />
                  <Label htmlFor="emergency">24/7 Emergency Services Available</Label>
                </div>
                <div className="flex justify-end">
                  <Button>Update Schedule</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage staff accounts and permissions</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
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

        {/* Roles & Permissions */}
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>Configure access levels for different user roles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {["Admin", "Doctor", "Nurse", "Pharmacist", "Lab Technician"].map((role) => (
                <div key={role} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getRoleBadge(role)}
                      <span className="text-sm text-muted-foreground">
                        {role === "Admin" ? "Full system access" : `${role} permissions`}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <Separator />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Low Stock Alerts</p>
                    <p className="text-sm text-muted-foreground">Notify when inventory is running low</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Expiry Alerts</p>
                    <p className="text-sm text-muted-foreground">Notify before drugs expire</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Appointment Reminders</p>
                    <p className="text-sm text-muted-foreground">Send reminders to patients</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Queue Updates</p>
                    <p className="text-sm text-muted-foreground">Real-time queue notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appointment Settings */}
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Configuration</CardTitle>
              <CardDescription>Configure booking rules and time slots</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Default Appointment Duration</Label>
                  <Select defaultValue="15">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="20">20 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Booking Window</Label>
                  <Select defaultValue="14">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="doubleBooking" />
                <Label htmlFor="doubleBooking">Allow double booking (Admin only)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="autoConfirm" defaultChecked />
                <Label htmlFor="autoConfirm">Auto-confirm appointments</Label>
              </div>
              <div className="flex justify-end">
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Backup, sync, and data settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Automatic Backup</p>
                    <p className="text-sm text-muted-foreground">Daily backup at midnight</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Offline Mode</p>
                    <p className="text-sm text-muted-foreground">Enable offline data capture</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Last Sync</p>
                    <p className="text-sm text-muted-foreground">Jan 15, 2024 at 2:30 PM</p>
                  </div>
                  <Button variant="outline">Sync Now</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>View system activity and access logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Access detailed audit logs and system activity</p>
                  <Button className="mt-4" variant="outline">View Audit Logs</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Settings;
