import React, {useEffect, useState} from 'react';
import boardStyles from "./Board.module.css";
import {authInstance} from "../../util/api";

const LikeButton = ({ boardId, likeCount, likeState }) => {
    const [liked, setLiked] = useState(likeState);
    const [like, setLike] = useState(likeCount);




    // 좋아요 상태와 좋아요 수를 받아오는 함수
    const fetchLikeStatus = async () => {
        try {
            console.log("lickcount:", likeCount)
            const response = await authInstance.get(`/board/like?idx=${boardId}`);
            console.log(response.data)
            setLiked(response.data.like);
            setLike(response.data.count);
        } catch (error) {
            console.error("좋아요 상태를 가져오는 데 실패했습니다:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        setLike(likeCount);
        setLiked(likeState);

    }, []);
    return (
        <span className={boardStyles.likeBtn}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512"
                 width="24"
                 height="24"
                 onClick={fetchLikeStatus}
                 style={{ cursor: 'pointer', fill: liked ? 'red' : 'gray', }}
            >
                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
            </svg>
            <p>좋아요 수: {like}</p>
        </span>
    );
};

export default LikeButton;