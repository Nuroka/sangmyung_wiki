import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <p>에러발생</p>
      <NavLink to="/">메인 페이지로</NavLink>
    </>
  );
}
