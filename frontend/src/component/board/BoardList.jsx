import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import boardStyles from "./Board.module.css";
import { parseDate } from "../../util/parse";
import { authInstance } from "../../util/api";
import styles from "../Login.module.css";
import BtnToggleComponent from "./ButtonToggleComponent";
import TextWithLimit from "./TextWithLimit";

const BoardList = () => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  const [memberId, setMemberId] = useState(null);

  const getBoardList = async () => {
    const resp = await authInstance.get("/board/all");
    setBoardList(resp.data);
    const pngn = resp.pagination;
    console.log(pngn);
  };

  // 게시글을 추천수 순으로 정렬하는 함수
  const sortBoardByLikes = () => {
    const sortedList = [...boardList].sort((a, b) => b.like_count - a.like_count);
    setBoardList(sortedList);
  };

  const moveToWrite = () => {
    navigate("/board/write");
  };

  useEffect(() => {
    getBoardList();
    const storedMemberId = localStorage.getItem("id");
    console.log(`Retrieved memberId: ${storedMemberId}`);
    setMemberId(storedMemberId);
    console.log(boardList);
  }, []);

  return (
    <div className={`${styles.loginDiv} ${styles.loginD}`}>
      <div>
        <div className={boardStyles.boardList}>
          <BtnToggleComponent parameter={"인기글"} onSortByLikes={sortBoardByLikes} />

          <button className={styles.link} onClick={moveToWrite}>
            글쓰기
          </button>
        </div>
        <div className={boardStyles.listName}>
          <span className={boardStyles.boardTitlePreview}>항목</span>
          <span className={boardStyles.properties}>추천수</span>
          <span className={boardStyles.properties}>등록 시간</span>
        </div>
        <hr className={boardStyles.hrSpacing} />
        <ul>
          {boardList.map((board) => (
            <li key={board.board_id} className={boardStyles.boardListContent}>
              <div className={boardStyles.boardTitlePreview}>
                <Link to={`/board/one?id=${board.board_id}&member_id=${board.member_id}`}>
                  <TextWithLimit text={board.board_title} maxLength={6} />
                </Link>
              </div>
              <span className={boardStyles.properties}>👍{board.like_count}</span>
              <span className={boardStyles.properties}>{parseDate(board.create_at)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BoardList;
