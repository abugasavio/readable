import React from 'react';
import { Route } from 'react-router-dom';
import PostDetail from '../post/PostDetail'
import PostListPage from './PostListPage';
import AddPostPage  from './AddPostPage'
import EditPostPage from './EditPostPage';
import NotFoundPage from './NotFoundPage';

const App = () => (
	<div>
		<Route path="/" exact component={PostListPage} />
    <Route path="/post/:id" component={PostDetail} />
    <Route path="/edit-post/:id" component={EditPostPage} />
		<Route path="/add-post" component={AddPostPage} />
    <Route path="/category/:category" component={PostListPage} />
    <Route path="/not-found" component={NotFoundPage} />
	</div>
)

export default App;
