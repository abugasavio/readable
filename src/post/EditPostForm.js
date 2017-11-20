import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InlineError from '../app/InlineError';
import PageHeader from '../app/PageHeader';

class PostForm extends Component {
  state = {
    data: {
      title: '',
      body: '',
    },
    errors: {},
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      data: {
        title: nextProps.title,
        body: nextProps.body,
      },
    });
  };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  };

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    const { postId } = this.props;
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(postId, this.state.data);
    }
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title = 'Title cannot be blank';
    if (!data.body) errors.body = 'Post body cannot be blank';
    return errors;
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <PageHeader title="Edit Post" icon="edit" />
        <Form onSubmit={postId => this.onSubmit(postId)}>
          <Form.Field error={!!errors.title}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" placeholder="Post title" value={data.title} name="title" onChange={this.onChange} />
            {errors.title && <InlineError text={errors.title} />}
          </Form.Field>
          <Form.Field error={!!errors.post}>
            <Form.TextArea
              label="Post Title"
              id="post"
              autoHeight
              name="body"
              placeholder="Type your post here..."
              style={{ minHeight: 200 }}
              value={data.body}
              onChange={this.onChange}
              error={!!errors.body}
            />
            {errors.body && <InlineError text={errors.body} />}
          </Form.Field>
          <Button primary>Edit Post</Button>
        </Form>
      </div>
    );
  }
}

PostForm.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect()(PostForm);
