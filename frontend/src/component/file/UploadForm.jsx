export default function UploadForm({ onSubmit, children }) {
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
      <label htmlFor="fileName">파일 이름 </label>&nbsp;
      <input type="text" id="fileName" name="fileName" required />
      <br />
      <label htmlFor="license">라이선스 </label>&nbsp;
      <input type="text" id="license" name="license" required />
      <br />
      <label htmlFor="category">카테고리 </label>&nbsp;
      <input type="text" id="category" name="category" required />
      <br />
      <label htmlFor="summary">요약 </label>&nbsp;&nbsp;&nbsp;
      <input type="text" id="summary" name="summary" required />
      {children}
    </form>
  );
}
