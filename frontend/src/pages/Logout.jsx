import { redirect, NavLink } from "react-router-dom";
import { removeAuthToken } from "../util/auth";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    // logout request axios
    removeAuthToken();
    redirect("/");
  }, []);

  return (
    <>
      <p>로그아웃 됨</p>
      <NavLink to="/">메인 페이지로</NavLink>
    </>
  );
}
