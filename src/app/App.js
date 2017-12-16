import React from 'react';
import { Route } from 'react-router-dom';
import PostDetail from '../post/PostDetail'
import PostListPage from './PostListPage';
import AddPostPage  from './AddPostPage'
import EditPostPage from './EditPostPage';
import EditCommentForm from '../comment/EditCommentForm';

const App = () => (
	<div>
    <Route path="/" exact component={PostListPage} />
    <Route exact path="/category" component={PostListPage} />
    <Route path="/category/:id" component={PostDetail} />
    <Route path="/edit-post/:id" component={EditPostPage} />
    <Route path="/edit-comment/:id" component={EditCommentForm} />
		<Route path="/add-post" component={AddPostPage} />
	</div>
)

export default App;
