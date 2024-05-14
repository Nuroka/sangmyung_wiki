export default function RecentEditedDocs({ log }) {
  return (
    <>
      <td>{log.id}</td>
      <td>{log.member_id}</td>
      <td>
        {log.create_at}
        <br />
        {log.update_at}
      </td>
    </>
  );
}
