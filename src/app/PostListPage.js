import React from 'react';
import PropTypes from 'prop-types';
import PostList from '../post/PostList';
import Layout from './Layout';

const PostListPage = ({ match }) => (
  <Layout>
    <PostList category={match.params.category || null} />
  </Layout>
);

PostListPage.propTypes = {
  match: PropTypes.object
};

export default PostListPage;
