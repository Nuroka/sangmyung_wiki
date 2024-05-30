import React from 'react';

class CommentCounter extends React.Component {
  render() {
    const { comments } = this.props; // 댓글 데이터를 props로 전달 받음
    const commentCount = comments.length; // 댓글 수를 배열의 길이로 계산

    return (
      <div>
        <span>댓글 {commentCount}</span>
      </div>
    );
  }
}

export default CommentCounter;
