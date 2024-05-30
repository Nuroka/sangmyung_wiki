import React from "react";
import { authInstance } from "../../util/api";
import commentStyles from "./Comment.module.css";
import boardStyles from "./Board.module.css";

const DeleteComment = ({ commentId }) => {
  const handleDeleteComment = async () => {
    try {
        const response = await authInstance.delete(`/comment?idx=${commentId}`);
    } catch (error) {
        console.error("실패", error);
    }
  };

  return (
    <button className={`${commentStyles.deleteBtn}`} onClick={handleDeleteComment}>삭제</button>
  );
};

export default DeleteComment;
