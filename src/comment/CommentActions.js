export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS'

export const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments
})

export const fetchComments = postId => {
  return dispatch => { fetch(`/posts/${postId}/comments`, {
    method:'GET',
    headers: {
      'Authorization': 'saviojoseph'
    }
  }).then(res => res.json())
  .then(payload => dispatch(receivePostComments(payload)))
}
}
