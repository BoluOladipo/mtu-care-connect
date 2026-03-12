import { useEffect, useRef, useState } from "react";
import { X, AlertTriangle, Calendar, Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface BannerNotification {
  id: string;
  title: string;
  message: string;
  type: string;
}

export function NotificationBanner() {
  const [banner, setBanner] = useState<BannerNotification | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const shownIds = useRef(new Set<string>());

  useEffect(() => {
    const channel = supabase
      .channel("banner-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          const n = payload.new as any;
          if (shownIds.current.has(n.id)) return;
          shownIds.current.add(n.id);

          setBanner({
            id: n.id,
            title: n.title,
            message: n.message,
            type: n.type,
          });

          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setBanner(null);
          }, 5000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!banner) return null;

  const getIcon = () => {
    switch (banner.type) {
      case "appointment":
        return <Calendar className="h-5 w-5" />;
      case "missed":
      case "cancelled":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] animate-slide-in-right",
        "bg-primary text-primary-foreground shadow-lg"
      )}
    >
      <div className="container mx-auto flex items-center gap-3 px-4 py-3">
        {getIcon()}
        <div className="flex-1">
          <p className="text-sm font-semibold">{banner.title}</p>
          <p className="text-xs opacity-90">{banner.message}</p>
        </div>
        <button
          onClick={() => setBanner(null)}
          className="rounded-full p-1 hover:bg-primary-foreground/20 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
