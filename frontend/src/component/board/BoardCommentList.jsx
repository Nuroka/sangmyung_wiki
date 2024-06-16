import React, { useEffect, useState } from "react";
import {authInstance, defaultInstance} from "../../util/api";
import AddComment from "./AddComment";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import commentStyles from "./Comment.module.css";
import boardStyles from "./Board.module.css";
import TextareaAutosize from "react-textarea-autosize";

const BoardCommentList = ({ boardId, onAddComment, commentCount, setCommentCount }) => {
    const [boardComments, setBoardComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddCommentClicked, setIsAddCommentClicked] = useState(0);
    const [newCommentCount, setNewCommentCount] = useState(commentCount)
    const [isDeleteCommentClicked, setIsDeleteCommentClicked] = useState(0);
    const loginMemberId = localStorage.getItem("memberId");

    const [content, setContent] = useState("");
    const [click, setClick] = useState(false);


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
    }, [boardId, isDeleteCommentClicked, isAddCommentClicked, commentCount]); // 의존성 배열에 isAddCommentClicked 추가

    const handleAddComment = async (newComment) => {
        // 새로운 댓글을 추가한 후 상태만 업데이트
        setIsAddCommentClicked(prev => prev + 1);
        // console.log("commentcount 반영전: ", isAddCommentClicked);
        const res = await defaultInstance.get(`/board/one?idx=${boardId}&memberId=${localStorage.getItem("memberId")}`);
        console.log(res.data);
        console.log(res.data.comments_count)
        setNewCommentCount(res.data.comments_count);
        console.log("commentcount 반영후: ",newCommentCount)

        // onAddComment(commentCount);
        console.log(newComment)

    };

    const handleDeleteComment = () => {
        // 새로운 댓글을 추가한 후 상태만 업데이트
        setIsDeleteCommentClicked(prev => prev + 1);
    };


    useEffect(() => {
        console.log(commentCount);
        onAddComment(newCommentCount);
    }, [newCommentCount]);


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
                                {/*{loginMemberId == comment.member_id && ( // 현재 사용자의 member_id와 comment의 member_id가 일치할 때만 렌더링*/}
                                    <>
                                        <EditComment commentId={comment.comment_id} initialContent={comment.content} boardId={boardId} memberId={comment.member_id} />
                                        <DeleteComment boardId={boardId} commentId={comment.comment_id} onDelete={handleDeleteComment} memberId={comment.member_id}/>
                                    </>
                                {/*)}*/}
                            </div>
                        ))
                    )}
                </>
            )}
        </div>
    );
};

export default BoardCommentList;
