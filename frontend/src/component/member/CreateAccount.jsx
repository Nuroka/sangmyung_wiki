import React from 'react';

const CreateAccount = ({ userid }) => {
  return (
    <div>
      <h2>계정 만들기</h2>
      <p>
        환영합니다! {userid}님의 계정 생성이 완료되었습니다.</p>
    </div>
  );
};

export default CreateAccount;