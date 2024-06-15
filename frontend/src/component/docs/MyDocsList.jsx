import MyDoc from "./MyDoc";

export default function MyDocsList({ docs, handleDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>제목</th>
          <th>생성일</th>
          <th>삭제</th>
        </tr>
      </thead>
      {docs && (
        <tbody>
          {docs.map((doc, index) => (
            <MyDoc doc={doc.documents} handleDelete={handleDelete} key={index} />
          ))}
        </tbody>
      )}
    </table>
  );
}
