import { useNavigate } from "react-router-dom";
import styles from "./FindAccount.module.css";

export default function FindAccount() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => {
          navigate("/findID");
        }}
      >
        계정 찾기
      </button>
      <button
        className={styles.button}
        onClick={() => {
          navigate("/findPW");
        }}
      >
        비밀번호 찾기
      </button>
    </div>
  );
}
