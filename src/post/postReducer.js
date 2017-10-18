import { RECEIVE_POST_LIST } from './PostActions';

function postReducer(state = [], action) {
	switch (action.type) {
		case RECEIVE_POST_LIST:
			return [
				...state,
				...action.posts
			]
		default:
			return state;
	}
}

export default postReducer;
