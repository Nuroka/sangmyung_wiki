export default function Comment({ comments }) {
    return (
      <div>
        <h3>댓글</h3>
        {comments.map((comment, index) => (
          <div className="comment" key={index}>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    );
  }