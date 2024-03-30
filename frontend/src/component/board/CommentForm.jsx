export default function CommentForm({ comment, setComment, handleAddComment }) {
    return (
      <form onSubmit={handleAddComment}>
        <label htmlFor="comment">댓글 쓰기</label><br />
        <input
          type="text"
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        /><br />
        <button type="submit">작성</button>
      </form>
    );
  }