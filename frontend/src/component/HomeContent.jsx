import React from 'react';
import { NavLink } from "react-router-dom";
import styles from "./Home.module.css";

export default function HomeContent() {
  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.title}>상명위키: 대문</h2>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>편집</button>
          <button className={styles.button}>역사</button>
          <button className={styles.button}>문서 추가</button>
        </div>
      </div>
      <hr className={styles.hr}/>
      <h2 className={styles.h2}>슴우들이 가꾸어 나가는 상명위키</h2>
      <div className={styles.h2}>가장 높은 곳에서 솟아, 가장 멀리까지 뻗을 샘물.<br />그 이름 상명이어라.</div>
      <hr className={styles.hr}/>
      
      <h2>테스트용 임시 링크</h2>
      <NavLink to="/file">파일</NavLink>
      <br />
      <NavLink to="/board">커뮤니티</NavLink>
      <br />
      <NavLink to="/docs/edit">문서 편집</NavLink>
      <br />
      <NavLink to="/user">로그인</NavLink>
      <br />
      <NavLink to="/findId">계정 찾기</NavLink>
      <br />
      <NavLink to="/mypage">마이페이지</NavLink>
      <br />
      <NavLink to="/member/update">비밀번호 변경 페이지</NavLink>
      <br />
      <NavLink to="/docs/edit">최근 변경 내역</NavLink>
      <br />
      <NavLink to="/error">오류 페이지</NavLink>
  </div>
  );
}
