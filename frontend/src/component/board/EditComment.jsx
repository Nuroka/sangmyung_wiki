import React, { useState } from "react";
import { authInstance } from "../../util/api";
import boardStyles from "./Board.module.css";

const EditComment = ({ commentId, initialContent, boardId, storedMemberId, parentId }) => {
  const [content, setContent] = useState(initialContent);
  const [click, setClick] = useState(false);
  console.log("boardId:", boardId, "storedMemberId: ", storedMemberId);

  const handleEditComment = async () => {
    try {
      if (click) {
        const response = await authInstance.put("/comment/edit", {
          comment_id: commentId,
          content: content
        });
        window.alert("댓글 수정이 완료되었습니다");
        setClick(false); // 수정이 완료되면 수정 모드를 종료
        // 이전 페이지로 돌아가기
        window.location.href = `/board/one?id=${boardId}&member_id=${storedMemberId}`;
      } else {
        setClick(true); // 수정 모드를 활성화
      }
    } catch (error) {
      console.error("댓글 수정 실패:", error.response ? error.response.data : error.message);
      window.alert("댓글 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
      <div className={boardStyles.btnDiv}>
        {click ? (
            <textarea
                className={`${boardStyles.addCommentInput} ${boardStyles.updateComment}`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="수정 내용을 입력하세요"
            />
        ) : null}
        <button className={boardStyles.updateCommentBtn} onClick={handleEditComment}>
          {click ? "수정 완료" : "수정"}
        </button>
      </div>
  );
};

export default EditComment;
