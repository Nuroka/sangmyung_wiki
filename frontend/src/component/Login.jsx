import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import styles from "./Login.module.css";

import { defaultInstance } from "../util/api";

export default function Login() {
  const url = "/user";
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [globalError, setGlobalError] = useState();
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    setGlobalError();
    defaultInstance
      .post(url, { ...formData })
      .then(function (res) {
        if (res.status === 200) {
          const accessToken = res.headers.get("Authorization");
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem("token", accessToken);
          navigate(state ? state.pathname : "/", { state: state?.state });
        } else {
          throw new Error();
        }
      })
      .catch(function (e) {
        setGlobalError({ message: "아이디와 비밀번호를 확인해주세요." });
        console.log(e);
      });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div className={`${styles.loginDiv} ${styles.loginD}`}>
      <h2 className={styles.loginTitle}>로그인</h2>
      {globalError && <p>{globalError.message}</p>}
      <LoginForm
        label="Username"
        type="text"
        id="username"
        value={formData.username}
        handleChange={handleChange}
      />
      <LoginForm
        label="Password"
        type="password"
        id="password"
        value={formData.password}
        handleChange={handleChange}
      />
      <div className={styles.loginD}>
        <input
          className={`${styles.rememberMe}`}
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label className={styles.login} htmlFor="rememberMe">
          자동 로그인
        </label>
        <span> </span>
        <NavLink className={`${styles.link} ${styles.find}`} to="/findID">
          [아이디/비밀번호 찾기]
        </NavLink>
      </div>
      <div className={styles.loginD}>
        <button>
          <NavLink className={`${styles.loginBtn} ${styles.link}`} to="/signin">
            계정 생성
          </NavLink>
        </button>
        <button className={styles.link} onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
}
