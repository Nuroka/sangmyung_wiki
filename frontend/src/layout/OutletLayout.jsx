import { Outlet } from "react-router-dom";
import styles from "../component/Login.module.css";

export default function OutletLayout({ title }) {
  return (
    <>
      <h3 className={styles.loginTitle}>{title}</h3>
      <Outlet />
    </>
  );
}
