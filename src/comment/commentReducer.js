import mapKeys from 'lodash/mapKeys';
import { RECEIVE_POST_COMMENTS, UPDATE_POST_COMMENT} from './CommentActions';

const initialState = {
  postComments: {}
}

function commentReducer(state = initialState.postComments, action) {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS:
      const newComments = mapKeys(action.comments, 'id');
      return { ...state, ...newComments };
    case UPDATE_POST_COMMENT:
      return { ...state, [action.comment.id] : action.comment}
    default:
      return state;
  }
}

export default commentReducer;
