import { NavLink } from "react-router-dom";

export default function FindPwResult({ username }) {
  return (
    <>
      <p>{username}님의 비밀번호 변경이 완료되었습니다.</p>
      <NavLink to="/user">로그인</NavLink>
    </>
  );
}
