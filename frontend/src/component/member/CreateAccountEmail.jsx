import { NavLink } from "react-router-dom";
import { defaultInstance } from "../../util/api";
import styles from "../Login.module.css";
import findIdAuthStyles from "./FindIdForm.module.css";

function CreateAccountEmail() {
  const url = "/member/save";
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    try {
      await defaultInstance.post(url, data).then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
      });
    } catch (error) {}
  }
  return (
    <div
      className={`${styles.loginDiv} ${styles.loginD}`}
      style={{ textAlign: "left" }}
    >
      <h2 className={styles.loginTitle}>
        <b>계정 만들기</b>
      </h2>
      <form id="form" onSubmit={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <br />
        <input type="email" id="email" name="email" />
        <br />
        <br />
        <p>
          이메일 허용 목록이 활성화 되어 있습니다. 이메일 허용 목록에 존재하는
          메일만 사용할 수 있습니다.
        </p>
        <ul style={{ listStyleType: "disc" }}>
          <li>sangmyung.kr</li>
        </ul>
      </form>
      <p>
        <b>가입후 탈퇴는 불가능합니다.</b>
      </p>
      <div>
        <button
          className={`${findIdAuthStyles.findIdFormBtn} ${findIdAuthStyles.sinUpBtn}`}
          type="submit"
        >
          <NavLink
            className={`${styles.link} ${styles.loginBtn}`}
            to="/createId"
          >
            가입
          </NavLink>
        </button>
      </div>
    </div>
  );
}

export default CreateAccountEmail;
