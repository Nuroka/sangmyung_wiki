import { useNavigate } from "react-router-dom";

export default function DocsLog({ data }) {
  const navigate = useNavigate();

  const goToDocument = (id) => {
    navigate("/doc");
  };

  return (
    <div>
      {data.map((log, index) => (
        <p key={index}>
          &bull; {log.update_at} {log.title} {log.log} (
          <span onClick={() => goToDocument(log.docs_id)}>보기</span>)
        </p>
      ))}
    </div>
  );
}
