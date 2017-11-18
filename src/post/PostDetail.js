import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header, Comment, Segment, Button, Icon, Modal } from 'semantic-ui-react';
import values from 'lodash/values';
import { Link } from 'react-router-dom';
import Layout from '../app/Layout';
import { fetchPost } from './PostActions';
import CommentBlock from '../comment/CommentBlock';
import AddCommentForm from '../comment/AddCommentForm';
import { fetchComments, createComment } from '../comment/CommentActions';

class PageDetail extends Component {
  componentDidMount() {
    const { boundFetchPost, boundFetchComments, match } = this.props;
    boundFetchPost(match.params.id).then(() => boundFetchComments(match.params.id));
  }

  render() {
    const postId = this.props.match.params.id;
    return (
      <Layout>
        <Container text style={{ marginBottom: '50px' }}>
          <Segment clearing basic>
            <Button.Group floated="right">
              <Button color="green">
                <Icon name="edit" />
                <Link to={`/edit-post/${postId}`} role={Button}>
                  Edit
                </Link>
              </Button>
              <Modal trigger={<Button color='red'><Icon name="remove circle" />Basic Modal</Button>} basic size="small">
                <Header icon="remove" content="Delete Post" />
                <Modal.Content>
                  <p>Are you sure you want to delete this post?</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button basic color="red" inverted>
                    <Icon name="remove" /> No
                  </Button>
                  <Button color="green" inverted>
                    <Icon name="checkmark" /> Yes
                  </Button>
                </Modal.Actions>
              </Modal>
            </Button.Group>
          </Segment>
          <Segment clearing basic>
            <Header as="h1" color="blue" floated="left">
              {this.props.post.title}
            </Header>
          </Segment>
          <p>{this.props.post.body}</p>
          <Comment.Group>
            <Header as="h3" dividing>
              Comments
            </Header>
            {this.props.comments.map(comment => <CommentBlock key={comment.id} {...comment} />)}
            <AddCommentForm submit={createComment} postId={this.props.match.params.id} />
          </Comment.Group>
        </Container>
      </Layout>
    );
  }
}

PageDetail.propTypes = {
  boundFetchPost: PropTypes.func.isRequired,
  boundFetchComments: PropTypes.func.isRequired,
  comments: PropTypes.objectOf(PropTypes.objects).isRequired,
  post: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  post: state.posts.currentPost,
  comments: values(state.comments),
});

const mapDispatchToProps = dispatch => ({
  boundFetchPost: id => dispatch(fetchPost(id)),
  boundFetchComments: id => dispatch(fetchComments(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageDetail);
