import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';

const CommentBlock = ({ author, timestamp, body }) => (
  <Comment>
    <Comment.Content>
      <Comment.Author>Comment By: {author}</Comment.Author>
      <Comment.Metadata>
        <div>{Date(timestamp)}</div>
      </Comment.Metadata>
      <Comment.Text>{body}</Comment.Text>
    </Comment.Content>
  </Comment>
);

CommentBlock.propTypes = {
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired
};

export default CommentBlock;
