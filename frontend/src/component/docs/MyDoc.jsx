import { useNavigate } from "react-router-dom";

export default function MyDoc({ doc, handleDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    handleDelete(doc.id);
  };

  return (
    <tr>
      <td
        onClick={() => {
          navigate("/doc", {
            state: { id: doc.id },
          });
        }}
      >
        {doc.title}
      </td>
      <td>{doc.create_at}</td>
      <td>
        <button onClick={handleClick}>삭제하기</button>
      </td>
    </tr>
  );
}
