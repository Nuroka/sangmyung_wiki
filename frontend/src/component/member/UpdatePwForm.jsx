import { useState } from "react";
import { isPassword, isEqualsToOtherValue } from "../../util/validations";
import styles from "./UpdatePwForm.module.css";

export default function UpdatePwForm({ handleSubmit: onSubmit }) {
  const [formData, setFormData] = useState({
    password: "",
    new_password: "",
  });

  const [errors, setErrors] = useState({
    password: false,
    new_password: false,
    confirmPassword: false,
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const isSame = isEqualsToOtherValue(formData.new_password, confirmPassword);
  const validPassword = isPassword(formData.password) && isPassword(formData.new_password);
  const isValid = isSame && validPassword;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isValid) {
      setErrors({
        password: !isPassword(formData.password),
        new_password: !isPassword(formData.new_password),
        confirmPassword: !isSame,
      });
      return;
    }

    onSubmit({ ...formData });
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
    setErrors({
      ...errors,
      [event.target.id]: false,
    });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setErrors({
      ...errors,
      confirmPassword: false,
    });
  };

  return (
    <>
      <form id="form" onSubmit={handleSubmit}>
        <label htmlFor="password">현재 비밀번호</label>
        <br />
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className={`${styles.form} ${errors.password ? styles.error : ""}`}
          required
        />
        <br />
        <label htmlFor="new_password" className={styles.label}>
          변경할 비밀번호
        </label>
        <br />
        <input
          type="password"
          id="new_password"
          value={formData.new_password}
          onChange={handleChange}
          className={`${styles.form} ${errors.new_password ? styles.error : ""}`}
          required
        />
        <p>8글자 이상, 20글자 이하로 설정해주시기 바랍니다. 빈칸은 사용이 불가합니다.</p>
        <br />
        <label className={styles.label}>비밀번호 확인</label>
        <br />
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={`${styles.form} ${errors.confirmPassword ? styles.error : ""}`}
          required
        />
        {!isSame && <span>암호가 다릅니다.</span>}
        <br />
        <button className={styles.btn} type="submit">
          비밀번호 변경
        </button>
      </form>
    </>
  );
}
