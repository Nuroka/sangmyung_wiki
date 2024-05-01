import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";
import logo from "../img/logo.png";
import search from "../img/search.png";
import user from "../img/user.png";

export default function Header() {
  return (
    <>
      <NavLink to="/">
        <img className={styles.logo} src={logo} alt="logo" />
      </NavLink>
      <NavLink className={`${styles.nav} ${styles.nav1}`} to="/">
        최근변경
      </NavLink>
      <NavLink className={`${styles.nav} ${styles.nav2}`} to="/">
        랜덤문서
      </NavLink>
      <NavLink className={`${styles.nav} ${styles.nav3}`} to="/board">
        커뮤니티
      </NavLink>
      <input className={styles.search} placeholder={"이곳에서 검색"}></input>
      <img className={styles.searchIcon} src={search} alt="search" />
      <NavLink
        to="/user"
      >
        <img className={`${styles.nav} ${styles.nav4} ${styles.user}`} src={user} alt="user" />
      </NavLink>
    </>
  );
}
