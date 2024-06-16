import React from "react";
import { authInstance } from "../../util/api";
import commentStyles from "./Comment.module.css";
import boardStyles from "./Board.module.css";

const DeleteComment = ({ boardId, commentId, onDelete, memberId }) => {
    const loginMemberId = localStorage.getItem("memberId");
  const handleDeleteComment = async () => {
    try {
        const response = await authInstance.delete(`/comment/delete?idx=${commentId}`);
        onDelete();
        // window.location.href = `/board/one?id=${boardId}`;
    } catch (error) {
        console.error("실패", error);
    }
  };
    // loginMemberId와 memberId가 일치할 때만 삭제 버튼을 보여줍니다.
    return (
        loginMemberId == memberId && (
            <button className={commentStyles.deleteBtn} onClick={handleDeleteComment}>
                삭제
            </button>
        )
    );
};


export default DeleteComment;
