import { useNavigate } from "react-router-dom";

import styles from "../Login.module.css";

export default function CreateAccountResult({ username }) {
  const navigate = useNavigate();

  return (
    <div>
      <p>환영합니다! {username}님의 계정 생성이 완료되었습니다.</p>
      <br />
      <button className={styles.link} onClick={() => navigate("/user")}>
        로그인
      </button>
    </div>
  );
}
