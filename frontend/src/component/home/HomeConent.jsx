import { NavLink } from "react-router-dom";

export default function HomeContent() {
  return (
    <div>
      <h2>테스트용 임시 링크</h2>
      <NavLink to="/file">파일</NavLink>
      <br></br>
      <NavLink to="/board">커뮤니티</NavLink>
      <br></br>
      <NavLink to="/docs/edit">문서 편집</NavLink>
      <br></br>
      <NavLink to="/user">로그인</NavLink>
      <br></br>
      <NavLink to="/findId">계정 찾기</NavLink>
      <br></br>
      <NavLink to="/mypage">마이페이지</NavLink>
      <br></br>
      <NavLink to="/member/update">비밀번호 변경 페이지</NavLink>
      <br></br>
      <NavLink to="/docs/edit">최근 변경 내역</NavLink>
      <br></br>
      <NavLink to="/error">오류 페이지</NavLink>
    </div>
  );
}
