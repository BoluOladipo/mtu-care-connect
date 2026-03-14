import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardList,
  Pill,
  FlaskConical,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Stethoscope,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  title: string;
  icon: typeof LayoutDashboard;
  path: string;
  roles?: string[]; // if empty/undefined, show to all staff
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Queue", icon: ClipboardList, path: "/queue", roles: ["admin", "nurse", "doctor"] },
  { title: "Appointments", icon: Calendar, path: "/appointments", roles: ["admin", "doctor", "nurse"] },
];

const clinicalNavItems: NavItem[] = [
  { title: "Patients", icon: Users, path: "/patients", roles: ["admin", "doctor", "nurse"] },
  { title: "Consultations", icon: Stethoscope, path: "/consultations", roles: ["admin", "doctor"] },
  { title: "Laboratory", icon: FlaskConical, path: "/laboratory", roles: ["admin", "lab_technician", "doctor"] },
  { title: "Pharmacy", icon: Pill, path: "/pharmacy", roles: ["admin", "pharmacist"] },
];

const adminNavItems: NavItem[] = [
  { title: "Reports", icon: BarChart3, path: "/reports", roles: ["admin"] },
  { title: "Records", icon: FileText, path: "/records", roles: ["admin", "doctor", "nurse"] },
  { title: "Settings", icon: Settings, path: "/settings", roles: ["admin"] },
];

export function AppSidebar() {
  const location = useLocation();
  const { profile, roles, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  const getRoleLabel = () => {
    if (roles.includes("admin")) return "Administrator";
    if (roles.includes("doctor")) return "Doctor";
    if (roles.includes("nurse")) return "Nurse";
    if (roles.includes("pharmacist")) return "Pharmacist";
    if (roles.includes("lab_technician")) return "Lab Technician";
    if (roles.includes("student")) return "Student";
    return "Staff";
  };

  const filterByRole = (items: NavItem[]) =>
    items.filter((item) => {
      if (!item.roles) return true;
      return item.roles.some((r) => roles.includes(r as any));
    });

  const handleLogout = async () => {
    await signOut();
  };

  const renderNavGroup = (label: string, items: NavItem[]) => {
    const filtered = filterByRole(items);
    if (filtered.length === 0) return null;
    return (
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {filtered.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.path)}
                  className="transition-colors hover:bg-sidebar-accent"
                >
                  <Link to={item.path} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/mtu-logo.png"
            alt="Mountain Top University Logo"
            className="h-10 w-10 rounded-lg object-contain"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-sidebar-foreground">MTU Clinic</span>
            <span className="text-xs text-muted-foreground">Health Centre</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {renderNavGroup("Main", mainNavItems)}
        {renderNavGroup("Clinical", clinicalNavItems)}
        {renderNavGroup("Administration", adminNavItems)}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={profile?.avatar_url || ""} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {profile?.full_name ? getInitials(profile.full_name) : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">
              {profile?.full_name || "User"}
            </span>
            <span className="text-xs text-muted-foreground">{getRoleLabel()}</span>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
