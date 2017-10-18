import { RECEIVE_POST_LIST, SORT_POSTS } from './PostActions';

function postReducer(state = [], action) {
	switch (action.type) {
		case RECEIVE_POST_LIST:
			return [
				...state,
				...action.posts
			]
		case SORT_POSTS:
			return action.posts
		default:
			return state;
	}
}

export default postReducer;
