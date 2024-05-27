import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import styles from "./Doc.module.css";
import { checkAuth } from "../../util/auth";

import edit from "../../img/edit.png";
import lock from "../../img/lock.png";
import log from "../../img/log.png";
import create from "../../img/create.png";

export default function Doc({ doc }) {
  const navigate = useNavigate();

  const isLogin = checkAuth();

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>{doc.title}</h1>
        <div className={styles.buttons}>
          <button
            className={styles.edit}
            onClick={() => {
              navigate("/docs/edit", { state: doc });
            }}
          >
            <span>
              <img src={edit} alt="edit" />
              편집
              {!isLogin && <img src={lock} alt="lock" />}
            </span>
          </button>
          <button
            className={styles.log}
            onClick={() => {
              navigate("/docs/log", { state: doc });
            }}
          >
            <span>
              <img src={log} alt="log" />
              역사
            </span>
          </button>
          <button
            className={styles.create}
            onClick={() => {
              navigate("/docs/create");
            }}
          >
            <span>
              <img src={create} alt="create" />
              문서추가
            </span>
          </button>
        </div>
      </div>
      <p className={styles.update}>최근 수정 일자: {doc.update_at}</p>
      <br />
      <br />
      <div className={styles.content}>{parse(doc.content)}</div>
    </div>
  );
}
