import React, { useEffect, useState } from "react";
import {useLocation, useParams} from "react-router-dom";
import Board from "./Board";
import { authInstance } from "../../util/api";
import { useSearchParams } from "react-router-dom";

const BoardDetail = () => {
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({
    board_id: "",
    board_title: "",
    member_name: "ex",
    update_at: "00-00-00",
    create_at: "00-00-00",
    content: "",
    like_count: "",
    like: false,
    comments_count: 0
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const memberId = localStorage.getItem("memberId");
  const getBoard = async () => {
    const resp = await (
      await authInstance.get("/board/one", {
        params: { idx: searchParams.get("id"), memberId: memberId },
      })
    ).data;
    setBoard(resp);
    console.log(resp);
    setLoading(false);
  };


  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Board
          id={board.board_id}
          title={board.board_title}
          member_name={board.member_name}
          update_at={board.update_at}
          create_at={board.create_at}
          contents={board.content}
          like_count={board.like_count}
          is_like={board.like}
          comments_count={board.comments_count}
        />
      )}
      {/*<CommentList boardId={board.board_id} />*/}
    </div>
  );
};

export default BoardDetail;
