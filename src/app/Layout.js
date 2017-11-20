import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import values from 'lodash/values';
import startCase from 'lodash/startCase';
import { Button, Container, Icon, Menu, Segment, Dropdown } from 'semantic-ui-react';
import './Layout.css';

const Layout = props => (
  <div>
    <Menu fixed="top" borderless>
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
    <Container style={{ marginTop: '7em', minHeight: '600px' }}>
      {props.children}
    </Container>

    <Segment inverted vertical style={{ padding: '5em 0em' }} color="pink">
      <Container>
            Savio Abuga
      </Container>
    </Segment>
  </div>
);

const mapStateToProps = state => ({
  categories: values(state.categories)
});

export default connect(mapStateToProps)(Layout);
