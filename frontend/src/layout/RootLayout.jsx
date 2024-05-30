import { Outlet } from "react-router-dom";

import Header from "../component/header/Header";
import Popular from "../component/Popular";
import Recent from "../component/Recent";

import styles from "./RootLayout.module.css";

function RootLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Header />
      </div>
      <div className={styles.item}>
        <Outlet />
      </div>
      <div className={styles.item}>
        <Recent />
      </div>
      <div className={styles.item}>
        <Popular />
      </div>
    </div>
  );
}

export default RootLayout;
