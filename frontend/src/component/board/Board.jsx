import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../Login.module.css";

import { parseDate } from "../../util/parse";
import { authInstance } from "../../util/api";
import { useSearchParams } from "react-router-dom";
import boardStyles from "./Board.module.css";
import { ReactComponent as Like } from "../../img/like.svg";
import BoardUpdate from "./BoardUpdate";
import LikeBtn from "./Like";
import CommentList from "./CommentList";
import BoardCommentList from "./BoardCommentList";
import AddComment from "./AddComment";

const Board = ({
  id,
  title,
  member_name,
  update_at,
  create_at,
  contents,
  likes,
  memberId,
  likeState,
  commentsCount,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showUpdateForm, setShowUpdateForm] = useState(false); // 수정 폼을 보여줄지 여부를 관리하는 상태 추가
  const [storeMemberId, setStoredMemberId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("id");
    console.log(id);
    setStoredMemberId(id);
  }, []);
  const moveToUpdate = () => {
    setShowUpdateForm(true); // 수정 버튼을 클릭하면 수정 폼을 보여주도록 상태 변경
  };

  const deleteBoard = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await authInstance.delete(`/board/delete`, { params: { id } }).then((res) => {
        alert("삭제되었습니다.");
        navigate("/board");
      });
    }
  };

  const moveToList = () => {
    navigate("/board");
  };

  return (
    <div className={`${styles.loginDiv} ${styles.loginD} ${boardStyles.bodyFont}`}>
      <div>
        <hr />
        <h3 className={boardStyles.subTitle}>{title}</h3>
        <div className={boardStyles.createContainer}>
          <span className={boardStyles.writer}>{member_name}</span>
          <span className={boardStyles.createAt}>{parseDate(create_at)}</span>
        </div>
        <hr />
        {showUpdateForm ? ( // 수정 폼이 보이면 아래 코드 블록이 보이지 않도록 조건부 렌더링
          <BoardUpdate boardId={id} initialContent={contents} memberId={storeMemberId} /> // 수정 폼
        ) : (
          <div>
            {" "}
            {/* 수정 폼이 보이지 않을 때 */}
            <div className={boardStyles.boardContent}>{contents}</div>
            <hr />
            {memberId == storeMemberId ? (
              <div className={boardStyles.boardEditBtn}>
                <button className={`${styles.link} `} onClick={moveToUpdate}>
                  수정
                </button>
                {/* <button className={`${styles.link}`} onClick={deleteBoard}>
                  삭제
                </button> */}
                <button className={`${styles.link} `} onClick={moveToList}>
                  목록
                </button>
              </div>
            ) : (
              <div className={boardStyles.boardEditBtn}>
                <button className={`${styles.link} `} onClick={moveToList}>
                  목록
                </button>
              </div>
            )}
            <div>
              <div className={boardStyles.countContainer}>
                <span>댓글 {commentsCount}</span> {/*댓글 수 백엔드 측에서 받아서 보여주기 */}
                <LikeBtn boardId={id} likeCount={likes} likeState={likeState} />
              </div>
              <AddComment boardId={id} />
              <div>{/* 댓글 내용 */}</div>
              <hr />
            </div>
            {/*<CommentList boardId={id} />*/}
            <BoardCommentList boardId={id} storedMemberId={storeMemberId} />
            {/*<hr/>*/}
            {/* <span className={boardStyles.createAt}>{parseDate(create_at)}</span> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
