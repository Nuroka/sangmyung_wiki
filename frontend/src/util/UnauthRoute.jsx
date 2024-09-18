import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react"; // useEffect를 import합니다.

import { checkAuth } from "./auth";

// 비로그인 상태에서만 접속 가능한 Route
export default function UnauthRoute() {
  const isLogin = checkAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      alert("로그인 상태에서는 이동이 불가능합니다.");
      navigate("/");
    }
  }, [isLogin, navigate]);

  return <Outlet />;
}
