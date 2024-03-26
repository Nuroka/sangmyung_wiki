import { Outlet } from "react-router-dom";

import Header from "../component/Header";
import Popular from "../component/Popular";
import Recent from "../component/Recent";

import styles from "./RootLayout.module.css";
import logo from "../img/logo.png";
import user from "../img/user.png";
import search from "../img/search.png";


function RootLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
          <img className={styles.logo} src={logo}/>
          <Header />
          <input className={styles.search} placeholder={"이곳에서 검색"}></input><img className={styles.searchIcon} src={search}/>
          <img className={styles.user} src={user} />
      </div>
      <div className={styles.item}>
        <Outlet />
      </div>
      <div className={styles.item}>
        <Popular />
      </div>
      <div className={styles.item}>
        <Recent />
      </div>
    </div>
  );
}

export default RootLayout;
