import React, { useEffect, useState } from "react";
import { authInstance } from "../../util/api";
import AddComment from "./AddComment";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import { useSearchParams } from "react-router-dom";

const CommentList = ({ boardId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedMemberId, setStoredMemberId] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    const memberId = searchParams.get("member_id");

    setSearchParams(id);
    setStoredMemberId(memberId);

    if (id && memberId) {
      fetchComments(id, memberId);
    } else {
      console.error("검색 매개변수가 없습니다");
      setLoading(false);
    }
  }, []);

  const fetchComments = async (id, memberId) => {
    try {
    console.log("id와 memberid:", id, memberId)
      const response = await (await authInstance.get(`/comment/board`,{params:{ idx: id},}));
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
          <div key={comment.comment_id}>
            <p>{comment.content}</p>
            <EditComment commentId={comment.comment_id} initialContent={comment.content} boardId={searchParams} />
            <DeleteComment commentId={comment.comment_id} />
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
