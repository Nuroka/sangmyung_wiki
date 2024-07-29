import { ReactComponent as DeleteIcon } from "../../img/delete.svg";
import styles from "./DeleteConfirmation.module.css";

export default function DeletedConfirmation({ onConfirm }) {
  return (
    <div className={styles.container}>
      <DeleteIcon />
      <p className={styles.p}>문서가 삭제되었습니다.</p>
      <button onClick={onConfirm} className={styles.loginButton}>
        확인
      </button>
    </div>
  );
}
