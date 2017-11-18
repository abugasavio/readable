import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header, Comment } from 'semantic-ui-react';
import values from 'lodash/values';
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
    return (
      <Layout>
        <Container text style={{ marginBottom: '50px' }}>
          <Header as="h1" color="blue">
            {this.props.post.title}
          </Header>
          <p>{this.props.post.body}</p>
          <p>{JSON.stringify(this.props.comments)}</p>
          <Comment.Group>
            <Header as="h3" dividing>
              Comments
            </Header>
            {this.props.comments.map(comment => <CommentBlock key={comment.id} {...comment} />)}
            <AddCommentForm submit={createComment} postId={this.props.match.params.id}/>
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
  boundFetchComments: id => dispatch(fetchComments(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageDetail);
