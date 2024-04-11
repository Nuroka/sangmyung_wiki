import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "../member/Login.module.css";
import { authInstance } from '../../util/api';

const Board = ({ idx, title, contents, createdBy }) => {
  const navigate = useNavigate();

  const moveToUpdate = () => {
    navigate('/update/' + idx);
  };

  const deleteBoard = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      await authInstance.delete(`board/${idx}`).then((res) => {
        alert('삭제되었습니다.');
        navigate('/board');
      });
    }
  };

  const moveToList = () => {
    navigate('/board');
  };

  return (
    <div className={`${styles.loginDiv} ${styles.loginD}`}>
      <div>
        <h2>{title}</h2>
        <h5>{createdBy}</h5>
        <hr />
        <p>{contents}</p>
      </div>
      <div>
        <button className={styles.link} onClick={moveToUpdate}>수정</button>
        <button className={styles.link} onClick={deleteBoard}>삭제</button>
        <button className={styles.link} onClick={moveToList}>목록</button>
      </div>
    </div>
  );
};

export default Board;