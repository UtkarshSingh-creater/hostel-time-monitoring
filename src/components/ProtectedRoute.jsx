import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuth = localStorage.getItem("AUTH");
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}
