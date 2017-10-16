import { RECEIVE_POST_LIST } from './PostActions';

function postReducer(state = [], action) {
	switch (action.type) {
		case RECEIVE_POST_LIST:
			console.log(action.posts)
			return [
				...state,
				...action.posts
			]
		default:
			return state;
	}
}

export default postReducer;
