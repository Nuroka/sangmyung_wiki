import React from "react";
import { authInstance } from "../../util/api";

const DeleteComment = ({ commentId }) => {
  const handleDeleteComment = async () => {
    try {
        const response = await authInstance.delete(`/comment?idx=${commentId}`);
    } catch (error) {
        console.error("실패", error);
    }
  };

  return (
    <button onClick={handleDeleteComment}>Delete Comment</button>
  );
};

export default DeleteComment;
