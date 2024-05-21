import { useNavigate, useLocation } from "react-router-dom";

import DocsEditForm from "../../component/docs/DocsEditForm";
import { authInstance } from "../../util/api";

export default function EditDoc() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const url = "/docs/edit";

  const handleSubmit = (doc) => {
    authInstance
      .post(url, { content: doc.content, doc_id: state.id, fileName: {} })
      .then(function (res) {
        if (res.status === 200) {
          navigate("/");
        } else {
          throw new Error();
        }
      })
      .catch(function (e) {
        throw new Error();
      });
  };

  return <DocsEditForm onSubmit={handleSubmit} detail={state} edit={true} />;
}
