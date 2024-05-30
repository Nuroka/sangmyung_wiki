import React, { useState } from "react";
import { authInstance } from "../../util/api";
import boardStyles from "./Board.module.css";
import commentStyles from "./Comment.module.css"
import TextareaAutosize from 'react-textarea-autosize';

const EditComment = ({ commentId, initialContent, boardId}) => {
  const [content, setContent] = useState(initialContent);
  const [click, setClick] = useState(false);

  const handleEditComment = async () => {
    try {
      const response = await authInstance.put("/comment/edit", {
        comment_id: commentId,
        content: content
      });
      setClick(false); // 수정 후 readOnly를 다시 활성화
      window.alert("댓글 수정이 완료되었습니다");
    } catch (error) {
      console.error("실패", error);
    }
  };

  return (
      <div className={boardStyles.btnDiv}>
        <TextareaAutosize
            className={`${boardStyles.addCommentInput} ${commentStyles.updateComment}`}
            cacheMeasurements
            value={content}
            placeholder='수정'
            onChange={(e) => setContent(e.target.value)}
            readOnly={!click}
            minRows={1}
        />
      {/*<textarea*/}
      {/*    className={`${boardStyles.addCommentInput} ${commentStyles.updateComment}`}*/}
      {/*    value={content}*/}
      {/*    onChange={(e) => setContent(e.target.value)}*/}
      {/*    placeholder="수정"*/}
      {/*    readOnly={!click} // click 상태에 따라 readOnly 속성을 토글*/}
      {/*/>*/}
        <button
            className={`${commentStyles.updateCommentBtn} ${commentStyles.transparentButton}`}
            onClick={() => setClick(true)} // 클릭 시 수정 가능 상태로 변경
        >
          수정
        </button>
        <button
            className={`${commentStyles.updateCommentBtn} ${commentStyles.completeBtn}`}
            onClick={handleEditComment}
            style={{ display: click ? "block" : "none" }} // 수정 버튼 클릭 시에만 보이도록 설정
        >
          완료
        </button>
      </div>
  );
};

export default EditComment;
