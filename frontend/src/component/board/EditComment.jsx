import React, { useState } from "react";
import { authInstance } from "../../util/api";
import boardStyles from "./Board.module.css";

const EditComment = ({ commentId, initialContent, boardId, storedMemberId, parentId, onEditComplete }) => {
    const [content, setContent] = useState(initialContent);

    const handleEditComment = async () => {
        try {
            const response = await authInstance.put("/comment/edit", {
                comment_id: commentId,
                content: content
            });
            window.alert("댓글 수정이 완료되었습니다");
            onEditComplete(); // 수정 완료 후 상위 컴포넌트에 알림
        } catch (error) {
            console.error("댓글 수정 실패:", error.response ? error.response.data : error.message);
            window.alert("댓글 수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className={boardStyles.btnDiv}>
            <textarea
                className={`${boardStyles.addCommentInput} ${boardStyles.updateComment}`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="수정 내용을 입력하세요"
            />
            <button className={boardStyles.editCompleteBtn} onClick={handleEditComment}>
                수정 완료
            </button>
        </div>
    );
};

export default EditComment;
