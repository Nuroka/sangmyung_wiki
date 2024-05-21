import { useState, useEffect } from "react";

import DocsDetail from "../../component/docs/DocsDetail";
import { authInstance } from "../../util/api";

export default function Doc() {
  const url = "/docs/recommend";

  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setError();
      authInstance
        .get(url)
        .then(function (res) {
          if (res.status === 200) {
            console.log(res.data);
            setData(res.data.documents);
          } else {
            throw new Error();
          }
        })
        .catch(function (e) {
          setError({ message: "정보 가져오기 실패! 다시 시도해주세요." });
        });
    }
    fetchData();
  }, []);

  return (
    <>
      {!data ? (
        <p>로딩 중...</p>
      ) : (
        <>{error ? <p>{error.message}</p> : <DocsDetail data={data} />}</>
      )}
    </>
  );
}
