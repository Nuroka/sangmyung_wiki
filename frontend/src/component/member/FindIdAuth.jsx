import { useState } from "react";
import { useLocation } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

import { defaultInstance } from "../../util/api";

/**
 * todo validation
 * Http Status Error handling
 */
export default function FindInstruction() {
  const location = useLocation();

  const email = location.state.email;
  const url = "/findID/auth";

  const [username, setUsername] = useState();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data) => {
      const response = await defaultInstance.post(url, data);
      // Http Status Error handling
      return response.data;
    },
    onSuccess: (res) => {
      setUsername(res.username);
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    mutate({ email, authCode: data.authCode });
  }

  return (
    <>
      <h2>계정 찾기</h2>
      <div>
        {!username ? (
          <>
            <p>
              메일({email})로 계정 찾기 인증 번호를 전송했습니다. 메일함에 도착한 메일을 통해 인증을 완료해 주시기
              바랍니다.
            </p>
            <p>간혹 메일이 도착하지 않는 경우가 있습니다. 이 경우, 스팸함을 확인 해주시기 바랍니다.</p>
            <p>인증 메일은 24시간 동안 유효합니다.</p>

            {isError && <p>{error.message}</p>}
            <form id="form" onSubmit={handleSubmit}>
              <p>
                <label htmlFor="authCode">인증번호</label>
                <input type="text" id="authCode" name="authCode" defaultValue="" disabled={username} />
              </p>
              <button type="submit" className="button" disabled={isPending || username}>
                {isPending ? "전송 중..." : "인증"}
              </button>
            </form>
          </>
        ) : (
          <>
            <p>아이디</p>
            <p>{username}</p>
            <NavLink to="/user">로그인</NavLink>
          </>
        )}
      </div>
    </>
  );
}
