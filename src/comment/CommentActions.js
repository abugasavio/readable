import axios from 'axios';
import uuidv4 from 'uuid/v4';

export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
export const UPDATE_POST_COMMENT = 'UPDATE_POST_COMMENT'
export const DELETE_POST_COMMENT = 'DELETE_POST_COMMENT'


export const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments,
});

export const fetchComments = postId => dispatch => {
    fetch(`/posts/${postId}/comments`, {
      method: 'GET',
      headers: {
        Authorization: 'saviojoseph',
      },
    })
      .then(res => res.json())
      .then(payload => dispatch(receivePostComments(payload)));
  };

export const createComment = (postId, data) => dispatch =>
  axios
    .post(
      '/comments',
      {
        id: uuidv4(),
        timestamp: Date.now(),
        body: data.body,
        author: data.author,
        parentId: postId
      },
      { headers: { Authorization: 'saviojoseph' } },
    )
    .then(() => dispatch(fetchComments(postId)))
    .catch(err => console.log(err));

export const voteUpComment = id => dispatch =>
    axios.post(`/comments/${id}`, {option: 'upVote'}, { headers: { Authorization: 'saviojoseph' }}).then(res => dispatch({type: UPDATE_POST_COMMENT, comment: res.data}))

export const voteDownComment = id => dispatch =>
    axios.post(`/comments/${id}`, {option: 'downVote'}, { headers: { Authorization: 'saviojoseph' }}).then(res => dispatch({type: UPDATE_POST_COMMENT, comment: res.data}))

export const deleteComment = commentId => dispatch =>
axios
  .delete(
    `/comments/${commentId}`,
    { headers: { Authorization: 'saviojoseph' }}
  )
  .then(res => res.data)
  .then(data => dispatch({type: DELETE_POST_COMMENT, id: data.id }))


export const editComment = (commentId, data) => dispatch =>
{
  console.log(data)
  return axios({
      url: `/comments/${commentId}`,
      method: 'put',
      headers: { Authorization: 'saviojoseph' },
      data
    })
    .then(res => res.data)
  }
