import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DocDetail from "../../component/docs/Doc";
import { defaultInstance } from "../../util/api";

export default function Doc() {
  const { id } = useParams();

  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null);
        const url = id ? `/doc?id=${id}` : "/docs/recommend";
        const res = await defaultInstance.get(url);
        if (res.status === 200) {
          setData(res.data.documents);
        } else {
          throw new Error();
        }
      } catch (e) {
        setError({ message: "정보 가져오기 실패! 다시 시도해주세요." });
      }
    }
    fetchData();
  }, [id]);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data) {
    return <p>로딩 중...</p>;
  }

  return <DocDetail doc={data} />;
}
