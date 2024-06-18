import MyDoc from "./MyDoc";
import styles from "./MyDocsList.module.css";

export default function MyDocsList({ docs, handleDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={`${styles.th} ${styles.thFirst} ${styles.title}`}>
            제목
          </th>
          <th className={`${styles.th} ${styles.create}`}>생성일</th>
          <th className={`${styles.th} ${styles.thLast}`}></th>
        </tr>
      </thead>
      {docs && (
        <tbody>
          {docs.map((doc, index) => (
            <MyDoc
              doc={doc.documents}
              handleDelete={handleDelete}
              key={index}
            />
          ))}
        </tbody>
      )}
    </table>
  );
}
