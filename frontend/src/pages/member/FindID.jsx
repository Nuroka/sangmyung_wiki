import { useState } from "react";

import EmailAuthForm from "../../component/member/EmailAuthForm";
import FindIdResult from "../../component/member/FindIdResult";

export default function FindID() {
  const authUrls = {
    email: "/find/ID/1",
    code: "/find/ID/2",
  };

  const [username, setUsername] = useState("");

  function handleEmailAuth(res) {
    setUsername(res.data);
  }

  return (
    <>
      <h2>계정 찾기</h2>
      {!username && (
        <EmailAuthForm authUrl={authUrls} handleResult={handleEmailAuth} />
      )}
      {username && <FindIdResult username={username} />}
    </>
  );
}
