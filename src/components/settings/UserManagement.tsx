import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2, Loader2, UserPlus, KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface UserWithRole {
  id: string;
  user_id: string;
  full_name: string;
  email: string | null;
  department: string | null;
  role: AppRole | null;
}

const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Admin", doctor: "Doctor", nurse: "Nurse", pharmacist: "Pharmacist",
  lab_technician: "Lab Technician", receptionist: "Receptionist", student: "Student",
};

const ROLE_COLORS: Record<AppRole, string> = {
  admin: "bg-destructive/10 text-destructive",
  doctor: "bg-primary/10 text-primary",
  nurse: "bg-info/10 text-info",
  pharmacist: "bg-success/10 text-success",
  lab_technician: "bg-warning/10 text-warning",
  receptionist: "bg-muted text-muted-foreground",
  student: "bg-secondary/10 text-secondary-foreground",
};

export function UserManagement() {
  const { hasRole } = useAuth();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [selectedRole, setSelectedRole] = useState<AppRole | "">("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Password reset state
  const [passwordUser, setPasswordUser] = useState<UserWithRole | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const isAdmin = hasRole("admin");

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles").select("id, user_id, full_name, email, department").order("created_at", { ascending: false });
      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase.from("user_roles").select("user_id, role");
      if (rolesError) throw rolesError;

      const roleMap = new Map(roles?.map((r) => [r.user_id, r.role as AppRole]));
      setUsers((profiles || []).map((p) => ({ ...p, role: roleMap.get(p.user_id) || null })));
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignRole = (user: UserWithRole) => {
    setSelectedUser(user);
    setSelectedRole(user.role || "");
    setIsDialogOpen(true);
  };

  const handleSaveRole = async () => {
    if (!selectedUser || !selectedRole) return;
    setIsSaving(true);
    try {
      if (selectedUser.role) {
        const { error } = await supabase.from("user_roles").update({ role: selectedRole }).eq("user_id", selectedUser.user_id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("user_roles").insert({ user_id: selectedUser.user_id, role: selectedRole });
        if (error) throw error;
      }
      toast.success(`Role ${selectedUser.role ? "updated" : "assigned"} successfully`);
      setIsDialogOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to save role");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveRole = async (user: UserWithRole) => {
    if (!user.role) return;
    try {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", user.user_id);
      if (error) throw error;
      toast.success("Role removed");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to remove role");
    }
  };

  const handleResetPassword = async () => {
    if (!passwordUser || !newPassword) return;
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setIsResettingPassword(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-reset-password", {
        body: { user_id: passwordUser.user_id, new_password: newPassword },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success(`Password reset for ${passwordUser.full_name}`);
      setPasswordUser(null);
      setNewPassword("");
    } catch (error: any) {
      toast.error(`Failed: ${error.message}`);
    } finally {
      setIsResettingPassword(false);
    }
  };

  const getRoleBadge = (role: AppRole | null) => {
    if (!role) return <Badge variant="outline" className="text-muted-foreground">No Role</Badge>;
    return <Badge className={ROLE_COLORS[role]}>{ROLE_LABELS[role]}</Badge>;
  };

  if (isLoading) {
    return <Card><CardContent className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></CardContent></Card>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage accounts and assign roles ({users.length} users)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead>Role</TableHead>
                  {isAdmin && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No users found</TableCell></TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div>{user.full_name}</div>
                        <div className="text-xs text-muted-foreground sm:hidden">{user.email}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{user.department || "—"}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      {isAdmin && (
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleAssignRole(user)} title="Assign/Edit Role">
                              {user.role ? <Pencil className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setPasswordUser(user)} title="Reset Password">
                              <KeyRound className="h-4 w-4" />
                            </Button>
                            {user.role && (
                              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleRemoveRole(user)} title="Remove Role">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Role Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUser?.role ? "Update Role" : "Assign Role"}</DialogTitle>
            <DialogDescription>{selectedUser?.role ? `Change role for ${selectedUser?.full_name}` : `Assign role to ${selectedUser?.full_name}`}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as AppRole)}>
              <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="nurse">Nurse</SelectItem>
                <SelectItem value="pharmacist">Pharmacist</SelectItem>
                <SelectItem value="lab_technician">Lab Technician</SelectItem>
                <SelectItem value="receptionist">Receptionist</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveRole} disabled={!selectedRole || isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {selectedUser?.role ? "Update" : "Assign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Password Reset Dialog */}
      <Dialog open={!!passwordUser} onOpenChange={(open) => { if (!open) { setPasswordUser(null); setNewPassword(""); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>Set a new password for {passwordUser?.full_name}</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" placeholder="Min 6 characters" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setPasswordUser(null); setNewPassword(""); }}>Cancel</Button>
            <Button onClick={handleResetPassword} disabled={!newPassword || newPassword.length < 6 || isResettingPassword}>
              {isResettingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Reset Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
