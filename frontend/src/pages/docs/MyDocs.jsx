import { useState, useEffect } from "react";

import MyDocsList from "../../component/docs/MyDocsList";
import { authInstance } from "../../util/api";
import outlet from "../../layout/OutletLayout.module.css";
import PaginateBox from "../../component/PaginateBox";

/**
 * todo
 * pagination
 * loader
 */
export default function MyDocs() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    async function fetchData() {
      setError();
      const url = "/my-docs";
      authInstance
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
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const url = "/docs?id=" + id;
    setStatus(false);
    try {
      authInstance.post(url).then(function (res) {
        if (res.status === 200) {
          const newData = data.filter((data) => data.documents.id !== id);
          setData(newData);
          setStatus(true);
        } else {
          throw new Error();
        }
      });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <h2 className={outlet.title}>내 문서</h2>
      <br />
      {status && (
        <p>
          삭제 성공!
          <br />
        </p>
      )}
      {/* <PaginateBox limit={}/> */}
      <MyDocsList docs={data} handleDelete={handleDelete} />
      {!data && <p>로딩 중....</p>}
      {error && <p>{error.message}</p>}
    </>
  );
}
