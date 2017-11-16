import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Grid, Header, Segment, Icon, Dropdown } from 'semantic-ui-react';
import orderBy from 'lodash/orderBy';
import values from 'lodash/values';
import { fetchPosts } from './PostActions';

class PostList extends Component {
  state = {
    sortBy: 'voteScore'
  };

  componentDidMount() {
    this.props.boundFetchPosts();
  }

  sortPosts() {
    const { sortBy } = this.state;
    const { posts } = this.props;
    let sortedPosts;

    if (sortBy === 'voteScore') {
      sortedPosts = orderBy(posts, post => post.voteScore, 'desc');
    } else if (sortBy === 'timestamp') {
      sortedPosts = orderBy(posts, post => post.timestamp);
    } else if (sortBy === 'title') {
      sortedPosts = orderBy(posts, post => post.title.toLowerCase());
    } else {
      sortedPosts = posts;
    }
    return sortedPosts;
  }

  handleSort(event, data) {
    event.preventDefault();
    this.setState({
      sortBy: data.value
    });
  }

  render() {
    const options = [
      {
        key: 'voteScore',
        text: 'Vote Score',
        value: 'voteScore'
      },
      { key: 'timestamp', text: 'Timestamp', value: 'timestamp' },
      { key: 'title', text: 'Title', value: 'title' }
    ];

    const sortedPosts = this.sortPosts();

    return (
      <div>
        <ul>{sortedPosts.map(post => <li key={post.id}>{JSON.stringify(post)}</li>)}</ul>

        <Segment style={{ padding: '2em 0em' }} vertical>
          <Container text>
            <Grid columns={2} style={{ paddingBottom: '2em' }}>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h1" color="blue">
                    <Icon name="check" color="blue" />
                    <Header.Content>Post List</Header.Content>
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  <Dropdown options={options} onChange={(event, data) => this.handleSort(event, data)} text="sort" />
                </Grid.Column>
              </Grid.Row>
            </Grid>

            {sortedPosts.map(post => (
              <div key={post.id}>
                <Header as="h2" color="pink">
                  {post.title}
                  <Header.Subheader>
                    Written by {post.author} on {Date(post.timestamp)}
                  </Header.Subheader>
                  <Header.Subheader style={{ paddingTop: '2px' }}>Votes Received: {post.voteScore}</Header.Subheader>
                </Header>
                <p style={{ fontSize: '1.33em' }}>{post.body}</p>
                <Divider />
              </div>
            ))}
          </Container>
        </Segment>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: (ownProps.category && values(state.posts.postList).filter(post => post.category === ownProps.category)) || values(state.posts.postList)
  };
}

const mapDispatchToProps = dispatch => ({
  boundFetchPosts: () => dispatch(fetchPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
