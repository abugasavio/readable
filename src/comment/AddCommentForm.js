import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InlineError from '../app/InlineError';
import { createComment } from './CommentActions';

class AddCommentForm extends Component {
  state = {
    data: {
      body: '',
      author: ''
    },
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
      this.props.boundOnSubmit(this.props.postId, this.state.data).then(this.setState({data: {body: '', author: ''}}));
    }
  };

  validate = data => {
    const errors = {};
    if (!data.author) errors.author = 'Please enter your name';
    if (!data.body) errors.body = 'Please enter a comment';
    return errors;
  };

  render() {
    const { data, errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit} reply>
        <Form.Field error={!!errors.body}>
          <Form.TextArea
            label='Comment'
            id="body"
            autoHeight
            name="body"
            placeholder="Type your comment here..."
            style={{ minHeight: 200 }}
            value={data.body}
            onChange={this.onChange}
            error={!!errors.body}
          />
          {errors.body && <InlineError text={errors.body} />}
        </Form.Field>
        <Form.Field error={!!errors.author}>
          <label htmlFor="author">Your Name</label>
          <input type="text" id="author" placeholder="Your name" value={data.author} name="author" onChange={this.onChange} />
          {errors.author && <InlineError text={errors.author} />}
        </Form.Field>
        <Button primary content="Add a Comment" labelPosition="left" icon="edit"/>
      </Form>
    );
  }
}

AddCommentForm.propTypes = {
  boundOnSubmit: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

function mapDispatchToProps (dispatch) {
  return {
    boundOnSubmit: (postId, data) => dispatch(createComment(postId, data))
  }
}

export default connect(null, mapDispatchToProps)(AddCommentForm);
