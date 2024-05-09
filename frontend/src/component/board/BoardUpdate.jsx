import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../Login.module.css";
import { authInstance } from "../../util/api";

//해결했는데 api문서에 board_title은 없어 제목은 수정이 안됨
const BoardUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // /update/:id와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.

  const [board, setBoard] = useState({
    board_title: "",
    createdBy: "",
    content: "",
  });

  const { board_title, createdBy, content } = board; //비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target;
    console.log(`Updating ${name} to ${value}`);
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
    await authInstance.post(`/board/edit`, board).then((res) => {
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
        <span>제목</span>
        <input
          type="text"
          name="board_title"
          value={board_title}
          onChange={onChange}
        />
      </div>
      <br />
      <div>
        <span>작성자</span>
        <h5>{createdBy}</h5>
      </div>
      <br />
      <div>
        <span>내용</span>
        <textarea
          name="content"
          cols="30"
          rows="10"
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
