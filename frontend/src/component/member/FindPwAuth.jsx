import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { defaultInstance } from "../../util/api";

export default function FindPwAuth() {
  const navigate = useNavigate();
  const url = "/find/pw/1";

  const [formData, setFormData] = useState({
    email: "",
    username: "",
  });

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  function handleSubmitEmail(event) {
    event.preventDefault();

    setError();
    setIsFetching(true);
    defaultInstance
      .post(url, { ...formData })
      .then(function (res) {
        if (res.status === 200) {
          navigate("/findPW/auth", {
            state: { ...formData },
          });
        } else {
          throw new Error();
        }
      })
      .catch(function (e) {
        setIsFetching(false);
        setError({ message: "정보 인증 실패! 다시 시도해 주세요." });
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
      <form id="form" onSubmit={handleSubmitEmail}>
        <label>이메일</label>
        <br />
        <input type="email" name="email" onChange={handleChange} disabled={isFetching} />
        <br />
        <br />
        <label>아이디</label>
        <br />
        <input type="text" name="username" onChange={handleChange} disabled={isFetching} />
        <button type="submit" disabled={isFetching}>
          {isFetching ? "전송 중" : "전송"}
        </button>
      </form>
    </>
  );
}
