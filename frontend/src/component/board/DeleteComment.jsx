import React from "react";
import { authInstance } from "../../util/api";
import boardStyles from "./Board.module.css";

const DeleteComment = ({ commentId, boardId, storedMemberId }) => {
  const handleDeleteComment = async () => {
    try {
        const response = await authInstance.delete(`/comment/delete?idx=${commentId}`);
        window.alert("댓글이 삭제되었습니다.")
        window.location.href = `/board/one?id=${boardId}&member_id=${storedMemberId}`;
    } catch (error) {
        console.error("실패", error);
    }
  };

  return (
    <button className={`${boardStyles.updateCommentBtn} ${boardStyles.deleteBtn}`} onClick={handleDeleteComment}>삭제</button>
  );
};

export default DeleteComment;
