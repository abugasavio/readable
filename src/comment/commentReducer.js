import mapKeys from 'lodash/mapKeys';
import omit from 'lodash/omit'
import { RECEIVE_POST_COMMENTS, UPDATE_POST_COMMENT, DELETE_POST_COMMENT} from './CommentActions';

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
    case DELETE_POST_COMMENT:
      return omit(state, action.id)
    default:
      return state;
  }
}

export default commentReducer;
