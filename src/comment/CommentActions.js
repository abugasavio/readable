import axios from 'axios';
import uuidv4 from 'uuid/v4';

export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';

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
