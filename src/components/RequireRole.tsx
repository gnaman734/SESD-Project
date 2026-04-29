import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthState, useAuthStore } from "../stores/authStore";
import { UserRole } from "../types/domain";

type RequireRoleProps = {
  role: UserRole;
  children: ReactNode;
};

const RequireRole = ({ role, children }: RequireRoleProps) => {
  const location = useLocation();
  const isReady = useAuthStore((state: AuthState) => state.isReady);
  const user = useAuthStore((state: AuthState) => state.user);
  const currentRole = useAuthStore((state: AuthState) => state.role);

  if (!isReady) {
    return <div className="rounded-lg border bg-white p-6 text-sm">Checking access...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  if (currentRole !== role) {
    const fallbackRoute = currentRole === UserRole.ADMIN ? "/admin" : "/instructor";
    return <Navigate to={fallbackRoute} replace />;
  }

  return <>{children}</>;
};

export default RequireRole;
