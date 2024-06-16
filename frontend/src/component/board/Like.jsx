import React, { useState, useEffect } from 'react';
import boardStyles from "./Board.module.css";
import { getAuthToken } from "../../util/auth";
// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';
import { authInstance } from "../../util/api";

const LikeButton = ({ boardId, countLike, isLike, onAddLike }) => {
    const [liked, setLiked] = useState(isLike);
    const [likes, setLikes] = useState(countLike);
    const token = getAuthToken();
    console.log("islike init:", isLike);
    const [likeData, setLikeData] = useState({
        like: isLike, //사용자가 좋아요한 게시물이면 true, 아니면 false
        count: countLike
    });
    useEffect(() => {
        setLiked(isLike);
        setLikes(countLike);
    }, [isLike, countLike])

    const handleLike = async (e) => {
        e.preventDefault();
        if (localStorage.getItem("memberId") == null) {
            window.alert("로그인 후 이용해주세요.")
            return ;
        }

        const res = await authInstance.get(`/board/like`, { params: { idx: boardId } });
        const updatedLikeData = res.data;
        // 좋아요 상태와 개수 업데이트
        setLikeData(updatedLikeData);
        setLiked(updatedLikeData.like); //true이면 사용자가 좋아요를 눌러서 색이 빨간색으로 변하고 1증가
        console.log("서버에서 가져온 liked: ", liked)

        // 좋아요 개수 업데이트
        setLikes(prevLikes => updatedLikeData.like ? prevLikes + 1 : prevLikes - 1);// Update likes based on the previous state
        onAddLike();
    };


    return (
        <div className={boardStyles.likeBtn}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="24"
                height="24"
                onClick={handleLike}
                style={{
                    cursor: 'pointer',
                    fill: liked ? 'red' : 'gray',
                    // position: 'absolute',
                    marginTop: "20px",
                    left: "0"
                }}
            >
                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
            </svg>
            <span style={{ marginLeft: "30px" }}>좋아요 수: {likes}</span>
        </div>
    );
}

export default LikeButton;
