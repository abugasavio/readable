import React from 'react';
import { Comment } from 'semantic-ui-react';

const CommentBlock = ({ author, timestamp, body }) => {
  return (
    <Comment>
      <Comment.Content>
        <Comment.Author>Comment By: {author}</Comment.Author>
        <Comment.Metadata><div>{Date(timestamp)}</div></Comment.Metadata>
        <Comment.Text>{body}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default CommentBlock;
