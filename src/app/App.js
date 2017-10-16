import React, { Component } from 'react';
import PostList from '../post/PostList';
import Header from '../header/Header';
import './App.css';

class App extends Component {
  render() {
    return (
			<div className="App">
				<Header />
				<PostList />
      </div>
    );
  }
}

export default App;
