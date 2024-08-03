import React, { useEffect, useState } from "react";
import { authInstance } from "../../util/api";
import AddComment from "./AddComment";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
//import AddReply from "./AddReply"; // 대댓글 추가 컴포넌트
//import EditReply from "./EditReply"; // 대댓글 수정 컴포넌트
//import DeleteReply from "./DeleteComment"; // 대댓글 삭제 컴포넌트
import { useSearchParams } from "react-router-dom";
import boardStyles from "./Board.module.css";
import styles from "../Login.module.css";
import getMemberInfo from "./GetMemberInfo";

const BoardCommentList = ({ boardId, storedMemberId }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [memberInfo, setMemberInfo] = useState(null);
    const [boardComments, setBoardComments] = useState([]);

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
        getAllComments()
    }, []);

    const getAllComments = async () => {
        try {
            const res = await authInstance.get(`comment/board`, { params: { idx: boardId } });
            setBoardComments(res.data.data);  // data를 바로 설정
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
    }

    return (
        <div>
            <AddComment parentId={null} boardId={boardId} storedMemberId={storedMemberId} />
            <hr/>
            {boardComments.length > 0 ? (
                <div className={boardStyles.bodyFont}>
                    {loading ? (
                        <h2>Loading...</h2>
                    ) : errorMessage ? (
                        <p>{errorMessage}</p>
                    ) : (
                        <div>
                            {boardComments.length == 0 ? (
                                <p>아직 댓글이 없습니다.</p>
                            ) : (
                                boardComments.map(({ parent, child }) => (
                                    <div key={parent.comment_id}>
                                        <strong><p>{parent.member_name}</p></strong>
                                        <p>{parent.content}</p>

                                        {storedMemberId == parent.member_id && (
                                            <>
                                                <EditComment commentId={parent.comment_id} initialContent={parent.content} boardId={boardId} storedMemberId={storedMemberId} />
                                                <DeleteComment commentId={parent.comment_id} boardId={boardId} storedMemberId={storedMemberId} />
                                            </>
                                        )}

                                        {/* 대댓글 표시 */}
                                        <div className={styles.replyContainer}>
                                            {child && child.map((reply) => (
                                                <div key={reply.comment_id} className={styles.reply}>
                                                    <strong><p>{reply.member_name}</p></strong>
                                                    <p>{reply.content}</p>

                                                    {storedMemberId == reply.member_id && (
                                                        <>
                                                            <EditComment commentId={parent.comment_id} initialContent={parent.content} boardId={boardId} storedMemberId={storedMemberId} parentId={parent.comment_id} />
                                                            <DeleteComment replyId={reply.comment_id} parentId={parent.comment_id} />
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <AddComment parentId={parent.comment_id} boardId={boardId} storedMemberId={storedMemberId} />

                                        <hr/>
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
