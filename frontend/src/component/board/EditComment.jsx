import React, { useState } from "react";
import { authInstance } from "../../util/api";
import boardStyles from "./Board.module.css";

const EditComment = ({ commentId, initialContent, boardId }) => {
  const [content, setContent] = useState(initialContent);
  const [click, setClick] = useState(false);

  const handleEditComment = async () => {
    try {
      const response = await authInstance.put("/comment/edit", {
        comment_id: commentId,
        content: content
      });
      setClick(true);
      // window.alert("댓글 수정이 완료되었습니다");
      // // 이전 페이지로 돌아가기
      // window.location.href = `/board/one?id=${boardId}`;
    } catch (error) {
      console.error("실패", error);
    }
  };

  return (
    <div className={boardStyles.btnDiv}>
      {click ? (
      <textarea className={`${boardStyles.addCommentInput} ${boardStyles.updateComment}`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="수정"
      />) : null}
      <button className={boardStyles.updateCommentBtn} onClick={handleEditComment}>수정</button>
    </div>
  );
};

export default EditComment;
