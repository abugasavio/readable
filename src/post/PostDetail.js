import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Layout from '../app/Layout';
import { connect } from 'react-redux';
import { fetchPost } from './PostActions';

class PageDetail extends Component {
  componentDidMount() {
    this.props.boundFetchPost(this.props.match.params.id);
  }

  render() {
    return (
      <Layout>
        <Container text style={{ marginBottom: "50px" }}>
					<Header as="h1" color='blue'>{this.props.post.title}</Header>
					<p>{this.props.post.body}</p>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  post: state.posts.currentPost
});

const mapDispatchToProps = dispatch => ({
  boundFetchPost: id => dispatch(fetchPost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageDetail);
