import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DocsEditForm from "../../component/docs/DocsEditForm";
import { authInstance } from "../../util/api";

export default function CreateDoc() {
  const navigate = useNavigate();

  const [error, setError] = useState();

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
    </>
  );
}
