import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import boardStyles from "./Board.module.css";

import { authInstance } from "../../util/api";
import styles from "../Login.module.css";
import BtnToggleComponent from "./ButtonToggleComponent";
import TextWithLimit from "./TextWithLimit";

const BoardList = () => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);

  const getBoardList = async () => {
    const resp = await await authInstance.get("/board/all"); // 게시글 목록 데이터에 할당
    setBoardList(resp.data); // boardList 변수에 할당
    const pngn = resp.pagination;
    console.log(pngn);
  };

  const moveToWrite = () => {
    navigate("/write");
  };

  useEffect(() => {
    getBoardList(); // 게시글 목록 조회 함수 호출
  }, []);


  return (
      <div className={`${styles.loginDiv} ${styles.loginD}`}>
        <div>
          <div className={boardStyles.boardList}>
            <BtnToggleComponent parameter={"인기글"}/>

            <button className={styles.link} onClick={moveToWrite}>
              글쓰기
            </button>
          </div>
          <div className={boardStyles.listName}>
            <span className={boardStyles.boardTitlePreview}>항목</span>
            <span className={boardStyles.properties}>추천수</span>
            <span className={boardStyles.properties}>등록 시간</span>
          </div>
          <hr/>
          <ul>
            {boardList.map((board) => (
                // map 함수로 데이터 출력
                <li key={board} className={boardStyles.boardListContent}>
                <div
                    className={boardStyles.boardTitlePreview}>
                  <Link to={`/board/one?id=${board.board_id}`}>
                    {/*<span className={boardStyles.properties}>{board.board_title}</span>*/}
                    <TextWithLimit text={board.board_title} maxLength={6} />
                  </Link>
                </div>
                  <span className={boardStyles.properties}>👍{board.like_count}</span>
                  <span className={boardStyles.properties}>{board.create_at}</span>
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default BoardList;
