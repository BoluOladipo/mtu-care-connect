import { useState, useEffect } from "react";
import { Bell, Package, Clock, AlertTriangle, Calendar, Check, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { useNotifications, useMarkAllNotificationsRead, useMarkNotificationRead } from "@/hooks/useNotifications";

interface ComputedAlert {
  id: string;
  type: "low_stock" | "expiring_drug";
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
  isComputed: true;
}

interface DbNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
  isComputed: false;
}

type NotificationItem = ComputedAlert | DbNotification;

export function NotificationsDropdown() {
  const [computedAlerts, setComputedAlerts] = useState<ComputedAlert[]>([]);
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(true);
  const [dismissedAlertIds, setDismissedAlertIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem("dismissed-alert-ids");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const { data: dbNotifications = [], isLoading: isLoadingDb } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  useEffect(() => {
    fetchComputedAlerts();
  }, []);

  const fetchComputedAlerts = async () => {
    setIsLoadingAlerts(true);
    try {
      const alerts: ComputedAlert[] = [];

      const { data: drugs } = await supabase
        .from("drugs")
        .select("id, name, current_stock, minimum_stock, expiry_date, updated_at");

      if (drugs) {
        drugs
          .filter((d) => d.current_stock <= d.minimum_stock)
          .forEach((drug) => {
            alerts.push({
              id: `low-stock-${drug.id}`,
              type: "low_stock",
              title: "Low Stock Alert",
              message: `${drug.name} has only ${drug.current_stock} units remaining`,
              createdAt: new Date(drug.updated_at),
              read: false,
              isComputed: true,
            });
          });

        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);
        drugs
          .filter((d) => d.expiry_date && new Date(d.expiry_date) <= futureDate)
          .forEach((drug) => {
            alerts.push({
              id: `expiring-${drug.id}`,
              type: "expiring_drug",
              title: "Expiring Soon",
              message: `${drug.name} expires on ${new Date(drug.expiry_date!).toLocaleDateString()}`,
              createdAt: new Date(drug.updated_at),
              read: false,
              isComputed: true,
            });
          });
      }

      setComputedAlerts(alerts);
    } catch (error) {
      console.error("Error fetching computed alerts:", error);
    } finally {
      setIsLoadingAlerts(false);
    }
  };

  // Merge DB notifications with computed alerts
  const allNotifications: NotificationItem[] = [
    ...dbNotifications.map((n) => ({
      id: n.id,
      type: n.type,
      title: n.title,
      message: n.message,
      createdAt: new Date(n.created_at),
      read: n.read,
      isComputed: false as const,
    })),
    ...computedAlerts,
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const unreadCount = allNotifications.filter((n) => !n.read).length;
  const isLoading = isLoadingAlerts || isLoadingDb;

  const getIcon = (type: string) => {
    switch (type) {
      case "low_stock":
        return <Package className="h-4 w-4 text-warning" />;
      case "expiring_drug":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "appointment":
        return <Calendar className="h-4 w-4 text-primary" />;
      case "queue":
        return <Clock className="h-4 w-4 text-info" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleMarkAllRead = () => {
    // Mark DB notifications as read
    markAllRead.mutate();
    // Mark computed alerts as read (local state only)
    setComputedAlerts((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notification: NotificationItem) => {
    if (!notification.read && !notification.isComputed) {
      markRead.mutate(notification.id);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
              <Check className="mr-1 h-3 w-3" />
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : allNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Bell className="mb-2 h-8 w-8" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {allNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-3 p-3 transition-colors hover:bg-muted/50 cursor-pointer ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="mt-0.5">{getIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}