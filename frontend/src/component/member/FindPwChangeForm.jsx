import { useState } from "react";

import findIdAuthStyles from "./FindIdForm.module.css";
import styles from "../Login.module.css";

import { authInstance } from "../../util/api";
import { isPassword, isEqualsToOtherValue } from "../../util/validations";

export default function FindPwChangeForm({ uuid, handleResult }) {
  const url = "/find/pw/3";

  const [globalError, setGlobalError] = useState();

  const [formData, setFormData] = useState({
    pw: "",
    pw2: "",
    uuid: uuid,
  });

  const isSame = isEqualsToOtherValue(formData.pw, formData.pw2);
  const validPassword = isPassword(formData.pw);
  const isValid = isSame && validPassword;

  async function handleSubmit(event) {
    event.preventDefault();
    setGlobalError();
    authInstance
      .post(url, { ...formData })
      .then(function (res) {
        if (res.status === 200) {
          handleResult(true);
        } else {
          throw new Error();
        }
      })
      .catch(function (e) {
        setGlobalError({ message: "비밀번호를 확인해주세요." });
        console.log(e);
      });
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      {globalError && <p>{globalError.message}</p>}
      <div className={`${styles.loginDiv} ${styles.loginD}`}>
        <form id="form" onSubmit={handleSubmit}>
          <label htmlFor="new_password">변경할 비밀번호</label>
          <br />
          <span>
            <input type="password" id="pw" value={formData.pw} onChange={handleChange} />
            {!validPassword && <p>8글자 이상, 20글자 이하로 설정해주시기 바랍니다. 빈칸은 사용이 불가합니다.</p>}
          </span>
          <br />
          <br />
          <label htmlFor="confirmPasswordInput">비밀번호 확인</label>
          <br />
          <input type="password" id="pw2" value={formData.pw2} onChange={handleChange} />
          {!isSame && <p>암호가 다릅니다.</p>}
          <br />
          <br />
          <button className={`${findIdAuthStyles.findIdFormBtn} ${styles.link}`} type="submit" disabled={!isValid}>
            <p className={`${styles.link} ${styles.loginBtn}`}>{isValid ? "변경" : "변경 불가"}</p>
          </button>
        </form>
      </div>
    </>
  );
}
