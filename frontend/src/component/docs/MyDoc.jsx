import { useNavigate } from "react-router-dom";

import { parseDate } from "../../util/parse";
import styles from "./MyDoc.module.css";

export default function MyDoc({ doc, handleDelete }) {
  const navigate = useNavigate();

  return (
    <tr className={styles.tr}>
      <td
        onClick={() => {
          navigate("/docs/" + doc.id);
        }}
        className={styles.title}
      >
        &bull; {doc.title}
      </td>
      <td className={styles.create}>{parseDate(doc.create_at)}</td>
      <td className={styles.delete}>
        <button
          onClick={() => handleDelete(doc.id)}
          className={styles.deleteBtn}
        >
          삭제
        </button>
      </td>
    </tr>
  );
}
