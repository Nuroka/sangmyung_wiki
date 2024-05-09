import { useState } from "react";
import { NavLink } from "react-router-dom";

import EmailAuthForm from "./EmailAuthForm";

/**
 * todo validation
 * Http Status Error handling
 */
export default function FindIdDetail() {
  const authUrls = {
    email: "/find/ID/1",
    code: "/find/ID/2",
  };

  const [username, setUsername] = useState("");

  function handleEmailAuth(res) {
    setUsername(res);
  }

  return (
    <>
      <h2>계정 찾기</h2>
      <div>
        {!username && (
          <>
            <EmailAuthForm authUrl={authUrls} handleResult={handleEmailAuth} />
          </>
        )}
        {username && (
          <>
            <p>인증 완료!</p>
            <p>{username}</p>
            <NavLink to="/user">로그인</NavLink>
          </>
        )}
      </div>
    </>
  );
}
