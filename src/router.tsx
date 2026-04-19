import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDuties from "./pages/AdminDuties";
import AdminExams from "./pages/AdminExams";
import AdminInstructors from "./pages/AdminInstructors";
import AdminRooms from "./pages/AdminRooms";
import InstructorDashboard from "./pages/InstructorDashboard";
import InstructorProfile from "./pages/InstructorProfile";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import SignupPage from "./pages/SignupPage";
import RequireRole from "./components/RequireRole";
import { UserRole } from "./types/domain";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        path: "admin",
        element: (
          <RequireRole role={UserRole.ADMIN}>
            <AdminDashboard />
          </RequireRole>
        ),
      },
      {
        path: "admin/duties",
        element: (
          <RequireRole role={UserRole.ADMIN}>
            <AdminDuties />
          </RequireRole>
        ),
      },
      {
        path: "admin/instructors",
        element: (
          <RequireRole role={UserRole.ADMIN}>
            <AdminInstructors />
          </RequireRole>
        ),
      },
      {
        path: "admin/exams",
        element: (
          <RequireRole role={UserRole.ADMIN}>
            <AdminExams />
          </RequireRole>
        ),
      },
      {
        path: "admin/rooms",
        element: (
          <RequireRole role={UserRole.ADMIN}>
            <AdminRooms />
          </RequireRole>
        ),
      },
      { path: "instructor", element: <InstructorDashboard /> },
      { path: "instructor/profile", element: <InstructorProfile /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
