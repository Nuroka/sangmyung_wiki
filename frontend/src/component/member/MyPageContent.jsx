import { useNavigate } from "react-router-dom";
import UserFile from "./UserFile";

export default function MyPageContent({ data }) {
  const navigate = useNavigate();

  return (
    <>
      <p>사용자 이름</p>
      <p>&bull; {data.username}</p>
      <br />
      <p>이메일</p>
      <p>&bull; {data.email}</p>
      <br />
      <p>
        비밀번호
        <button style={{ marginLeft: "9vw" }} onClick={() => navigate("/member/update")}>
          비밀번호 변경
        </button>
      </p>
      <br />
      <UserFile fileList={data.filelist} />
    </>
  );
}
