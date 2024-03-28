import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <>
      <NavLink className={`${styles.nav} ${styles.nav1}`} to="/">
        최근변경
      </NavLink>
      <NavLink className={`${styles.nav} ${styles.nav2}`} to="/">
        랜덤문서
      </NavLink>
      <NavLink className={`${styles.nav} ${styles.nav3}`} to="/board">
        커뮤니티
      </NavLink>
      <NavLink className={`${styles.nav} ${styles.nav4}`} to="/user">
        사용자 정보
      </NavLink>
    </>
  );
}
