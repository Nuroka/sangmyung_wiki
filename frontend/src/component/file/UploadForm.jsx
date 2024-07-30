import styles from "../Login.module.css";

export default function UploadForm({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSubmit(formData);
  };

  return (
    <form id="uploadForm" onSubmit={handleSubmit}>
      <label htmlFor="file">파일 선택:</label>
      <input type="file" id="file" name="file" accept="image/*" required />
      <br />
      <br />
      <label htmlFor="fileName">파일 이름 </label>
      <br />
      <input type="text" id="fileName" name="fileName" required />
      <br />
      <label htmlFor="license">라이선스 </label>
      <br />
      <input type="text" id="license" name="license" required />
      <br />
      <label htmlFor="category">카테고리 </label>
      <br />
      <input type="text" id="category" name="category" required />
      <br />
      <label htmlFor="summary">요약 </label>
      <br />
      <input type="text" id="summary" name="summary" required />
      <br />
      <button className={styles.link} type="submit">
        업로드
      </button>
    </form>
  );
}
