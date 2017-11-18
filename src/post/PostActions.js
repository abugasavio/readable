import axios from 'axios';
import uuidv4 from 'uuid/v4';

export const RECEIVE_POST_LIST = 'RECEIVE_POST_LIST';
export const RECEIVE_CURRENT_POST = 'RECEIVE_CURRENT_POST';

export const receivePostList = posts => ({
  type: RECEIVE_POST_LIST,
  posts,
});

export const receiveCurrentPost = post => ({
  type: RECEIVE_CURRENT_POST,
  post,
});

export const fetchPosts = () => dispatch =>
  axios
    .get('/posts', { headers: { Authorization: 'saviojoseph' } })
    .then(res => dispatch(receivePostList(res.data)))
    .catch(err => console.log(err));

export const createPost = data => dispatch =>
  axios
    .post(
      '/posts',
      {
        id: uuidv4(),
        timestamp: Date.now(),
        title: data.title,
        body: data.body,
        author: data.author,
      },
      { headers: { Authorization: 'saviojoseph' } },
    )
    .then(() => dispatch(fetchPosts()))
    .catch(err => console.log(err));

export const editPost = (postId, data) => dispatch =>
    axios
      .put(
        `/posts/${postId}`,
        {
          title: data.title,
          body: data.body
        },
        { headers: { Authorization: 'saviojoseph' } }
      ).then(res => console.log(res))

export const fetchPost = id => dispatch =>
  axios.get(`/posts/${id}`, { headers: { Authorization: 'saviojoseph' } }).then(res => dispatch(receiveCurrentPost(res.data)));
