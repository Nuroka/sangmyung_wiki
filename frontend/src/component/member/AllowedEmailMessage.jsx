export default function AllowedEmailMessage() {
  return (
    <div>
      <br />
      <p>이메일 허용 목록이 활성화 되어 있습니다.</p>
      <p>이메일 허용 목록에 존재하는 메일만 사용할 수 있습니다.</p>
      <br />
      <ul style={{ listStyleType: "disc", marginLeft: "50px" }}>
        <li>sangmyung.kr</li>
      </ul>
      <br />
      <p>
        <b>가입 후 탈퇴는 불가능합니다.</b>
      </p>
    </div>
  );
}
