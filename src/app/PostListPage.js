import React from 'react';
import PropTypes from 'prop-types';
import PostList from '../post/PostList';
import Layout from './Layout';

const PostListPage = ({ match, history }) => (
  <Layout>
    <PostList category={match.params.category || null} history={history}/>
  </Layout>
);

PostListPage.propTypes = {
  match: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default PostListPage;
