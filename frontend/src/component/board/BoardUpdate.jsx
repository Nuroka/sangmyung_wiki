import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../Login.module.css";
import { authInstance } from "../../util/api";
import boardStyles from "./Board.module.css";

const BoardUpdate = ({ boardId, initialContent }) => {
  const [content, setContent] = useState(initialContent);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기

  const handleContentChange = (e) => {
    setContent(e.target.value);
    console.log(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authInstance.put("/board/edit", {
        board_id: boardId,
        content: content
      });
      console.log(response);

      if (response.status === 200) {
        // navigate(`/board/one?id=${boardId}`); // navigate 함수 사용
        window.alert("수정이 완료되었습니다");
        // 이전 페이지로 돌아가기
        window.location.href = `/board/one?id=${boardId}`;
      } else {

        console.error('게시글 수정 실패');
      }
    } catch (error) {
      console.error('server response error', error);
    }
  };
  const backToDetail = () => {
      navigate(`/board/one?id=${boardId}`);
  };

  useEffect(() => {
    // getBoard 함수 실행
  }, []);

  return (
      <div>
        <div>
        <textarea className={`${boardStyles.boardContent} ${boardStyles.subTitle}`}
                  name="content"
                  cols="60"
                  rows="20"
                  value={content}
                  onChange={handleContentChange}
        ></textarea>
        </div>
        <br />
        <div>
          <button className={styles.link} onClick={handleSubmit}>
            수정
          </button>
          {/* 취소 버튼은 필요하지 않은 경우 주석 처리 */}
           <button className={styles.link} onClick={backToDetail}>
          취소
        </button>
        </div>
      </div>
  );
};

export default BoardUpdate;
