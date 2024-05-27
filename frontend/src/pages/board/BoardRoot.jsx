import { Outlet } from "react-router-dom";
import styles from "../../component/Login.module.css"
function BoardRoot() {
  return (
    <>
      <h3 className={styles.loginTitle}>커뮤니티</h3>
      <Outlet />
    </>
  );
}

export default BoardRoot;
