import React, { useEffect, useState } from "react";
import { authInstance } from "../../util/api";
import AddComment from "./AddComment";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import { useSearchParams } from "react-router-dom";
import boardStyles from "./Board.module.css";
import styles from "../Login.module.css";
import getMemberInfo from "./GetMemberInfo";


const BoardCommentList = ({ boardId, memberId }) => {
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

            }

        };
        fetchMemberInfo();
    }, []);

    useEffect(() => {
        getAllComments()
    }, []);


    // 해당 커뮤니티 글과 관련된 댓글 모두 가져오기
    const getAllComments = async () => {
        try {
            const res = await authInstance.get(`comment/board`, { params: { idx: boardId } });
            setBoardComments(res.data);
            console.log(res.data);
            setLoading(false);

        } catch (e) {
            if (e.response) {
                // 서버 응답이 있는 경우
                const message = e.response.data.message;
                setErrorMessage(message);
            } else {
                // 네트워크 요청 자체가 실패한 경우
                setErrorMessage("Network request failed");
            }
            setLoading(false);
        }
    }


    return (
        <div >
            {/*<p>댓글 작성</p>*/}
            <AddComment boardId={boardId} />
            {/*loading comments 는 없어도 될거같아요*/}
            <hr/>
            {boardComments ? (
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
                                boardComments.map((comment) => (
                                    <div key={comment.comment_id}>
                                        <strong><p>{comment.member_name}</p></strong>
                                        <p>{comment.content}</p>

                                        {memberId == comment.memberId && (
                                            <>
                                                <EditComment commentId={comment.comment_id} initialContent={comment.content} />
                                                <DeleteComment commentId={comment.comment_id} />
                                            </>
                                        )}

                                        <hr/>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            ) : null }
        </div>
    );
};

export default BoardCommentList;
