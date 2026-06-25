import { Navigate } from "react-router-dom";

export default function TeacherProtectedRoute({ children }) {
  const teacher = localStorage.getItem("teacher");

  if (!teacher) {
    return <Navigate to="/teacher-login" replace />;
  }

  return children;
}