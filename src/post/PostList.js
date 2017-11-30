/* eslint jsx-a11y/anchor-is-valid: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Grid, Header, Segment, Icon, Dropdown, Button, Modal } from 'semantic-ui-react';
import orderBy from 'lodash/orderBy';
import values from 'lodash/values';
import { Link } from 'react-router-dom';
import { fetchPosts, voteDownPost, voteUpPost, deletePost } from './PostActions';
import PageHeader from '../app/PageHeader';

class PostList extends Component {
  state = {
    sortBy: 'voteScore',
    modalOpen: false
  };

  componentDidMount() {
    this.props.boundFetchPosts();
  }

  onClickVoteUpButton = id => {
    const { boundVoteUpPost, boundFetchPosts } = this.props;
    this.props.boundVoteUpPost(id).then(() => boundFetchPosts());
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



  sortPosts() {
    const { sortBy } = this.state;
    const { posts } = this.props;
    let sortedPosts;

    if (sortBy === 'voteScore') {
      sortedPosts = orderBy(posts, post => post.voteScore, 'desc');
    } else if (sortBy === 'timestamp') {
      sortedPosts = orderBy(posts, post => post.timestamp);
    } else if (sortBy === 'title') {
      sortedPosts = orderBy(posts, post => post.title.toLowerCase());
    } else {
      sortedPosts = posts;
    }
    return sortedPosts;
  }

  handleSort(event, data) {
    event.preventDefault();
    this.setState({
      sortBy: data.value,
    });
  }

  render() {
    const options = [
      {
        key: 'voteScore',
        text: 'Vote Score',
        value: 'voteScore',
      },
      { key: 'timestamp', text: 'Timestamp', value: 'timestamp' },
      { key: 'title', text: 'Title', value: 'title' },
    ];

    const sortedPosts = this.sortPosts();

    return (
      <div>
        <Segment style={{ padding: '2em 0em' }} vertical>
          <Container text>
            <Grid columns={2} style={{ paddingBottom: '2em' }}>
              <Grid.Row>
                <Grid.Column>
                  <PageHeader icon="list" title="Post List" />
                </Grid.Column>
                <Grid.Column>
                  <Dropdown options={options} onChange={(event, data) => this.handleSort(event, data)} text="sort" />
                </Grid.Column>
              </Grid.Row>
            </Grid>

            {sortedPosts.map(post => (
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
                      <Button color="green" inverted onClick={(e) => this.onDeletePost(e,post.id)}>
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
            ))}
          </Container>
        </Segment>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: (ownProps.category && values(state.posts.postList).filter(post => post.category === ownProps.category)) || values(state.posts.postList),
    comments: state.comments,
  };
}

const mapDispatchToProps = dispatch => ({
  boundFetchPosts: () => dispatch(fetchPosts()),
  boundVoteUpPost: id => dispatch(voteUpPost(id)),
  boundVoteDownPost: id => dispatch(voteDownPost(id)),
  boundDeletePost: id => dispatch(deletePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
