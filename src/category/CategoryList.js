import React from "react";
import { Divider, Header, Icon, Container } from "semantic-ui-react";

const CategoryList = () => {
  return (
    <Container text>
      <Header as="h1" style={{ color: "#f47835" }}>
        <Icon name="list" />
        <Header.Content>Category List</Header.Content>
      </Header>
    </Container>
  );
};

export default CategoryList;
