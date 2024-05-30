import React, { useEffect, useState } from "react";
import { authInstance } from "../../util/api";
import AddComment from "./AddComment";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import { useSearchParams } from "react-router-dom";
import boardStyles from "./Board.module.css";
import styles from "../Login.module.css";
import getMemberInfo from "./GetMemberInfo";
import commentStyles from "./Comment.module.css";


const BoardCommentList = ({ boardId }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [memberInfo, setMemberInfo] = useState(null);

    const [boardComments, setBoardComments] = useState([
        {
            "comment_id": "1",
            "member_name": "1234",
            "content": "댓글 내용",
            "create_at": "댓글 생성 시간",
            "update_at": "댓글 수정 시간"
        },
        {
            "comment_id": "2",
            "member_name": "5678",
            "content": "다른 댓글 내용",
            "create_at": "다른 댓글 생성 시간",
            "update_at": "다른 댓글 수정 시간"
        }
    ]);

    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                const info = await getMemberInfo();
                setMemberInfo(info);
            } catch (error) {
                console.error("Error fetching member info:", error);
            }
        };
        fetchMemberInfo();
    }, []); // Empty dependency array ensures this effect runs only once

    useEffect(() => {
        getAllComments();
    }, []); // Empty dependency array ensures this effect runs only once

    const getAllComments = async () => {
        try {
            const res = await authInstance.get(`comment/board`, { params: { idx: boardId } });
            setBoardComments(res.data);
            setLoading(false);
        } catch (e) {
            if (e.response) {
                const message = e.response.data.message;
                setErrorMessage(message);
            } else {
                setErrorMessage("Network request failed");
            }
            setLoading(false);
        }
    };

    return (
        <div>
            {/*<AddComment boardId={boardId} />*/}
            {/*<hr />*/}
            {boardComments ? (
                <div className={boardStyles.bodyFont}>
                    {loading ? (
                        <h2>Loading...</h2>
                    ) : (
                        <div>
                            {boardComments.length === 0 ? (
                                <p>아직 댓글이 없습니다.</p>
                            ) : (
                                boardComments.map((comment) => (
                                    <div key={comment.comment_id} className={commentStyles.commentContainer}>
                                        <div className={commentStyles.box}>
                                            <span>{comment.member_name}</span>
                                            <span>{comment.create_at}</span>
                                        </div>
                                        {memberInfo && memberInfo.username === comment.member_name && (
                                            <>
                                                <EditComment commentId={comment.comment_id} initialContent={comment.content} boardId={boardId} />
                                                <DeleteComment commentId={comment.comment_id} />
                                            </>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            ) : null}
            <hr className={boardStyles.hrStyles}/>
            <AddComment boardId={boardId} />
        </div>
    );
};

export default BoardCommentList;
