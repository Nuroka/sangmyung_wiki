import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { checkAuth } from "./auth";

// 로그인 후에만 이용가능
export default function AuthRoute() {
  const isLogin = checkAuth();

  return isLogin ? <Outlet /> : <Navigate replace to="/user" />;
}
