import { useState, useEffect } from "react";

import { defaultInstance } from "../../util/api";

import outlet from "../../layout/OutletLayout.module.css";
import RecentEditedLog from "../../component/docs/RecentEditedLog";
import PaginateBox from "../../component/PaginateBox";

export default function RecentEdited() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(9);

  const url = "/docs/recent";

  useEffect(() => {
    async function fetchLogs() {
      setError(null);
      defaultInstance
        .get(url)
        .then(function (res) {
          if (res.status === 200) {
            setData(res.data);
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

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = data.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(data.length / logsPerPage);

  return (
    <>
      <h2 className={outlet.title}>최근 변경 내역</h2>
      {!data.length && <p>로딩 중....</p>}
      {error && <p>{error.message}</p>}
      {data && <RecentEditedLog currentLogs={currentLogs} />}
      <br />
      <PaginateBox
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </>
  );
}
