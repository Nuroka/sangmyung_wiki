import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "../member/Login.module.css";
import { authInstance } from '../../util/api';

const BoardUpdate = () => {
  const navigate = useNavigate();
  const { board_id } = useParams(); // /update/:board_id와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
  const [board, setBoard] = useState({
    board_id: 0,
    //board_title: '',
    //createdBy: '',
    content: '',
  });

  const { board_title, content } = board; //비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져오기
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const getBoard = async () => {
    const resp = await (await authInstance.get(`/board/${board_id}`)).data;
    setBoard(resp.data);
  };

  const updateBoard = async () => {
    await authInstance.patch(`/board`, board).then((res) => {
      alert('수정되었습니다.');
      navigate('/board/' + board_id);
    });
  };

  const backToDetail = () => {
    navigate('/board/' + board_id);
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div>
      <div>
        {/* <span>제목</span>
        <input type="text" name="board_title" value={board_title} onChange={onChange} /> */}
      </div>
      <br />
      <div>
        {/* <span>작성자</span>
        <input type="text" name="createdBy" value={createdBy} readOnly={true} /> */}
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
        <button className={styles.link} onClick={updateBoard}>수정</button>
        <button className={styles.link} onClick={backToDetail}>취소</button>
      </div>
    </div>
  );
};

export default BoardUpdate;