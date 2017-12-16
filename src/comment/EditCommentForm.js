import React from "react";
import { connect } from "react-redux";
import { Container, Segment, Form, Button } from "semantic-ui-react";
import PropTypes from 'prop-types';
import { editComment } from '../comment/CommentActions';
import Layout from "../app/Layout";
import InlineError from '../app/InlineError';
import PageHeader from '../app/PageHeader';

class EditCommentForm extends React.Component {
  state = {
    errors: {},
    data: {
      body: this.props.comment.body,
      author: this.props.comment.author
    }
  }

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  };

  onSubmit = (id) => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      console.log(this.state.data)
      this.props.boundEditComment(id, this.state.data).then(() => this.props.history.goBack());
    }
  };

  validate = data => {
    const errors = {};
    if (!data.author) errors.author = 'Author cannot be blank';
    if (!data.body) errors.body = 'Comment body cannot be blank';
    return errors;
  };

  render() {
    const { id } = this.props.comment;
    const { author, body } = this.state.data;
    const { errors } = this.state;

    return (
      <Layout>
        <Segment style={{ padding: "4em 0em" }} vertical>
          <Container text>
            <PageHeader title="Edit Comment" icon="edit" />
            <Form onSubmit={() => this.onSubmit(id)}>
              <Form.Field error={!!errors.post}>
                <Form.TextArea
                  label="Comment Body"
                  id="post"
                  autoHeight
                  name="body"
                  style={{ minHeight: 200 }}
                  value={body}
                  onChange={this.onChange}
                  error={!!errors.body}
                />
                {errors.body && <InlineError text={errors.body} />}
              </Form.Field>
              <Form.Field error={!!errors.author}>
              <label htmlFor="title">Author</label>
              <input type="text" id="author" placeholder="Author" value={author} name="author" onChange={this.onChange} />
              {errors.author && <InlineError text={errors.author} />}
            </Form.Field>
              <Button primary>Edit Comment</Button>
            </Form>
          </Container>
        </Segment>
      </Layout>
    );
  }
}

EditCommentForm.propTypes = {
  comment: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  boundEditComment: PropTypes.func.isRequired // eslint-disable-line react/forbid-prop-types
}

const mapStateToProps = (state, ownProps) => ({
  comment: state.comments[ownProps.match.params.id]
})

const mapDispatchToProps = dispatch => ({
  boundEditComment: (id, data) => dispatch(editComment(id, data))
});


export default connect(mapStateToProps, mapDispatchToProps)(EditCommentForm);
