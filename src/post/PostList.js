import React, { Component } from "react";
import { fetchPosts } from "./PostActions";
import { connect } from "react-redux";

class PostList extends Component {
  componentDidMount() {
    this.props.boundFetchPosts("test");
  }

  render() {
    return (
		<div>
			<ul>
				{this.props.posts.map(post => (
					<li>{JSON.stringify(post)}</li>
				)
				)}
			</ul>
		</div>
	);
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

const mapDispatchToProps = dispatch => ({
  boundFetchPosts: () => dispatch(fetchPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
