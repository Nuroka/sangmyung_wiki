import { useState } from "react";

import EmailAuthMessage from "./EmailAuthMessage";
import { defaultInstance } from "../../util/api";
import { isEmail } from "../../util/validations";

export default function EmailAuthForm({ authUrl, handleResult, children }) {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
  });

  const [emailChecked, setEmailChecked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [emailError, setEmailError] = useState(false);

  function handleSubmitEmail(event) {
    event.preventDefault();

    setError();
    setEmailError(false);

    if (!isEmail(formData.email)) {
      setEmailError(true);
      return;
    }

    setIsFetching(true);
    defaultInstance
      .post(authUrl.email, { ...formData })
      .then(function (res) {
        setIsFetching(false);
        if (res.status === 200) {
          setEmailChecked((prev) => !prev);
        } else {
          throw new Error();
        }
      })
      .catch(function (e) {
        setIsFetching(false);
        setError({ message: e.response.data.message });
      });
  }

  function handleSubmitCode(event) {
    event.preventDefault();

    setError();
    setIsFetching(true);
    defaultInstance
      .post(authUrl.code, { ...formData })
      .then(function (res) {
        setIsFetching(false);
        if (res.status === 200) {
          alert("인증 성공");
          handleResult(res);
        } else {
          throw new Error();
        }
      })
      .catch(function (e) {
        setIsFetching(false);
        setError({ message: "코드 인증 실패! 다시 시도해 주세요." });
        console.log(e);
      });
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "email") {
      setEmailError(false);
    }
  };

  return (
    <>
      {error && <p>{error.message}</p>}
      <form id="form" onSubmit={handleSubmitEmail}>
        <label>이메일</label>
        <br />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          disabled={emailChecked}
          style={{
            border: emailError ? "2px red solid" : "",
          }}
        />
        <button type="submit" disabled={emailChecked || isFetching}>
          {emailChecked ? "전송완료" : isFetching ? "전송 중" : "전송"}
        </button>
        {!emailChecked && <>{children}</>}
      </form>
      <br />
      {emailChecked && (
        <>
          <EmailAuthMessage email={formData.email} />
          <form id="form" onSubmit={handleSubmitCode}>
            <label htmlFor="code">인증번호</label>
            <br />
            <input type="text" name="code" onChange={handleChange} disabled={isFetching} />
            <button type="submit" disabled={isFetching}>
              {isFetching ? "인증 중..." : "인증"}
            </button>
          </form>
        </>
      )}
    </>
  );
}
