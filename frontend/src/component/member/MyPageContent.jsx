import { useQuery } from "@tanstack/react-query";

import { authInstance } from "../../util/api";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import findIdAuthStyles from "./FindIdForm.module.css";

export default function MyPageContent() {
  const url = "/mypage";

  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["/mypage"],
    queryFn: async () => {
      const response = await authInstance.post(url);
      // Http Status Error handling
      return response.data;
    },
    select: (res) => {
      return {
        username: res.username,
        email: res.email,
        adminType: res.adminType,
        // skin
      };
    },
  });

  return (
    <>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          {isError && <p>{error.message}</p>}
          <h2>내 정보</h2>

          <p>사용자 이름</p>
          <p>{data.username}</p>
          <p>이메일</p>
          <p>{data.email}</p>
          <p>이메일 변경</p>
          <p>권한</p>
          <p>{data.adminType}</p>
          <p>비밀번호</p>
          <button className={`${styles.link} ${findIdAuthStyles.findIdFormBtn}`} onClick={() => navigate("/member/update")}>
            비밀번호 변경
          </button>
          <p>스킨</p>
          <select id="skin" name="skin">
            <option value="normal">밝은 테마</option>
            <option value="black">어두운 테마</option>
          </select>
        </>
      )}
    </>
  );
}
