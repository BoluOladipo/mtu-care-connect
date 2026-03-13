import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings as SettingsIcon, Users, Shield, Bell, Calendar, CalendarDays, Database,
} from "lucide-react";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { UserManagement } from "@/components/settings/UserManagement";
import { RolesPermissions } from "@/components/settings/RolesPermissions";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { AppointmentSettings } from "@/components/settings/AppointmentSettings";
import { SystemSettings } from "@/components/settings/SystemSettings";
import { DoctorRoster } from "@/components/settings/DoctorRoster";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Settings = () => {
  return (
    <AppLayout title="Settings" subtitle="Configure system settings and manage users">
      <Tabs defaultValue="general" className="space-y-6">
        <ScrollArea className="w-full">
          <TabsList className="inline-flex w-auto min-w-full lg:min-w-0">
            <TabsTrigger value="general" className="gap-2 whitespace-nowrap">
              <SettingsIcon className="h-4 w-4" />
              <span className="hidden xs:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2 whitespace-nowrap">
              <Users className="h-4 w-4" />
              <span className="hidden xs:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="roles" className="gap-2 whitespace-nowrap">
              <Shield className="h-4 w-4" />
              <span className="hidden xs:inline">Roles</span>
            </TabsTrigger>
            <TabsTrigger value="roster" className="gap-2 whitespace-nowrap">
              <CalendarDays className="h-4 w-4" />
              <span className="hidden xs:inline">Roster</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 whitespace-nowrap">
              <Bell className="h-4 w-4" />
              <span className="hidden xs:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="gap-2 whitespace-nowrap">
              <Calendar className="h-4 w-4" />
              <span className="hidden xs:inline">Appts</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-2 whitespace-nowrap">
              <Database className="h-4 w-4" />
              <span className="hidden xs:inline">System</span>
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value="general"><GeneralSettings /></TabsContent>
        <TabsContent value="users"><UserManagement /></TabsContent>
        <TabsContent value="roster"><DoctorRoster /></TabsContent>
        <TabsContent value="roles"><RolesPermissions /></TabsContent>
        <TabsContent value="notifications"><NotificationSettings /></TabsContent>
        <TabsContent value="appointments"><AppointmentSettings /></TabsContent>
        <TabsContent value="system"><SystemSettings /></TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Settings;
