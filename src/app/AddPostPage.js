import React from "react";
import { Container, Segment } from "semantic-ui-react";
import Layout from "./Layout";
import AddPostForm from "../post/AddPostForm";

class AddPostPage extends React.Component {
  submit = (data) => {
      console.log(data);
  };
  render() {
    return (
      <Layout>
        {" "}
        <Segment style={{ padding: "4em 0em" }} vertical>
          <Container text>
            <AddPostForm submit={this.submit} />
          </Container>
        </Segment>
      </Layout>
    );
  }
}

export default AddPostPage;
