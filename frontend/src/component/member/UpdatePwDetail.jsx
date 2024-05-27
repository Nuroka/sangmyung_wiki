import { useState } from "react";

import { authInstance } from "../../util/api";
import { useNavigate } from "react-router-dom";
import findIdAuthStyles from "./FindIdForm.module.css";
import styles from "../Login.module.css";
import { isPassword, isEqualsToOtherValue } from "../../util/validations";

export default function FindIdDetail() {
  const navigate = useNavigate();

  const url = "/member/update";

  const [globalError, setGlobalError] = useState();

  const [formData, setFormData] = useState({
    password: "",
    new_password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState();
  const isSame = isEqualsToOtherValue(formData.new_password, confirmPassword);
  const validPassword = isPassword(formData.new_password);
  const isValid = isSame && validPassword;

  async function handleSubmit(event) {
    event.preventDefault();
    setGlobalError();
    authInstance
      .post(url, { ...formData })
      .then(function (res) {
        if (res.status === 200) {
          navigate("/mypage", {
            replace: true,
          });
        } else {
          throw new Error();
        }
      })
      .catch(function (e) {
        setGlobalError({ message: "현재 비밀번호를 확인해주세요." });
        console.log(e);
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
    <>
      <h2 className={styles.loginTitle}>비밀번호 변경</h2>
      {globalError && <p>{globalError.message}</p>}
      <div className={`${styles.loginDiv} ${styles.loginD}`}>
        <form id="form" onSubmit={handleSubmit}>
          <label htmlFor="password">현재 비밀번호</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="new_password">변경할 비밀번호</label>
          <br />
          <span>
            <input
              type="password"
              id="new_password"
              value={formData.new_password}
              onChange={handleChange}
            />
            {!validPassword && (
              <p>대,소문자/숫자/특수기호 조합으로 설정해 주시기바랍니다.</p>
            )}
          </span>
          <br />
          <br />
          <label htmlFor="confirmPasswordInput">비밀번호 확인</label>
          <br />
          <input
            type="password"
            id="confirmPasswordInput"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!isSame && <p>암호가 다릅니다.</p>}
          <br />
          <br />
          <button
            className={`${findIdAuthStyles.findIdFormBtn} ${styles.link}`}
            type="submit"
            disabled={!isValid}
          >
            <p className={`${styles.link} ${styles.loginBtn}`}>
              {isValid ? "변경" : "변경 불가"}
            </p>
          </button>
        </form>
      </div>
    </>
  );
}
