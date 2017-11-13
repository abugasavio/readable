import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import values from 'lodash/values';
import startCase from 'lodash/startCase';
import { Button, Container, Grid, Header, Icon, List, Menu, Segment, Dropdown } from 'semantic-ui-react';

const Layout = props => (
  <div>
    <Menu fixed="top">
      <Container>
        <Menu.Item as={Link} to="/" header>
          Udacity Readable
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>
        <Dropdown item simple text="Categories">
          <Dropdown.Menu>
            {props.categories.map(category => {
              const url = `/category/${category.path}`;
              return (
                <Dropdown.Item as={Link} to={url}>
                  {startCase(category.name)}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/add-post">
            <Button color="pink">
              <Icon name="plus" />
              Create Post
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
    <Container text style={{ marginTop: '7em' }}>
      {props.children}
    </Container>

    <Segment inverted vertical style={{ padding: '5em 0em' }} color="pink">
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Religious Ceremonies</List.Item>
                <List.Item as="a">Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Banana Pre-Order</List.Item>
                <List.Item as="a">DNA FAQ</List.Item>
                <List.Item as="a">How To Access</List.Item>
                <List.Item as="a">Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Footer Header
              </Header>
              <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </div>
);

const mapStateToProps = state => ({
  categories: values(state.categories)
});

export default connect(mapStateToProps)(Layout);
