import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireStaff?: boolean;
  allowStudent?: boolean;
}

export function ProtectedRoute({ children, requireStaff = true, allowStudent = false }: ProtectedRouteProps) {
  const { user, isLoading, isStaff, hasRole, roles } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isStudent = hasRole("student");

  if (isStudent && allowStudent) return <>{children}</>;
  if (isStudent && !allowStudent) return <Navigate to="/student" replace />;

  // If user has no roles yet, redirect to landing instead of showing "pending"
  if (requireStaff && !isStaff()) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
}

export function StudentRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, hasRole, roles } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isStudent = hasRole("student");
  if (!isStudent) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
