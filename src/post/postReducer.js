import mapKeys from 'lodash/mapKeys';
import { RECEIVE_POST_LIST, RECEIVE_CURRENT_POST } from './PostActions';

const initialState = {
  posts: {},
  currentPost: {}
};

function postListReducer(state = initialState.posts, action) {
  switch (action.type) {
    case RECEIVE_POST_LIST:
      const newPosts = mapKeys(action.posts, 'id');
      return {
        ...state,
        ...newPosts
      };
    default:
      return state;
  }
}

function currentPostReducer(state = initialState.currentPost, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_POST:
      return {...state, ...action.post}
    default:
      return state;
  }
}

const postReducer = (state=initialState, action) => ({
  postList: postListReducer(state.posts, action),
  currentPost: currentPostReducer(state.currentPost, action)
});

export default postReducer;
