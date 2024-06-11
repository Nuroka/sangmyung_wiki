import React, { useEffect, useState } from "react";
import { authInstance } from "../../util/api";
import AddComment from "./AddComment";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import commentStyles from "./Comment.module.css";

const BoardCommentList = ({ boardId, onAddComment }) => {
    const [boardComments, setBoardComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddCommentClicked, setIsAddCommentClicked] = useState(0);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await authInstance.get(`comment/board`, {params: {idx: boardId}});
                setBoardComments(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [boardId, isAddCommentClicked]); // 의존성 배열에 isAddCommentClicked 추가

    const handleAddComment = (newComment) => {
        // 새로운 댓글을 추가한 후 상태만 업데이트
        setIsAddCommentClicked(prev => prev + 1);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <AddComment boardId={boardId} onAddComment={handleAddComment} />
                    <hr />
                    {boardComments.length === 0 ? (
                        <p>No comments yet.</p>
                    ) : (
                        boardComments.map((comment) => (
                            <div key={comment.comment_id} className={commentStyles.commentContainer}>
                                <div className={commentStyles.box}>
                                    <span>{comment.member_name}</span>
                                    <span>{comment.create_at}</span>
                                </div>
                                <EditComment commentId={comment.comment_id} initialContent={comment.content} boardId={boardId} />
                                <DeleteComment commentId={comment.comment_id} />
                            </div>
                        ))
                    )}
                </>
            )}
        </div>
    );
};

export default BoardCommentList;
