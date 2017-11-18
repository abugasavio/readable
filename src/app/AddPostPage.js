import React from 'react';
import { connect } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';
import { createPost } from '../post/PostActions';
import AddPostForm from '../post/AddPostForm';
import Layout from './Layout';

class AddPostPage extends React.Component {
  submit = data => {
    this.props.boundCreatePosts(data).then(this.props.history.push('/'));
  };
  render() {
    return (
      <Layout>
        <Segment style={{ padding: '4em 0em' }} vertical>
          <Container text>
            <AddPostForm submit={this.submit} />
          </Container>
        </Segment>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  boundCreatePosts: data => dispatch(createPost(data)),
});

export default connect(null, mapDispatchToProps)(AddPostPage);
