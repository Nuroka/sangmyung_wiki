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
    member_id: 1,
    like: "",
    like_count:0
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedMemberId, setStoredMemberId] = useState(null);

  const getBoard = async () => {
    if (storedMemberId) {
      console.log("boardDetail: ", storedMemberId);
      try {
        const resp = await authInstance.get("/board/one", {
          params: {
            idx: searchParams.get("id"),
            member_id: storedMemberId,
          },
        });
        setBoard(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.error('Error fetching board details:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const memberId = localStorage.getItem("id");
    setStoredMemberId(memberId);
  }, []);

  useEffect(() => {
    getBoard();
  }, [storedMemberId]);

  if (loading) {
    return <div>Loading...</div>;
  }
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
          likes={board.like_count}
          likeState={board.like}
          memberId={board.member_id}
        />
      )}
      {/*<CommentList boardId={board.board_id} />*/}
    </div>
  );
};

export default BoardDetail;
