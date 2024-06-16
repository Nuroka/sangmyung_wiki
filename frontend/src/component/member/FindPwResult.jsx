import { NavLink, useLocation } from "react-router-dom";

export default function FindPwResult() {
  const { state } = useLocation();

  return (
    <>
      <p>{state.username}님의 비밀번호 변경이 완료되었습니다.</p>
      <NavLink to="/user">로그인</NavLink>
    </>
  );
}
