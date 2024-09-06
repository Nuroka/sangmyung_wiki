import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import DocsEditForm from "../../component/docs/DocsEditForm";
import { authInstance } from "../../util/api";
import UserFile from "../../component/member/UserFile";

export default function EditDoc() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      authInstance
        .get("/img-url")
        .then(function (res) {
          if (res.status === 200) {
            setFileList(res.data);
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

  const url = "/docs/edit";

  const handleSubmit = (doc) => {
    authInstance
      .put(url, { content: doc.content, doc_id: state.id, file: [] })
      .then(function (res) {
        if (res.status === 200) {
          navigate("/docs/" + state.id);
        } else {
          throw new Error();
        }
      })
      .catch(function (e) {
        alert(e.response.data.message);
        navigate("/docs/" + state.id);
      });
  };

  return (
    <>
      <DocsEditForm onSubmit={handleSubmit} detail={state} edit={true} />
      {fileList && <UserFile fileList={fileList} />}
    </>
  );
}
