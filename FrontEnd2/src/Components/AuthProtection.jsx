import { authStore } from "../stores/authStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function AuthProtection({ children }) {
  const { isLogin } = authStore();
  const location = useLocation();

  if (isLogin) {
    return <Outlet>{children}</Outlet>;
  } else {
    return (
      <Navigate to="sign-in" state={{ path: location.pathname }} replace />
    );
  }
}
