import React, { useState } from "react";
import { authInstance } from "../../util/api";
import boardStyles from "./Board.module.css";

const AddComment = ({ boardId, onAddComment }) => {
    const [comment, setComment] = useState({
        board_id: boardId,
        content: ""
    });

    const { content } = comment;

    const onChange = (event) => {
        const { value } = event.target;
        setComment({
            ...comment,
            content: value,
        });
    };

    const handleAddComment = async () => {
        try {
            if (localStorage.getItem("memberId") == null){
                window.alert("로그인 후 이용해주세요.");
                return ;
            }
            await authInstance.post("/comment", comment);
            alert("댓글이 추가되었습니다.");
            onAddComment(comment); // 부모 컴포넌트로 새 댓글 추가 알림
            setComment({ ...comment, content: "" }); // 입력 필드 초기화

        } catch (error) {
            console.error("Error adding comment:", error);
            alert("댓글 추가 중 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <input
                className={`${boardStyles.addCommentInput} ${boardStyles.addCommentInput2}`}
                type="text"
                name="content"
                value={content}
                onChange={onChange}
                placeholder={"댓글을 작성해 주세요."}
            />
            <button
                className={`${boardStyles.addCommentBtn}`}
                onClick={handleAddComment}
                disabled={!content} // 댓글 내용이 비어있을 때 버튼 비활성화
            >
                댓글 작성
            </button>
        </div>
    );
};

export default AddComment;
