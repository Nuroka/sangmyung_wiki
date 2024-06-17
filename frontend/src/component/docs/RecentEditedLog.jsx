import RecentEditedDocs from "./RecentEditedDocs";
import styles from "./RecentEditedLog.module.css";

export default function RecentUpdatedLogs({ currentLogs }) {
  return (
    <table className={styles.table}>
      <thead className={styles.th}>
        <tr>
          <th className={`${styles.recentTitle} ${styles.itemColumn}`}>항목</th>
          <th className={`${styles.recentTitle} ${styles.editorColumn}`}>
            수정자
          </th>
          <th className={`${styles.recentTitle} ${styles.timeColumn}`}>
            등록 시간
          </th>
        </tr>
      </thead>
      {currentLogs && (
        <tbody>
          {currentLogs.map((log, index) => (
            <tr key={index} className={styles.tb}>
              <RecentEditedDocs log={log} />
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}
