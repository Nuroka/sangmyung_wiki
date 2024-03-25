import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <NavLink to="/">최근변경</NavLink>
      <NavLink to="/">랜덤문서</NavLink>
      <NavLink to="/board">커뮤니티</NavLink>
    </>
  );
}
