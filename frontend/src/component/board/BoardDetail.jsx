import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Board from './Board';
import Comment from './Comment';
import CommentForm from './CommentForm';
import {authInstance} from "../../util/api";
import { useSearchParams } from "react-router-dom";

const BoardDetail = () => {
  const id = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼냄.
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(['댓글 내용']);
  const [searchParams, setSearchParams] = useSearchParams();

  const getBoard = async () => {
    const resp = await (await authInstance.get("/board/one", {params : {id : searchParams.get("id")}})).data;
    setBoard(resp);
    setLoading(false);
  };
  const handleAddComment = (event) => {
    event.preventDefault();
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment(''); 
    }
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
          title={board.board_title}
          contents={board.content}
          createdBy={board.create_at}
        />
      )}
      {}
      <Comment comments={comments}/>
      {}
      <CommentForm 
         comment={comment}
         setComment={setComment}
         handleAddComment={handleAddComment}
       />
    </div>
  );
};

export default BoardDetail;