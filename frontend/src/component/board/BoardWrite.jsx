import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authInstance } from '../../util/api';
import styles from "../member/Login.module.css";

const BoardWrite = () => {
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    board_title: '',
    //createdBy: '',
    content: '',
  });

  const { board_title, content } = board; //비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져오기
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const saveBoard = async () => {
    await authInstance.post(`/board`, board).then((res) => {
      alert('등록되었습니다.');
      navigate('/board');
    });
  };

  const backToList = () => {
    navigate('/board');
  };

  return (
    <div className={`${styles.loginDiv} ${styles.loginD}`}>
      <div>
        <span>제목</span>
        <input type="text" name="board_title" value={board_title} onChange={onChange} />
      </div>
      <div>
        <span>내용</span>
        <textarea
          name="content"
          cols="30"
          rows="10"
          value={content}
          onChange={onChange}
        ></textarea>
      </div>
      <br />
      <div>
        <button className={styles.link} onClick={saveBoard}>저장</button>
        <button className={styles.link} onClick={backToList}>취소</button>
      </div>
    </div>
  );
};

export default BoardWrite;