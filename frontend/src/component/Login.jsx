import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

import { defaultInstance } from "../util/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 처리 로직
    const tokenUrl = "/user";

    defaultInstance
      .post(tokenUrl, { username, password })
      .then(function (res) {
        console.log(res.headers);
        const accessToken = res.headers.get("Authorization");
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", accessToken);
        navigate("/");
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  return (
    <div className={`${styles.loginDiv} ${styles.loginD}`}>
      <h2 className={styles.loginTitle}>로그인</h2>
      <div className={styles.loginD}>
        <label htmlFor="username">Username</label>
        <br />
        <input
          className={styles.loginInput}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.loginD}>
        <label htmlFor="password">Password</label>
        <br />
        <input
          className={styles.loginInput}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          <NavLink
            className={`${styles.loginBtn} ${styles.link}`}
            to="/createEmail"
          >
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

export default Login;
