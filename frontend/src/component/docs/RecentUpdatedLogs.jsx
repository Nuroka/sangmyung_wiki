import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authInstance } from "../../util/api";
import styles from "../docs/Docs.module.css";
export default function RecentUpdatedLogs() {
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([{ member_id: "123", docs_id: 456 }]);
  const [error, setError] = useState();

  let url = "/docs/edit";

  useEffect(() => {
    async function fetchLogs() {
      setIsFetching(true);
      try {
        await authInstance.get(url).then((res) => {
          if (!res.ok) {
            throw new Error("error");
          }
          setData(res.data.docs);
          setIsFetching(false);
        });
      } catch (error) {
        setError(error);
        setIsFetching(false);
      }
    }
    fetchLogs();
  }, [url]);

  return (
    <>
      <h2 className={styles.recentTitle}>최근 변경 내역</h2>
      <div className={styles.btnDiv}>
        <button className={styles.whiteBtn}
          onClick={() => {
            url = "/docs/edit";
          }}
        >
          전체
        </button>
        <button className={styles.whiteBtn}
          onClick={() => {
            url = "/docs/edit?category=temp";
          }}
        >
          tempCategory
        </button>
        <button className={styles.whiteBtn}
          onClick={() => {
            url = "/docs/edit";
          }}
        >
          전체
        </button>
        <button className={styles.whiteBtn}
          onClick={() => {
            url = "/docs/edit";
          }}
        >
          전체
        </button>
        <button className={styles.whiteBtn}
          onClick={() => {
            url = "/docs/edit";
          }}
        >
          전체
        </button>
      </div>

      <table className={styles.table}>
        <thead className={styles.th} > 
          <th className={styles.recentTitle}>항목</th>
          <th className={styles.recentTitle}>수정자</th>
          <th className={styles.recentTitle}>등록 시간</th>
        </thead>
        {!isFetching && error && <p>{error.message}</p>}
        {!isFetching && <p>로딩 중...</p>}
        {isFetching && (
          <tbody>
            {data.map((docs) => (
              <tr>
                <td>{docs.member_id}</td>
                <td>{docs.docs_id}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
}
