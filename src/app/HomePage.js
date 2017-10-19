import React from 'react';
import PostList from '../post/PostList';
import CategoryList from '../category/CategoryList';
import Layout from './Layout'

const HomePage = () => <Layout><PostList /><CategoryList /></Layout>

export default HomePage;
