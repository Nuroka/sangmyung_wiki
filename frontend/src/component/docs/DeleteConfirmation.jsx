import { ReactComponent as DeleteIcon } from "../../img/delete.svg";
import styles from "./DeleteConfirmation.module.css";

export default function DeleteConfirmation({ onConfirm }) {
  return (
    <div className={styles.container}>
      <DeleteIcon />
      <p className={styles.p}>문서를 삭제하시겠습니까?</p>
      <button onClick={onConfirm} className={styles.loginButton}>
        삭제
      </button>
    </div>
  );
}
