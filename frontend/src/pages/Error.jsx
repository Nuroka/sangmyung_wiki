import { useRouteError, Link } from "react-router-dom";

import styles from "./Error.module.css";
import errorLogo from "../img/errorLogo.png";
import errorMsg from "../img/errorMsg.png";

export default function ErrorPage() {
  const error = useRouteError();

  let message = (
    <div>
      죄송합니다. 페이지를 찾을 수 없습니다.
      <br />
      존재하지 않는 주소를 입력하셨거나 요청하신 페이지의 주소가 변경, 삭제되어
      찾을 수 없습니다.
    </div>
  );

  return (
    <>
      <div className={styles.errorBox}>
        <img className={styles.errorLogo} src={errorLogo} alt="errorLogo" />
        <img className={styles.errorMsg} src={errorMsg} alt="errorMsg" />
        <p className={styles.errorMessage}>{message}</p>
      </div>
      <div className={styles.btn}>
        <Link to="/">
          <button className={styles.btnBox}>돌아가기</button>
        </Link>
      </div>
    </>
  );
}
