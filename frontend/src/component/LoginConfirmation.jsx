import { useNavigate } from "react-router-dom";

import { ReactComponent as InvisibleIcon } from "../img/invisible.svg";
import styles from "./LoginConfirmation.module.css";

export default function LoginConfirmation({ url, state }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(url, { state: state });
  };

  return (
    <div className={styles.container}>
      <InvisibleIcon />
      <p className={styles.p}>
        권한이 없는 접근입니다.
        <br />
        먼저 로그인을 해주세요.
      </p>
      <button onClick={handleLoginClick} className={styles.loginButton}>
        로그인
      </button>
    </div>
  );
}
