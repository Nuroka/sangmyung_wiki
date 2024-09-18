import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";
import logo from "../../img/logo.png";
import Search from "./Search";
import DropdownImageTrigger from "./DropdownImageTrigger";

export default function Header() {
  return (
    <nav>
      <NavLink to="/" className={styles.logo}>
        <img src={logo} alt="logo" />
      </NavLink>
      <NavLink
        to="/docs/recent"
        className={({ isActive }) =>
          isActive
            ? `${styles.nav} ${styles.recent} ${styles.active}`
            : `${styles.nav} ${styles.recent}`
        }
      >
        최근변경
      </NavLink>
      <NavLink
        to="/docs/recommend"
        className={({ isActive }) =>
          isActive
            ? `${styles.nav} ${styles.recommend} ${styles.active}`
            : `${styles.nav} ${styles.recommend}`
        }
      >
        랜덤문서
      </NavLink>
      <NavLink
        to="/board"
        className={({ isActive }) =>
          isActive
            ? `${styles.nav} ${styles.board} ${styles.active}`
            : `${styles.nav} ${styles.board}`
        }
      >
        커뮤니티
      </NavLink>
      <Search />
      <div className={styles.user}>
        <DropdownImageTrigger />
      </div>
    </nav>
  );
}
