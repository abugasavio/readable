import React from 'react';
import PostList from '../post/PostList';
import Header from '../header/Header';
import Layout from './Layout'
import CategoryList from '../category/CategoryList';

const App = () => <Layout><PostList /><CategoryList /></Layout>

export default App;
