import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useLogin from "./useLogin";

// 로그인 후에만 이용가능
export default function AuthRoute() {
  const isLogin = useLogin();

  return isLogin ? <Outlet /> : <Navigate replace to="/user" />;
}
