import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Login.module.css";
import { authInstance } from "../../util/api";
import { useSearchParams } from "react-router-dom";
import boardStyles from "./Board.module.css";
import { ReactComponent as Like } from "../../img/like.svg";
import BoardUpdate from "./BoardUpdate";
import LikeBtn from "./Like";
import CommentList from "./CommentList";
import BoardCommentList from "./BoardCommentList";
import AddComment from "./AddComment";


const Board = ({ id, title, member_name, update_at, create_at, contents, like_count, comments_count, is_like }) => {
  const navigate = useNavigate();
  const token = authInstance();
  console.log(like_count);
  console.log("is_like: ", is_like);
  const [boardCommentListKey, setBoardCommentListKey] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showUpdateForm, setShowUpdateForm] = useState(false); // 수정 폼을 보여줄지 여부를 관리하는 상태 추가
  const moveToUpdate = () => {
    setShowUpdateForm(true); // 수정 버튼을 클릭하면 수정 폼을 보여주도록 상태 변경
  };

  const [loginUser, setLoginUser] = useState();

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

  const handleAddComment = () => {
    // 새로운 댓글이 추가되면 BoardCommentList 컴포넌트를 다시 렌더링하기 위해 상태 업데이트
    setBoardCommentListKey(prevKey => prevKey + 1);
  };

  return (
      <div className={`${styles.loginDiv} ${styles.loginD} ${boardStyles.bodyFont}`}>
        <div>
          <hr/>
          <h3 className={boardStyles.subTitle}>{title}</h3>
          <span>{member_name}</span>
          <span className={boardStyles.createAt}>{create_at}</span>
          <hr/>
          {showUpdateForm ? ( // 수정 폼이 보이면 아래 코드 블록이 보이지 않도록 조건부 렌더링
              <BoardUpdate boardId={id} initialContent={contents}/> // 수정 폼
          ) : (
              <div> {/* 수정 폼이 보이지 않을 때 */}
                <div className={boardStyles.boardContent}>{contents}</div>
                <hr/>
                <div className={boardStyles.boardEditBtn}>
                  <button className={`${styles.link} `} onClick={moveToUpdate}>
                    수정
                  </button>
                  <button className={`${styles.link}`} onClick={deleteBoard}>
                    삭제
                  </button>
                  <button className={`${styles.link} `} onClick={moveToList}>
                    목록
                  </button>
                </div>
                <div className={boardStyles.commentAndLike}>
                  <div>댓글 {comments_count}</div> {/*댓글 수 백엔드 측에서 받아서 보여주기 */}
                  <LikeBtn boardId={id} countLike={like_count} isLike={is_like} />{/*해당 게시물에 좋아요를 눌렀는지 여부 판단 */}

                  {/*<AddComment boardId={id} />*/}
                  <div className={boardStyles.commentContainer}>
                    {/* 댓글 내용 */}
                  </div>
                  <hr/>
                </div>
                {/*<CommentList boardId={id} />*/}
                <BoardCommentList key={boardCommentListKey} boardId={id} onAddComment={handleAddComment} />
                {/*<hr/>*/}

              </div>

          )}
        </div>
      </div>

  );
};

export default Board;
