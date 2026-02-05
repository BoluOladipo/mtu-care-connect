import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireStaff?: boolean;
  allowStudent?: boolean;
}

export function ProtectedRoute({ children, requireStaff = true, allowStudent = false }: ProtectedRouteProps) {
  const { user, isLoading, isStaff, hasRole } = useAuth();
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

  // Check if user is a student
  const isStudent = hasRole("student");

  // If user is a student and this route allows students, allow access
  if (isStudent && allowStudent) {
    return <>{children}</>;
  }

  // If user is a student but route doesn't allow students, redirect to student portal
  if (isStudent && !allowStudent) {
    return <Navigate to="/student" replace />;
  }

  // For non-students, check if they need staff role
  if (requireStaff && !isStaff()) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Access Pending</h1>
          <p className="text-muted-foreground max-w-md">
            Your account is registered but you haven't been assigned a role yet. 
            Please contact an administrator to get access to the clinic system.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Wrapper for student-only routes
export function StudentRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, hasRole } = useAuth();
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

  // If user is staff (not student), redirect to main dashboard
  const isStudent = hasRole("student");
  if (!isStudent) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
