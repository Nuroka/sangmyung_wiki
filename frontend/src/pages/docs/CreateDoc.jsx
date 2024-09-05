import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserFile from "../../component/member/UserFile";
import DocsEditForm from "../../component/docs/DocsEditForm";
import { authInstance } from "../../util/api";

export default function CreateDoc() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [fileList, setFileList] = useState();

  useEffect(() => {
    async function fetchData() {
      authInstance
        .get("/mypage")
        .then(function (res) {
          if (res.status === 200) {
            setFileList(res.data.filelist);
          } else {
            throw new Error();
          }
        })
        .catch(function (e) {
          console.log(e);
        });
    }
    fetchData();
  }, []);

  const url = "/docs/create";

  const handleSubmit = (doc) => {
    if (doc.title == "") {
      setError("제목을 입력해주세요");
    } else if (doc.content == "") {
      setError("내용을 입력해주세요");
    } else {
      authInstance
        .post(url, { ...doc })
        .then(function (res) {
          if (res.status === 200) {
            navigate("/");
          } else {
            throw new Error();
          }
        })
        .catch(function (e) {
          setError(e.response.data.message);
        });
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <DocsEditForm onSubmit={handleSubmit} />
      {fileList && <UserFile fileList={fileList} />}
    </>
  );
}
