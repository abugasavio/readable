import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import AddPostPage  from './AddPostPage'

const App = () => (
	<div>
		<Route path="/" exact component={HomePage} />
		<Route path="/add-post" component={AddPostPage} />
	</div>
)

export default App;
