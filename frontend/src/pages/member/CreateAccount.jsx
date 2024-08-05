import { useState } from "react";

import CreateAccountId from "../../component/member/CreateAccountForm";
import EmailAuthForm from "../../component/member/EmailAuthForm";
import AllowedEmailMessage from "../../component/member/AllowedEmailMessage";
import CreateAccountResult from "../../component/member/CreateAccountResult";

export default function CreateAccount() {
  const authUrls = {
    email: "/signin/email/1",
    code: "/signin/email/2",
  };

  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [step, setStep] = useState(0);

  function handleEmailAuth(res) {
    setEmail(res.data.email);
    setStep((prev) => prev + 1);
  }

  function handleAccountForm(username) {
    if (username !== null) {
      setUsername(username);
      setStep((prev) => prev + 1);
    }
  }

  return (
    <>
      {step === 0 && (
        <EmailAuthForm authUrl={authUrls} handleResult={handleEmailAuth}>
          <AllowedEmailMessage />
        </EmailAuthForm>
      )}
      {step === 1 && email && (
        <CreateAccountId email={email} handleResult={handleAccountForm} />
      )}
      {step === 2 && username && <CreateAccountResult username={username} />}
    </>
  );
}
