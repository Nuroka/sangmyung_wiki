import styles from "../Login.module.css";

export default function CommentForm({ comment, setComment, handleAddComment }) {
  return (
    <div className={`${styles.loginDiv} ${styles.loginD}`}>
      <form>
        <label htmlFor="comment">댓글 쓰기</label>
        <br />
        <div className={styles.commentForm} onSubmit={handleAddComment}>
          <input
            className={styles.writeReInput}
            type="text"
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button
            className={`${styles.link} ${styles.writeReBtn}`}
            type="submit"
          >
            작성
          </button>
        </div>
      </form>
    </div>
  );
}
