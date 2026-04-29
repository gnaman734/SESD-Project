import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RequireRole from "./components/RequireRole";
import { UserRole } from "./types/domain";

const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminDuties = lazy(() => import("./pages/AdminDuties"));
const AdminExams = lazy(() => import("./pages/AdminExams"));
const AdminInstructors = lazy(() => import("./pages/AdminInstructors"));
const AdminRooms = lazy(() => import("./pages/AdminRooms"));
const InstructorDashboard = lazy(() => import("./pages/InstructorDashboard"));
const InstructorProfile = lazy(() => import("./pages/InstructorProfile"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SignupPage = lazy(() => import("./pages/SignupPage"));

const withSuspense = (element: React.ReactNode) => (
  <Suspense
    fallback={
      <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center px-6">
        <p className="text-sm text-on-surface-variant">Loading page...</p>
      </div>
    }
  >
    {element}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: withSuspense(<LoginPage />) },
      { path: "signup", element: withSuspense(<SignupPage />) },
      {
        path: "admin",
        element: withSuspense(
          <RequireRole role={UserRole.ADMIN}>
            <AdminDashboard />
          </RequireRole>
        ),
      },
      {
        path: "admin/duties",
        element: withSuspense(
          <RequireRole role={UserRole.ADMIN}>
            <AdminDuties />
          </RequireRole>
        ),
      },
      {
        path: "admin/instructors",
        element: withSuspense(
          <RequireRole role={UserRole.ADMIN}>
            <AdminInstructors />
          </RequireRole>
        ),
      },
      {
        path: "admin/exams",
        element: withSuspense(
          <RequireRole role={UserRole.ADMIN}>
            <AdminExams />
          </RequireRole>
        ),
      },
      {
        path: "admin/rooms",
        element: withSuspense(
          <RequireRole role={UserRole.ADMIN}>
            <AdminRooms />
          </RequireRole>
        ),
      },
      {
        path: "instructor",
        element: withSuspense(
          <RequireRole role={UserRole.INSTRUCTOR}>
            <InstructorDashboard />
          </RequireRole>
        ),
      },
      {
        path: "instructor/profile",
        element: withSuspense(
          <RequireRole role={UserRole.INSTRUCTOR}>
            <InstructorProfile />
          </RequireRole>
        ),
      },
    ],
  },
  { path: "*", element: withSuspense(<NotFound />) },
]);
