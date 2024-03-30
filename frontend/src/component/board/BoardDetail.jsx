import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Board from './Board';
import Comment from './Comment';
import CommentForm from './CommentForm';

const BoardDetail = () => {
  const { idx } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼냄.
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(['댓글 내용']); 

  const getBoard = async () => {
    const resp = await (await axios.get(`//localhost:3000/board/${idx}`)).data;
    setBoard(resp.data);
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
          idx={board.idx}
          title={board.title}
          contents={board.contents}
          createdBy={board.createdBy}
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