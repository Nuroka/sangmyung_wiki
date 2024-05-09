import styles from "../Login.module.css";

export default function UpdatePwForm({ inputData, onSubmit, children }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  }

  return (
    <div className={`${styles.loginDiv} ${styles.loginD}`}>
      <form id="form" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="password">현재 비밀번호</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={inputData?.password}
          />
        </p>
        <p>
          <label htmlFor="new_password">변경할 비밀번호</label>
          <br />
          <input
            type="password"
            id="new_password"
            name="new_password"
            defaultValue={inputData?.new_password}
          />
        </p>
        <p>
          <label htmlFor="check_password">비밀번호 확인</label>
          <br />
          <input type="password" id="check_password" name="check_password" />
        </p>
        {children}
      </form>
    </div>
  );
}
