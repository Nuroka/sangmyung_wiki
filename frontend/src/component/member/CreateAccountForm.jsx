import { useState } from "react";
import { defaultInstance } from "../../util/api";
import styles from "../Login.module.css";
import findIdAuthStyles from "./FindIdForm.module.css";
import { useNavigate } from "react-router-dom";
import { isEqualsToOtherValue, isPassword, isUserName } from "../../util/validations";

/**
 * todo
 * 아이디 중복 체크
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

  const [globalError, setGlobalError] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [duplicated, setDuplicated] = useState(true);

  const validUsername = isUserName(formData.username);
  const validPassword = isPassword(formData.password);
  const isSame = isEqualsToOtherValue(formData.password, confirmPassword);
  const isValid = validUsername && validPassword && isSame && !duplicated;

  async function handleSubmit(event) {
    event.preventDefault();
    setGlobalError();
    defaultInstance
      .post(url, { ...formData })
      .then(function (res) {
        if (res.status === 200) {
          navigate("signin/created", {
            state: { username: formData.username },
            replace: true,
          });
        } else {
          throw new Error();
        }
      })
      .catch(function (e) {
        setGlobalError({ message: "아이디와 비밀번호를 확인해주세요." });
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

  async function handleDuplicate(event) {
    event.preventDefault();
    setGlobalError();
    defaultInstance
      .post("/authId", formData.email)
      .then(function (res) {
        if (res.status === 200) {
          setDuplicated(false);
        } else {
          throw new Error();
        }
      })
      .catch(function (e) {
        setGlobalError({ message: "아이디와 비밀번호를 확인해주세요." });
        console.log(e);
      });
  }

  return (
    <div className={`${styles.loginDiv} ${styles.loginD}`}>
      <form id="form" onSubmit={handleSubmit}>
        <div>
          {globalError && <p>{globalError.message}</p>}
          <label htmlFor="username">사용자 ID</label>
          <br />
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            disabled={!duplicated}
            autocomplete="on"
          />
        </div>
        {!validUsername && <p>알파벳,숫자 조합만 가능합니다.</p>}
        <button
          className={`${styles.link} ${findIdAuthStyles.findIdFormBtn} ${findIdAuthStyles.checkBtn}`}
          onClick={handleDuplicate}
          disabled={!duplicated}
        >
          {duplicated ? "중복확인" : "확인완료"}
        </button>
        <br />
        <div>
          <label htmlFor="password">암호</label>
          <br />
          <input type="password" id="password" value={formData.password} onChange={handleChange} />
        </div>
        {!validPassword && <p>대,소문자/숫자/특수기호 조합으로 설정해 주시기바랍니다.</p>}
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
        <br />
        <p>가입 후 탈퇴는 불가능합니다.</p>
        <button
          className={`${findIdAuthStyles.findIdFormBtn} ${findIdAuthStyles.checkBtn}`}
          type="submit"
          disabled={!isValid}
        >
          <p className={`${styles.link} ${styles.loginBtn}`}>{isValid ? "가입" : "가입 불가"}</p>
        </button>
      </form>
    </div>
  );
}
