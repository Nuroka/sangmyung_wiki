import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../Login.module.css";
import { authInstance } from "../../util/api";

const BoardUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [board, setBoard] = useState({
    content: "",
  });

  const {content} = board; //비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const getBoard = async () => {
    try {
      const resp = await authInstance.get("/board/one", { params: { id } });
      setBoard(resp.data);
    } catch (error) {
      console.error("Error fetching board:", error);
    }
  };

  const updateBoard = async () => {
    await authInstance.post(`/board/edit`, board).then((res) => {   //post를 put으로 변경
      alert("수정되었습니다.");
      navigate("/board");
    });
  };

  const backToDetail = () => {
    navigate("/board");
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div>
      <div>
        <span>내용</span>
        <textarea
          name="content"
          cols="60"
          rows="50"
          value={content}
          onChange={onChange}
        ></textarea>
      </div>
      <br />
      <div>
        <button className={styles.link} onClick={updateBoard}>
          수정
        </button>
        <button className={styles.link} onClick={backToDetail}>
          취소
        </button>
      </div>
    </div>
  );
};

export default BoardUpdate;
