import React from "react";
import { connect } from "react-redux";
import { Container, Segment } from "semantic-ui-react";
import PropTypes from 'prop-types';
import { editPost, fetchPost, fetchPosts } from "../post/PostActions";
import EditPostForm from "../post/EditPostForm";
import Layout from "./Layout";

class EditPostPage extends React.Component {

  state = {
    title: '',
    body: ''
  }


  componentWillMount () {
    const postId = this.props.match.params.id;
    this.props.boundFetchPost(postId)
  }


  componentWillReceiveProps = (nextProps) => {
    this.setState({
      title: nextProps.post.title,
      body: nextProps.post.body
    });
  }


  submit = (postId, data) => {
	this.props.boundEditPost(postId, data).then(() => this.props.history.push(`/post/${postId}`))
  };


  render() {
    const postId = this.props.match.params.id;

    return (
      <Layout>
        <Segment style={{ padding: "4em 0em" }} vertical>
          <Container text>
            <EditPostForm submit={this.submit} postId={postId} title={this.state.title} body={this.state.body} />
          </Container>
        </Segment>
      </Layout>
    );
  }
}

EditPostPage.propTypes = {
  boundEditPost: PropTypes.func.isRequired,
  boundFetchPost: PropTypes.func.isRequired,

  post: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
}

const mapStateToProps = state => ({
  post: state.posts.currentPost
})

const mapDispatchToProps = dispatch => ({
  boundEditPost: (id, data) => dispatch(editPost(id, data)),
  boundFetchPost: id => dispatch(fetchPost(id)),
  boundFetchPosts: () => dispatch(fetchPosts())
});


export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
