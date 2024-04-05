import React from 'react';

const ConfirmEmail = ({ email }) => {
  return (
    <div>
      <h2>계정 만들기</h2>
      <p>
        이메일({email}) 로 계정 생성 이메일 인증 메일을 전송했습니다.<br />
        메일함에 도착한 메일을 통해 계정 생성을 계속 진행해 주시기 바랍니다.</p>
      <ul>
        <li>간혹 메일이 도착하지 않는 경우가 있습니다. 이 경우, 스팸함을 확인해주시기 바랍니다.</li>
        <li>인증 메일은 24시간 동안 유효합니다.</li>
      </ul>
    </div>
  );
};

export default ConfirmEmail;