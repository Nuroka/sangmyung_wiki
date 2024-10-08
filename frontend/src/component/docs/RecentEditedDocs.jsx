import { useNavigate } from "react-router-dom";

import { parseDate } from "../../util/parse";
import { ReactComponent as DocIcon } from "../../img/doc.svg";

export default function RecentEditedDocs({ log }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/docs/" + log.documents.id);
  };

  return (
    <>
      <td onClick={handleClick}>
        {log.documents.title}
        &nbsp;
        <DocIcon />
      </td>
      <td>{log.member_username}</td>
      <td>{parseDate(log.documents.update_at)}</td>
      <br />
    </>
  );
}
