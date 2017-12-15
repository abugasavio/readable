import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Comment, Button, Icon, Header, Modal } from 'semantic-ui-react';
import { voteUpComment, voteDownComment, fetchComments, deleteComment } from './CommentActions';

class CommentBlock extends Component {
  state = {
    modalOpen: false,
    hideComment: false
  };

  onDeleteComment = (e, id) => {
    e.preventDefault();
    this.setState({ modalOpen: false })
    this.props.onDeleteComment(id)
  };

  onClickVoteUpButton(id) {
    const { boundVoteUpComment } = this.props;
    boundVoteUpComment(id);
  }

  onClickVoteDownButton(id) {
    const { boundVoteDownComment } = this.props;
    boundVoteDownComment(id);
  }

  closeModal = () => {
    this.setState({
      modalOpen: false,
    });
  };

  openModal = () => {
    this.setState({
      modalOpen: true,
    });
  };

  render() {
    const { author, timestamp, voteScore, body, id } = this.props;
    const { modalOpen, hideComment } = this.state;

    return (
      <Comment className={hideComment ? 'hidden' : ''}>
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
            <Modal
              open={modalOpen}
              onClose={this.closeModal}
              trigger={
                <Button color="pink" onClick={this.openModal}>
                  <Icon name="remove circle" />Delete Comment
                </Button>
              }
              basic
              size="small"
            >
              <Header icon="remove" content="Delete Comment" />
              <Modal.Content>
                <p>Are you sure you want to delete this comment?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button basic color="red" inverted onClick={this.closeModal}>
                  <Icon name="remove" /> No
                </Button>
                <Button color="green" inverted onClick={(e) => this.onDeleteComment(e, id)}>
                  <Icon name="checkmark" /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
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
  boundVoteDownComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  boundVoteUpComment: id => dispatch(voteUpComment(id)),
  boundVoteDownComment: id => dispatch(voteDownComment(id)),
  boundDeleteComment: id => dispatch(deleteComment(id)),
  boundFetchComments: id => dispatch(fetchComments(id))
});

const mapStateToProps = state => ({
  comments: state.comments,
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentBlock);
