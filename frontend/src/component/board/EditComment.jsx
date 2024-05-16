import React, { useState } from "react";
import { authInstance } from "../../util/api";

const EditComment = ({ commentId, initialContent }) => {
  const [content, setContent] = useState(initialContent);

  const handleEditComment = async () => {
    try {
      const response = await authInstance.post("/comment/edit", {
        comment_id: commentId,
        content: content
      });
    } catch (error) {
      console.error("실패", error);
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="수정"
      />
      <button onClick={handleEditComment}>Save Changes</button>
    </div>
  );
};

export default EditComment;
