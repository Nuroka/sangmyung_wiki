import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import DocDetail from "../../component/docs/Doc";
import { defaultInstance } from "../../util/api";

export default function Doc() {
  const { state } = useLocation();

  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setError();
      let url = "/doc";
      url += state !== null ? "?id=" + state.id : "s/recommend";
      defaultInstance
        .get(url)
        .then(function (res) {
          if (res.status === 200) {
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
  }, [state]);

  return <>{!data ? <p>로딩 중...</p> : <>{error ? <p>{error.message}</p> : <DocDetail doc={data} />}</>}</>;
}
