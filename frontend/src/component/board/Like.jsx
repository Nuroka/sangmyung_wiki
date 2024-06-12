import React, { useState, useEffect } from 'react';
import boardStyles from "./Board.module.css";
import { getAuthToken } from "../../util/auth";
// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';
import { authInstance } from "../../util/api";

const LikeButton = ({ boardId, countLike, isLike }) => {
    const [liked, setLiked] = useState(isLike);
    const [likes, setLikes] = useState(countLike);
    const token = getAuthToken();
    console.log("islike init:", isLike);
    const [likeData, setLikeData] = useState({
        like: isLike,
        count: countLike
    });
    console.log("islik변하기전: " + isLike);

    // useEffect(() => {
    //     const socket = new SockJS('http://localhost:9090/board/like');
    //     const stompClient = Stomp.over(socket);
    //     const token = authInstance;
    //     const handleLikeMessage = (response) => {
    //         const newLikes = JSON.parse(response.body);
    //         setLikes(newLikes);
    //     };
    //
    //     stompClient.connect({ Authorization: `Bearer ${token}` }, () => {
    //         stompClient.subscribe('/topic/likes', handleLikeMessage);
    //     });
    //
    //     return () => {
    //         stompClient.disconnect();
    //     };
    // }, [token]); // token만을 의존성 배열에 남겨두고 liked는 제거

    const handleLike = async (e) => {
        e.preventDefault();
        if (localStorage.getItem("memberId") == null) {
            window.alert("로그인 후 이용해주세요.")
            return ;
        }

        const res = await authInstance.get(`/board/like`, { params: { idx: boardId } });
        console.log(res.data);
        setLikeData(res.data);
        setLiked(likeData.like)
        setLikes(likeData.count)
        // setLiked(!liked); // Update liked based on the previous state
        console.log("likecd: " + liked);
        setLikes(liked ? likes - 1 : likes + 1); // Update likes based on the previous state
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
