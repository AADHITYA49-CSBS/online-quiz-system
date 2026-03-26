import { Navigate } from "react-router-dom";
import { getAuth } from "../lib/auth";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const auth = getAuth();

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && auth.role !== "ROLE_ADMIN") {
    return <Navigate to="/quizzes" replace />;
  }

  return children;
}

