import { useNavigate } from "react-router-dom";
import { parseDate } from "../../util/parse";

export default function DocsLog({ data }) {
  const navigate = useNavigate();

  const goToDocument = (content) => {
    navigate("/docs/log/detail", { state: content });
  };

  return (
    <div>
      {data.map((log, index) => (
        <p key={index}>
          &bull; {parseDate(log.update_at)} <span onClick={() => goToDocument(log.content)}>보기</span>
        </p>
      ))}
    </div>
  );
}
