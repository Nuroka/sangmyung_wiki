import { useState, useEffect } from "react";

import { authInstance } from "../../util/api";
import MyPageContent from "../../component/member/MyPageContent";
import outlet from "../../layout/OutletLayout.module.css";

export default function LoginPage() {
  const url = "/mypage";

  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setError();
      authInstance
        .post(url, {}, { withCredentials: true })
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
    fetchData();
  }, []);

  return (
    <>
      <h2 className={outlet.title}>내 정보</h2>
      {error && <p>{error.message}</p>}
      {data && <MyPageContent data={data} />}
    </>
  );
}
