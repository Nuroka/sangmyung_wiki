import { useState } from "react";
import { useNavigate } from "react-router";
import UpdatePwForm from "../../component/member/UpdatePwForm";
import { authInstance } from "../../util/api";

export default function UpdatePw() {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const url = "/member/update";

  function handleSubmit(form) {
    authInstance
      .post(url, form)
      .then(function (res) {
        if (res.status === 200) {
          alert("변경 완료");
          navigate("/mypage", {
            replace: true,
          });
        } else {
          throw new Error();
        }
      })
      .catch(function (e) {
        setError({ message: "현재 비밀번호를 확인해주세요." });
      });
  }

  return (
    <>
      {error && <p style={{ marginBottom: "20px", color: "#ee3232" }}>{error.message}</p>}
      <UpdatePwForm handleSubmit={handleSubmit} />
    </>
  );
}
