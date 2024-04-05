import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { defaultInstance } from '../../util/api';

const CreateAccountId = () => {
  const url = "/member/save";
  
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    try {
      await defaultInstance.post(url, data).then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
      });
    } catch (error) {
    }
  }
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isUserIdAvailable, setIsUserIdAvailable] = useState(false);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };


  return (
    <div>
      <h2>계정 만들기</h2>
      <form id="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userIdInput">사용자 ID</label><br />
          <input
            type="text"
            id="userIdInput"
            value={userId}
            onChange={handleUserIdChange}
          />
        </div>
        <button>중복확인</button>
        <div>
          <label htmlFor="passwordInput">암호</label><br />
          <input
            type="password"
            id="passwordInput"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPasswordInput">암호 확인</label><br />
          <input
            type="password"
            id="confirmPasswordInput"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
      </form>
        <p>가입 후 탈퇴는 불가능합니다.</p>
        <button><NavLink to="/confirmEmail">가입</NavLink></button>
      </div>
  );
};

export default CreateAccountId;