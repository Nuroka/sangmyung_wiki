import { useState } from "react";

import CreateAccountId from "../../component/member/CreateAccountForm";
import EmailAuthForm from "../../component/member/EmailAuthForm";
import findIdAuthStyles from "../../component/member/FindIdForm.module.css";
import styles from "../../component/Login.module.css";

export default function CreateAccountIdPage() {
  const authUrls = {
    email: "/signin/email/1",
    code: "/signin/email/2",
  };

  const [email, setEmail] = useState();

  function handleEmailAuth(res) {
    setEmail(res.data.email);
  }

  return (
    <>
      <h2 className={styles.loginTitle}>
        <b>계정 만들기</b>
      </h2>
      {!email && (
        <EmailAuthForm authUrl={authUrls} handleResult={handleEmailAuth}>
          <br />
          <p>
            이메일 허용 목록이 활성화 되어 있습니다. 이메일 허용 목록에 존재하는
            메일만 사용할 수 있습니다.
          </p>
          <ul style={{ listStyleType: "disc" }}>
            <li>sangmyung.kr</li>
          </ul>
          <p>
            <b>가입후 탈퇴는 불가능합니다.</b>
          </p>
        </EmailAuthForm>
      )}
      {email && <CreateAccountId email={email} />}
    </>
  );
}
