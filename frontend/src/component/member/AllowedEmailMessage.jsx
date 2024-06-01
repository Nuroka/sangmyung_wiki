export default function EmailAuthMessage({ email }) {
  return (
    <div>
      <br />
      <p>이메일 허용 목록이 활성화 되어 있습니다.</p>
      <p>이메일 허용 목록에 존재하는 메일만 사용할 수 있습니다.</p>
      <br />
      <ul style={{ listStyleType: "disc" }}>
        <li>sangmyung.kr</li>
      </ul>
      <br />
      <p>가입후 탈퇴는 불가능합니다.</p>
    </div>
  );
}
