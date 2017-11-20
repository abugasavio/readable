import React, { Component } from 'react';
import { Form, Button, Dropdown  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import InlineError from '../app/InlineError';

class AddPostForm extends Component {
  state = {
    data: {
      title: '',
      body: '',
      author: '',
      category: '',
      deleted: false,
      voteScore: 0
    },
    errors: {}
  };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  onCategoryChange = (e, data) => {
    this.setState({
      data:{...this.state.data, [data.name]: data.value}
    })
  }

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
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
    const categoriesOptions = this.props.categories.map(category => ({'value': category.name, 'text': category.path}));
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field error={!!errors.title}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Post title" value={data.title} name="title" onChange={this.onChange} />
          {errors.title && <InlineError text={errors.title} />}
        </Form.Field>
        <Form.Field error={!!errors.post}>
          <Form.TextArea
            label='Post Title'
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
        <Form.Field error={!!errors.author}>
          <label htmlFor="author">Name of Author</label>
          <input type="text" id="author" placeholder="Author" value={data.author} name="author" onChange={this.onChange} />
          {errors.author && <InlineError text={errors.author} />}
        </Form.Field>
        <Form.Field>
        <Dropdown name='category' placeholder='Select Category' fluid search selection options={categoriesOptions} onChange={this.onCategoryChange} />
        </Form.Field>
        <Button primary>Add Post</Button>
      </Form>
    );
  }
}

AddPostForm.propTypes = {
  submit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  categories: values(state.categories)
})

export default connect(mapStateToProps)(AddPostForm);
