import React, { useEffect, useState } from "react";
import { authInstance } from "../../util/api";
import AddComment from "./AddComment";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import { useSearchParams } from "react-router-dom";
import boardStyles from "./Board.module.css";
import getMemberInfo from "./GetMemberInfo";

const BoardCommentList = ({ boardId, storedMemberId }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [memberInfo, setMemberInfo] = useState(null);
    const [boardComments, setBoardComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);

    // useEffect(() => {
    //     const fetchMemberInfo = async () => {
    //         try {
    //             const info = await getMemberInfo();
    //             setMemberInfo(info);
    //         } catch (error) {
    //             // 오류 처리
    //         }
    //     };
    //     fetchMemberInfo();
    // }, []);
    
    useEffect(() => {
        getAllComments();
    }, []);

    const getAllComments = async () => {
        try {
            const res = await authInstance.get(`comment/board`, { params: { idx: boardId } });
            setBoardComments(res.data.data); // data를 바로 설정
            console.log("chld: ", res.data.data);
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

    const handleEditClick = (commentId) => {
        setEditingCommentId(commentId); // 수정 모드 활성화
    };

    const handleEditComplete = () => {
        setEditingCommentId(null); // 수정 모드 종료
        getAllComments(); // 댓글 목록 갱신
    };

    return (
        <div>
            {boardComments.length > 0 ? (
                <div className={boardStyles.bodyFont}>
                    {loading ? (
                        <h2>Loading...</h2>
                    ) : errorMessage ? (
                        <p>{errorMessage}</p>
                    ) : (
                        <div>
                            {boardComments.length === 0 ? (
                                <p>아직 댓글이 없습니다.</p>
                            ) : (
                                boardComments.map(({ parent, child }) => (
                                    <div className={boardStyles.commentListContainer} key={parent.comment_id}>
                                        <div className={boardStyles.commentHeader}>
                                            <strong><p className={boardStyles.commentUserID}>{parent.member_name}</p></strong>
                                            {storedMemberId == parent.member_id && (
                                            <div className={boardStyles.commentActions}>
                                                <EditComment commentId={parent.comment_id} initialContent={parent.content} boardId={boardId} storedMemberId={storedMemberId} />
                                                <DeleteComment commentId={parent.comment_id} boardId={boardId} storedMemberId={storedMemberId} />
                                            </div>
                                            )}
                                        </div>
                                        <p className={boardStyles.commentText}>{parent.content}</p>
                                        <hr className={boardStyles.line}/>

                                        {/* 대댓글 표시 */}
                                        <div>
                                            {child && child.map((reply) => (
                                                <div className={boardStyles.replyContainer} key={reply.comment_id}>
                                                    <div className={boardStyles.commentHeader}>
                                                        <strong><p className={boardStyles.commentUserID}>{reply.member_name}</p></strong>
                                                        {storedMemberId == reply.member_id && (
                                                            <div className={boardStyles.commentActions}>
                                                                <EditComment commentId={parent.comment_id} initialContent={parent.content} boardId={boardId} storedMemberId={storedMemberId} parentId={parent.comment_id} />
                                                                <DeleteComment replyId={reply.comment_id} parentId={parent.comment_id} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className={boardStyles.commentText}>@{parent.member_name} {reply.content}</p>
                                                    <hr className={boardStyles.line}/>
                                                </div>
                                            ))}
                                        </div>
                                        <AddComment parentId={parent.comment_id} boardId={boardId} storedMemberId={storedMemberId} />
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default BoardCommentList;