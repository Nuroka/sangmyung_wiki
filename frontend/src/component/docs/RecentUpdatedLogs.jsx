import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authInstance } from "../../util/api";

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
      <h2>최근 변경 내역</h2>
      <button
        onClick={() => {
          url = "/docs/edit";
        }}
      >
        전체
      </button>
      <button
        onClick={() => {
          url = "/docs/edit?category=temp";
        }}
      >
        tempCategory
      </button>
      <table border="1">
        <thead>
          <th>항목</th>
          <th>수정자</th>
          <th>등록 시간</th>
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
