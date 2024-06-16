import { useState } from "react";
import { useLocation } from "react-router-dom";

import FindPwAuthForm from "../../component/member/FindPwAuthForm";
import FindPwChangeForm from "../../component/member/FindPwChangeForm";

export default function FindPWAuth() {
  const { state } = useLocation();

  const [authed, setAuthed] = useState(false);

  function handleEmailAuth(res) {
    if (res.status === 200) {
      setAuthed(true);
    }
  }

  return (
    <>
      {!authed && <FindPwAuthForm data={state} handleResult={handleEmailAuth} />}
      {authed && <FindPwChangeForm data={state} />}
    </>
  );
}
