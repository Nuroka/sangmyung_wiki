import { Link } from "react-router-dom";

import styles from "../Login.module.css";

export default function CreateAccountResult({ username }) {
  return (
    <div>
      <h2 className={styles.loginTitle}>계정 만들기</h2>
      <p>환영합니다! {username}님의 계정 생성이 완료되었습니다.</p>
      <Link to="/user">로그인</Link>
    </div>
  );
}
