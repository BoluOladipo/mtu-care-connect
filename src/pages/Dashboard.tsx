import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { LiveQueue } from "@/components/queue/LiveQueue";
import { TodayAppointments } from "@/components/dashboard/TodayAppointments";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import {
  Users,
  ClipboardList,
  Clock,
  Calendar,
  AlertTriangle,
  Pill,
} from "lucide-react";

const Dashboard = () => {
  return (
    <AppLayout title="Dashboard" subtitle="MTU Health Centre Overview">
      <div className="space-y-6">
        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard
            title="Patients Today"
            value={42}
            icon={Users}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="In Queue"
            value={8}
            icon={ClipboardList}
            variant="info"
          />
          <StatCard
            title="Avg. Wait Time"
            value="18 min"
            icon={Clock}
            variant="default"
            trend={{ value: 5, isPositive: false }}
          />
          <StatCard
            title="Appointments"
            value={24}
            icon={Calendar}
            variant="success"
          />
          <StatCard
            title="Low Stock Items"
            value={5}
            icon={AlertTriangle}
            variant="warning"
          />
          <StatCard
            title="Expiring Soon"
            value={3}
            icon={Pill}
            variant="warning"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Live Queue */}
          <LiveQueue compact />

          {/* Today's Appointments */}
          <TodayAppointments />
        </div>

        {/* Alerts Panel */}
        <AlertsPanel />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
