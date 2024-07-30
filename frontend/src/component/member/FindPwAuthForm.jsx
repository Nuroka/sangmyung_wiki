import { useState } from "react";

import EmailAuthMessage from "./EmailAuthMessage";
import { defaultInstance } from "../../util/api";

export default function FindPwAuthForm({ data, handleResult }) {
  const url = "/find/pw/2";

  const [formData, setFormData] = useState({
    email: data.email,
    username: data.username,
    code: "",
  });

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  function handleSubmitCode(event) {
    event.preventDefault();

    setError();
    setIsFetching(true);
    defaultInstance
      .post(url, { ...formData })
      .then(function (res) {
        setIsFetching(false);
        if (res.status === 200) {
          alert("인증 성공");
          handleResult(true);
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
  };

  return (
    <>
      {error && <p>{error.message}</p>}
      <EmailAuthMessage email={formData.email} />
      <form id="form" onSubmit={handleSubmitCode}>
        <label htmlFor="code">인증번호</label>
        <br />
        <input
          type="text"
          name="code"
          onChange={handleChange}
          disabled={isFetching}
        />
        <button type="submit" disabled={isFetching}>
          {isFetching ? "인증 중..." : "인증"}
        </button>
      </form>
    </>
  );
}
