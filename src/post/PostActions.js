import axios from 'axios';


export const RECEIVE_POST_LIST = 'RECEIVE_POST_LIST';
export const SORT_POSTS = 'SORT_POSTS'

export const receivePostList = posts => ({
	type: RECEIVE_POST_LIST,
	posts
})

export const fetchPosts = () => dispatch => (
	axios.get('/posts',
			  {headers: {'Authorization' : "saviojoseph"}}
			 ).then(res => dispatch(receivePostList(res.data))).catch(err => console.log(err))

)
