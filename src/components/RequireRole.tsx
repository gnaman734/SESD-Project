import { ReactNode } from "react";
import { AuthState, useAuthStore } from "../stores/authStore";
import { UserRole } from "../types/domain";

type RequireRoleProps = {
  role: UserRole;
  children: ReactNode;
};

const RequireRole = ({ role, children }: RequireRoleProps) => {
  const currentRole = useAuthStore((state: AuthState) => state.role);

  if (currentRole !== role) {
    return (
      <div className="rounded-lg border bg-white p-6 text-sm">
        Access denied. This area is restricted to {role} accounts.
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireRole;
