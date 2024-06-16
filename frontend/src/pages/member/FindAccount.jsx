import { useNavigate } from "react-router-dom";

export default function FindAccount() {
  const navigate = useNavigate();

  return (
    <>
      <h2>계정 / 비밀번호 찾기</h2>
      <button
        onClick={() => {
          navigate("/findID");
        }}
      >
        계정 찾기
      </button>
      <button
        onClick={() => {
          navigate("/findPW");
        }}
      >
        비밀번호 찾기
      </button>
    </>
  );
}
