import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth/auth_context";

export default function ProtectedRoutes() {
  const { cookies } = useAuth();
  return cookies.token ? <Outlet /> : <h3>Please log in to view your content</h3>;
}
