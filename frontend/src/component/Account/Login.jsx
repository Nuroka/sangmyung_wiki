import React, { useState } from 'react';

function Login() {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // 로그인 처리 로직
    console.log('Userid:', userid);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
  };

  const handleCreateAccount = () => {
    // 계정 생성 페이지로 이동하는 로직
    console.log('Navigate to create account page');
  };

  return (
    <div>
      <h2>로그인</h2>
      <div>
        <label htmlFor="userid">아이디:</label>
        <input
          type="text"
          id="userid"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="rememberMe">자동 로그인</label>
      </div>
      <div>
        <button onClick={handleCreateAccount}>계정 생성</button>
        <button onClick={handleLogin}>로그인</button>
      </div>
    </div>
  );
}

export default Login;
