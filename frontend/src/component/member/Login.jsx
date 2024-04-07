import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // 로그인 처리 로직
    console.log("Userid:", userid);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  return (
    <div className={`${styles.loginDiv} ${styles.loginD}`}>
      <h2 className={styles.loginTitle}>로그인</h2>
      <div className={styles.loginD}>
        <label htmlFor="userid">Username</label>
        <br />
        <input className={styles.loginInput}
          type="text"
          id="userid"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />
      </div>
      <div className={styles.loginD}>
        <label htmlFor="password">Password</label>
        <br />
        <input className={styles.loginInput}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.loginD}>
        <input className={`${styles.rememberMe}` }
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label className={styles.login} htmlFor="rememberMe">자동 로그인</label>
        <span> </span>
        <NavLink className={`${styles.link} ${styles.find}`} to="/findID">[아이디/비밀번호 찾기]</NavLink>
      </div>
      <div className={styles.loginD}>
        <button>
          <NavLink className={`${styles.loginBtn} ${styles.link}`} to="/createEmail">계정 생성</NavLink>
        </button>
        <button className={styles.link} onClick={handleLogin}>로그인</button>
      </div>
    </div>
  );
}

export default Login;
