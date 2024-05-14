import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function FindIdResult({ username }) {
  return (
    <>
      <p>인증 완료!</p>
      <p>{username}</p>
      <NavLink to="/user">로그인</NavLink>
    </>
  );
}
