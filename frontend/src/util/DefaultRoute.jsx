import { Outlet } from "react-router-dom";

// 로그인 여부 상관 없는 Route
export default function DefaultRoute() {
  return <Outlet />;
}
