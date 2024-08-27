import { useState } from "react";

import { defaultInstance } from "../../util/api";
import { isEmail } from "../../util/validations";

export default function FindPwAuth({ handleResult }) {
  const url = "/find/pw/1";

  const [formData, setFormData] = useState({
    email: "",
    username: "",
  });

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [emailChecked, setEmailChecked] = useState(false);
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
      .post(url, { ...formData })
      .then(function (res) {
        setIsFetching(false);
        if (res.status === 200) {
          setEmailChecked(true);
          handleResult({ ...formData });
        } else {
          throw new Error();
        }
      })
      .catch(function (e) {
        setIsFetching(false);
        setError({ message: e.response.data.message });
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
      {error && <p style={{ marginBottom: "1em" }}>{error.message}</p>}
      <form id="form" onSubmit={handleSubmitEmail}>
        <label>이메일</label>
        <br />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          disabled={isFetching || emailChecked}
          style={{
            border: emailError ? "2px red solid" : "",
          }}
        />
        <br />
        <br />
        <label>아이디</label>
        <br />
        <input type="text" name="username" onChange={handleChange} disabled={isFetching || emailChecked} />
        <button type="submit" disabled={isFetching || emailChecked}>
          {emailChecked ? "인증 완료" : isFetching ? "전송 중" : "전송"}
        </button>
      </form>
    </>
  );
}
