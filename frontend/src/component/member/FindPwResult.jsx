import { useNavigate } from "react-router-dom";

import styles from "../Login.module.css";

export default function FindPwResult({ username }) {
  const navigate = useNavigate();

  return (
    <>
      <p>{username}님의 비밀번호 변경이 완료되었습니다.</p>
      <br />
      <button className={styles.link} onClick={() => navigate("/user")}>
        로그인
      </button>
    </>
  );
}
