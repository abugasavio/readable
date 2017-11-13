import React from 'react';
import { Route } from 'react-router-dom';
import PostDetail from '../post/PostDetail'
import PostListPage from './PostListPage';
import AddPostPage  from './AddPostPage'

const App = () => (
	<div>
		<Route path="/" exact component={PostListPage} />
		<Route path="/post/:id" component={PostDetail} />
		<Route path="/add-post" component={AddPostPage} />
		<Route path="/category/:category" component={PostListPage} />
	</div>
)

export default App;
