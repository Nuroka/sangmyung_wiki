import { useState, useEffect } from "react";

import outlet from "../../layout/OutletLayout.module.css";

import { defaultInstance } from "../../util/api";
import DocsLog from "../../component/docs/DocsLog";
import PaginateBox from "../../component/PaginateBox";

export default function DocsLogPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(2);

  const url = "/docs/log";

  const testData = [
    {
      docs_id: 1,
      update_at: "2024-02-22",
      title: "title",
      log: "log",
    },
    {
      docs_id: 2,
      update_at: "2024-02-21",
      title: "title",
      log: "log2",
    },
    {
      docs_id: 3,
      update_at: "2024-02-20",
      title: "title",
      log: "log3",
    },
  ];

  useEffect(() => {
    async function fetchLogs() {
      // setError(null);
      // defaultInstance
      //   .get(url)
      //   .then(function (res) {
      //     if (res.status === 200) {
      setData(testData);
      //   } else {
      //     throw new Error();
      //   }
      // })
      // .catch(function (e) {
      //   setError({ message: "정보 가져오기 실패! 다시 시도해주세요." });
      // });
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
      <h2 className={outlet.title}>문서 역사</h2>
      <br />
      <PaginateBox
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
      <br />
      {error && <p>{error.message}</p>}
      {data && <DocsLog data={currentLogs} />}
    </>
  );
}
