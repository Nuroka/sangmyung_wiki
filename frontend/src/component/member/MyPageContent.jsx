import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authInstance } from "../../util/api";
import styles from "../Login.module.css";
import findIdAuthStyles from "./FindIdForm.module.css";

export default function MyPageContent() {
  const url = "/mypage";

  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setError();
      authInstance
        .post(url)
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

  const navigate = useNavigate();

  return (
    <>
      {!data ? (
        <p>로딩 중...</p>
      ) : (
        <>
          {error ? (
            <p>{error.message}</p>
          ) : (
            <>
              <h2 className={styles.loginTitle}>내 정보</h2>
              <p>사용자 이름</p>
              <p>{data.username}</p>
              <p>이메일</p>
              <p>{data.email}</p>
              <p>
                비밀번호
                <button
                  className={`${styles.link} ${findIdAuthStyles.findIdFormBtn}`}
                  onClick={() => navigate("/member/update")}
                >
                  비밀번호 변경
                </button>
              </p>
            </>
          )}
        </>
      )}
    </>
  );
}
