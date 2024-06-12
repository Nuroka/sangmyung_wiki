import React, { useEffect, useState } from "react";
import { authInstance } from "../../util/api";
import AddComment from "./AddComment";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import { useSearchParams } from "react-router-dom";
import CommentStyles from "./Comment.module.css";

const CommentList = ({ boardId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await (await authInstance.get(`/comments/board/one`,{params:{ idx: searchParams.get("id")},}));
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("실패", error);
    }
  };




  return (
    <div>
      <h3>Comments</h3>
      <AddComment boardId={boardId} />
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        comments.map((comment) => (
          <div className={CommentStyles.editCommentBtn} key={comment.comment_id}>
            {/*<p>{comment.content}</p>*/}
            <DeleteComment commentId={comment.comment_id} />
            <EditComment commentId={comment.comment_id} initialContent={comment.content} />
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;