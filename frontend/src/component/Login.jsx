import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

import { defaultInstance } from "../util/api";

export default function Login() {
  const url = "/user";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState();
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    setError();
    defaultInstance
      .post(url, { ...formData })
      .then(function (res) {
        if (res.status === 200) {
          const accessToken = res.headers.get("Authorization");
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem("token", accessToken);
          navigate("/");
        } else {
          throw new Error();
        }
      })
      .catch(function (e) {
        setError({ message: "아이디와 비밀번호를 확인해주세요." });
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
      {error && <p>{error.message}</p>}
      <div className={styles.loginD}>
        <label htmlFor="username">Username</label>
        <br />
        <input
          className={styles.loginInput}
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className={styles.loginD}>
        <label htmlFor="password">Password</label>
        <br />
        <input
          className={styles.loginInput}
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
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
