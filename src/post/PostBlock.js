import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon, Modal, Header, Divider} from 'semantic-ui-react';
import { voteDownPost, voteUpPost, deletePost, fetchCommentCount, fetchPosts } from './PostActions';

class PostBlock extends Component {
  state = {
    modalOpen: false
  }

  componentDidMount() {
    const { post, boundFetchCommentCount } = this.props;
    boundFetchCommentCount(post.id)
  }

  onClickVoteUpButton = id => {
    const { boundVoteUpPost, boundFetchPosts } = this.props;
    boundVoteUpPost(id).then(() => boundFetchPosts());
  };

  onClickVoteDownButton = id => {
    const { boundVoteDownPost, boundFetchPosts } = this.props;
    boundVoteDownPost(id).then(() => boundFetchPosts());
  };

  onDeletePost = (e, id) => {
    e.preventDefault();
    const { boundDeletePost } = this.props;
    boundDeletePost(id)
      .then(this.setState({modalOpen: false}))
      .then(this.props.boundFetchPosts())
  };

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
    const { post } = this.props;
    return (
      <div key={post.id}>
        <Button.Group>
          <Button color="pink" onClick={() => this.onClickVoteUpButton(post.id)}>
            <Icon name="thumbs outline up" />
          </Button>
          <Button color="pink" onClick={() => this.onClickVoteDownButton(post.id)}>
            <Icon name="thumbs outline down" />
          </Button>
          <Button color="pink">
            <Icon name="edit" />
            <Link to={`/edit-post/${post.id}`} role={Button}>
              Edit Post
            </Link>
          </Button>
          <Modal
            open={this.state.modalOpen}
            onClose={this.closeModal}
            trigger={
              <Button color="pink" onClick={this.openModal}>
                <Icon name="remove circle" />Delete Post
              </Button>
            }
            basic
            size="small"
          >
            <Header icon="remove" content="Delete Post" />
            <Modal.Content>
              <p>Are you sure you want to delete this post?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color="red" inverted onClick={this.closeModal}>
                <Icon name="remove" /> No
              </Button>
              <Button color="green" inverted onClick={e => this.onDeletePost(e, post.id)}>
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </Button.Group>
        <Header as="h2" color="pink">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
          <Header.Subheader>
            Written by {post.author} on {Date(post.timestamp)}
          </Header.Subheader>
          <Header.Subheader style={{ paddingTop: '2px' }}>Votes Received: {post.voteScore}</Header.Subheader>
        </Header>
        <p style={{ fontSize: '1.33em' }}>{post.body}</p>
        <Divider />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  boundVoteUpPost: id => dispatch(voteUpPost(id)),
  boundVoteDownPost: id => dispatch(voteDownPost(id)),
  boundDeletePost: id => dispatch(deletePost(id)),
  boundFetchPosts: () => dispatch(fetchPosts()),
  boundFetchCommentCount: id => dispatch(fetchCommentCount(id))
});

export default connect(null, mapDispatchToProps)(PostBlock);
