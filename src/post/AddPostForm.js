import React, { Component } from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import PropTypes from "prop-types";
import InlineError from "../app/InlineError";

class AddPostForm extends Component {
  state = {
    data: {
      title: "",
      body: "",
      author: "",
      category: "",
      deleted: false,
      voteScore: 0
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
    }
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Title cannot be blank";
    if (!data.body) errors.body = "Post body cannot be blank";
    return errors;
  };

  render() {
    const { data, errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field error={!!errors.title}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Post title"
            value={data.title}
            name="title"
            onChange={this.onChange}
          />
          {errors.title && <InlineError text={errors.title} />}
        </Form.Field>
        <Form.Field error={!!errors.post}>
          <label htmlFor="post">Post Title</label>
          <TextArea
            id="post"
            autoHeight
            name="body"
            placeholder="Type your post here..."
            style={{ minHeight: 200 }}
            value={data.body}
            onChange={this.onChange}
            error={!!errors.post}
          />
          {errors.body && <InlineError text={errors.body} />}
        </Form.Field>
        <Form.Field error={!!errors.author}>
          <label htmlFor="author">Name of Author</label>
          <input
            type="text"
            id="author"
            placeholder="Author"
            value={data.author}
            name="author"
            onChange={this.onChange}
          />
          {errors.author && <InlineError text={errors.author} />}
        </Form.Field>
        <Button primary>Add Post</Button>
      </Form>
    );
  }
}

AddPostForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default AddPostForm;
