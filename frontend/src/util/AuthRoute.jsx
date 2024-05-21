import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { checkAuth } from "./auth";

// 로그인 후에만 이용가능
export default function AuthRoute() {
  const isLogin = checkAuth();
  const { pathname } = useLocation();

  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate replace to="/user" state={{ pathname }} />
  );
}
