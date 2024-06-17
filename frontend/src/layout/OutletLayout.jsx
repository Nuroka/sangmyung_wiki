import { Outlet } from "react-router-dom";
import styles from "./OutletLayout.module.css";

export default function OutletLayout({ title }) {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <Outlet />
    </div>
  );
}
