import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../member/Login.module.css";
import { authInstance } from '../../util/api';
import { useSearchParams } from "react-router-dom";

const Board = ({ id, title, contents, createdBy }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const moveToUpdate = () => {
    navigate('/board/edit/' + id);
  };

  const deleteBoard = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')){ 
      await authInstance.post(`board/delete`,{params : { id }}).then((res) => {
        alert('삭제되었습니다.');
        navigate('/board');
        //찾아보니까 post는 값을 넘겨줘야되는데 넘겨줄 값이 없다보니까 400 혹은 404에러가 발생하는 듯 함
        //delete할때 405
        //post할때 400
        //뒤에 원래대로 했을때 404에러
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