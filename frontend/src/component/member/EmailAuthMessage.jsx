export default function EmailAuthMessage({ email }) {
  return (
    <div>
      <p>
        메일({email}@sangmyung.kr)로 인증 메일을 전송했습니다. 메일함에 도착한 메일을 통해 인증을 완료해 주시기
        바랍니다.
      </p>
      <br />
      <p>간혹 메일이 도착하지 않은 경우가 있습니다. 이 경우, 스팸함을 확인해주시기 바랍니다.</p>
      <br />
      <p>인증 메일은 24시간 동안 유효합니다.</p>
      <br />
    </div>
  );
}
