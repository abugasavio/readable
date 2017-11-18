import mapKeys from 'lodash/mapKeys';
import { RECEIVE_POST_COMMENTS} from './CommentActions';

const initialState = {
  postComments: {}
}

function commentReducer(state = initialState.postComments, action) {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS:
      const newComments = mapKeys(action.comments, 'id');
      return { ...state, ...newComments };
    default:
      return state;
  }
}

export default commentReducer;
