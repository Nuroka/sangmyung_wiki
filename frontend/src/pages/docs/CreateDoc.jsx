import { useNavigate } from "react-router-dom";

import DocsEditForm from "../../component/docs/DocsEditForm";
import { authInstance } from "../../util/api";

export default function CreateDoc() {
  const navigate = useNavigate();

  const url = "/docs/create";

  const handleSubmit = (doc) => {
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
        throw new Error();
      });
  };

  return <DocsEditForm onSubmit={handleSubmit} />;
}
