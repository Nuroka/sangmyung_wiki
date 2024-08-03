import { useState } from "react";

import FindPwAuth from "../../component/member/FindPwAuth";
import FindPwAuthForm from "../../component/member/FindPwAuthForm";
import FindPwChangeForm from "../../component/member/FindPwChangeForm";
import FindPwResult from "../../component/member/FindPwResult";

export default function FindPW() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
  });
  const [step, setStep] = useState(0);

  function handleCheckId(form) {
    setFormData({
      ...formData,
      email: form.email,
      username: form.username,
    });
    setStep((prev) => prev + 1);
  }

  function handleStep(checked) {
    if (checked === true) {
      setStep((prev) => prev + 1);
    }
  }

  return (
    <>
      {step === 0 && <FindPwAuth handleResult={handleCheckId} />}
      {step === 1 && (
        <FindPwAuthForm data={formData} handleResult={handleStep} />
      )}
      {step === 2 && <FindPwChangeForm handleResult={handleStep} />}
      {step === 3 && <FindPwResult username={formData.username} />}
    </>
  );
}