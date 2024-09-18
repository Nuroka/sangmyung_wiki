import { useNavigate } from "react-router-dom";

import styles from "../Login.module.css";

export default function FindIdResult({ username }) {
  const navigate = useNavigate();

  return (
    <>
      <p>인증 완료!</p>
      <br />
      <p>{username}</p>
      <br />
      <button className={styles.link} onClick={() => navigate("/user")}>
        로그인
      </button>
    </>
  );
}
