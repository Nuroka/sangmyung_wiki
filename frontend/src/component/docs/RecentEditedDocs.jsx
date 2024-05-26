import { useNavigate } from "react-router-dom";

export default function RecentEditedDocs({ log }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/doc", {
      state: { id: log.documents.id },
    });
  };

  return (
    <>
      <td onClick={handleClick}>{log.documents.title}</td>
      <td>{log.member_username}</td>
      <td>
        {log.documents.create_at}
        <br />
        {log.documents.update_at}
      </td>
      <br />
    </>
  );
}
