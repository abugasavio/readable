import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Segment,
  Icon,
  Dropdown
} from "semantic-ui-react";
import orderBy from 'lodash/orderBy';
import { fetchPosts } from "./PostActions";
import { sortPosts } from './PostUtil';


class PostList extends Component {
	state = {
		sortBy: 'voteScore'
	}

  componentDidMount() {
    this.props.boundFetchPosts();
	}

	handleSort(event, data) {
		event.preventDefault()
		this.setState({
			sortBy: data.value
		})
	}

  render() {
    const options = [
      { key: "voteScore", icon: "list", text: "Vote Score", value: "voteScore" },
      { key: "timestamp", icon: "list", text: "Timestamp", value: "timestamp" },
      { key: "title", icon: "list", text: "Title", value: "title" }
		];

		const sortedPosts = sortPosts(this.props.posts, this.state.sortBy)

    return (
			<div>
        <ul>{sortedPosts.map(post => <li key={post.id}>{JSON.stringify(post)}</li>)}</ul>

        <Segment style={{ padding: "4em 0em" }} vertical>
          <Container text>
            <Grid columns={2} style={{ paddingBottom: "4em" }}>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h1" style={{ color: "#f47835" }}>
                    <Icon name="list" />
                    <Header.Content>Post List</Header.Content>
                  </Header>
                </Grid.Column>
                <Grid.Column>
									<Button.Group floated="right">
									<Button>Sort</Button>
                    <Dropdown
                      options={options}
                      floating
											button
											className='icon'
											onChange={(event, data) => this.handleSort(event, data)}
                    />
                    <Button secondary>Add</Button>
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            {sortedPosts.map(post => (
              <div>
                <Header as="h2" style={{ fontSize: "2em", color: "#8ec127" }}>
                  {post.title}
                  <Header.Subheader>
                    Written by {post.author} on {Date(post.timestamp)}
                  </Header.Subheader>
                  <Header.Subheader style={{ paddingTop: "2px" }}>
                    Votes Received: {post.voteScore}
                  </Header.Subheader>
                </Header>
                <p style={{ fontSize: "1.33em" }}>{post.body}</p>
                <Divider />
              </div>
            ))}
          </Container>
        </Segment>
      </div>
    );
  }
}

function mapStateToProps(state) {
const sortedPost = sortPosts(state.posts, state.sortBy)
  return {
    posts: sortedPost
  };
}

const mapDispatchToProps = dispatch => ({
	boundFetchPosts: () => dispatch(fetchPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
