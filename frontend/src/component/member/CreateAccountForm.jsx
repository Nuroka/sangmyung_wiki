import { useState } from "react";
import { defaultInstance } from "../../util/api";
import styles from "../Login.module.css";
import findIdAuthStyles from "./FindIdForm.module.css";
import { useNavigate } from "react-router-dom";

/**
 * todo
 * 아이디 중복 체크
 * 비밀번호 검증
 * 뒤로가기 막기
 */
export default function CreateAccountId({ email }) {
  const navigate = useNavigate();

  const url = "/signin/ID";

  const [formData, setFormData] = useState({
    email: email,
    username: "",
    password: "",
    student_Id: email.split("@")[0],
    admin_Type: "",
  });

  const [confirmPassword, setConfirmPassword] = useState();
  const isSame = formData.password === confirmPassword;
  const isValid =
    isSame === true && formData.username !== "" && formData.password !== "";

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    defaultInstance
      .post(url, { ...formData })
      .then(function (res) {
        if (res.status === 200) {
          navigate("/created", {
            state: { username: formData.username },
            replace: true,
          });
        } else {
          throw new Error();
        }
      })
      .catch(function (e) {
        throw new Error();
      });
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div className={`${styles.loginDiv} ${styles.loginD}`}>
      <form id="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">사용자 ID</label>
          <br />
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        {/* <button
          className={`${styles.link} ${findIdAuthStyles.findIdFormBtn} ${findIdAuthStyles.checkBtn}`}
        >
          중복확인
        </button> */}
        <br />
        <div>
          <label htmlFor="password">암호</label>
          <br />
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="confirmPasswordInput">암호 확인</label>
          <br />
          <input
            type="password"
            id="confirmPasswordInput"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {!isSame && <p>암호가 다릅니다.</p>}
        <p>가입 후 탈퇴는 불가능합니다.</p>
        <button
          type="submit"
          disabled={!isValid}
          className={`${findIdAuthStyles.findIdFormBtn} ${findIdAuthStyles.checkBtn}`}
        >
          <p className={`${styles.link} ${styles.loginBtn}`}>
            {isValid ? "가입" : "가입 불가"}
          </p>
        </button>
      </form>
    </div>
  );
}
