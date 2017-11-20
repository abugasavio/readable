import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Comment, Button, Icon } from 'semantic-ui-react';
import { voteUpComment, voteDownComment, fetchComments } from './CommentActions';

class CommentBlock extends Component {

  onClickVoteUpButton (id) {
    const { boundVoteUpComment } = this.props;
    boundVoteUpComment(id)
  }

  onClickVoteDownButton (id) {
    const { boundVoteDownComment } = this.props;
    boundVoteDownComment(id)
  }

  render() {
    const { author, timestamp, voteScore, body, id } = this.props;

    return (
      <Comment>
        <Comment.Content>
          <Comment.Author>Comment By: {author}</Comment.Author>
          <Comment.Metadata>
            <div>Created: {Date(timestamp)}</div>
            <div>Vote Score: {voteScore}</div>
          </Comment.Metadata>
          <Comment.Text>{body}</Comment.Text>
          <Button.Group>
            <Button color="pink" onClick={() => this.onClickVoteUpButton(id)}>
              <Icon name="thumbs outline up" />
            </Button>
            <Button color="pink" onClick={() => this.onClickVoteDownButton(id)}>
              <Icon name="thumbs outline down" />
            </Button>
          </Button.Group>
        </Comment.Content>
      </Comment>
    );
  }
}

CommentBlock.propTypes = {
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  boundVoteUpComment: PropTypes.func.isRequired,
  boundVoteDownComment: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  boundVoteUpComment: id => dispatch(voteUpComment(id)),
  boundVoteDownComment: id => dispatch(voteDownComment(id))
})

const mapStateToProps = state => ({
  comments: state.comments
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentBlock);
