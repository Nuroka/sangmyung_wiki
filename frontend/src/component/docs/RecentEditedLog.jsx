import { useState, useEffect } from "react";

import RecentEditedDocs from "./RecentEditedDocs";
import { defaultInstance } from "../../util/api";
import styles from "../docs/Docs.module.css";

export default function RecentUpdatedLogs() {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const url = "/docs/recent";

  useEffect(() => {
    async function fetchLogs() {
      setError();
      defaultInstance
        .get(url)
        .then(function (res) {
          if (res.status === 200) {
            setData(res.data);
            console.log(res.data);
          } else {
            throw new Error();
          }
        })
        .catch(function (e) {
          setError({ message: "정보 가져오기 실패! 다시 시도해주세요." });
        });
    }
    fetchLogs();
  }, []);

  return (
    <>
      <h2 className={styles.recentTitle}>최근 변경 내역</h2>
      <br />
      <table className={styles.table}>
        <thead className={styles.th}>
          <tr>
            <th className={styles.recentTitle}>항목</th>
            <th className={styles.recentTitle}>수정자</th>
            <th className={styles.recentTitle}>등록 시간</th>
          </tr>
        </thead>
        {data && (
          <tbody>
            {data.map((log, index) => (
              <tr key={index} className={styles.tb}>
                <RecentEditedDocs log={log} />
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {!data && <p>로딩 중....</p>}
      {error && <p>{error.message}</p>}
    </>
  );
}
