import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Login.module.css";
import { authInstance } from "../../util/api";
import { useSearchParams } from "react-router-dom";
//import boardStyles from "./Board.module.css";
//import { ReactComponent as Like } from "../../img/like.svg";
//import BoardUpdate from "./BoardUpdate";
//import LikeBtn from "./Like";
//import BoardCommentList from "./BoardCommentList";
//import Comment from "./Comment";


const Board = ({ id, title, member_name, update_at, create_at, contents, likes }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const moveToUpdate = () => {
    navigate("/board/edit/" + id);
  };

  const deleteBoard = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await authInstance
        .delete(`board/delete`, { params: { id } })
        .then((res) => {
          alert("삭제되었습니다.");
          navigate("/board");
        });
    }
  };

  const moveToList = () => {
    navigate("/board");
  };


  return (
    <div className={`${styles.loginDiv} ${styles.loginD}`}>
      <div>
        <h2>{title}</h2>
        <h5>{create_at}</h5>
        <h5>{member_name}</h5>
        <hr />
        <p>{contents}</p>
        <h6>{likes}</h6> 
      </div>
      <div>
        <button className={styles.link} onClick={moveToUpdate}>
          수정
        </button>
        <button className={styles.link} onClick={deleteBoard}>
          삭제
        </button>
        <button className={styles.link} onClick={moveToList}>
          목록
        </button>
      </div>
    </div>
  );
};


export default Board;
