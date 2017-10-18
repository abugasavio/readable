import axios from 'axios';
import { sortPosts } from './PostUtil';


export const RECEIVE_POST_LIST = 'RECEIVE_POST_LIST';
export const SORT_POSTS = 'SORT_POSTS'

export const receivePostList = posts => ({
	type: RECEIVE_POST_LIST,
	posts
})

export const sortPostlists = (posts, sortBy = 'votesReceived' ) => ({
	type: SORT_POSTS,
	posts: sortPosts(posts, sortBy)
})

export const fetchPosts = () => dispatch => (
	axios.get('/posts',
			  {headers: {'Authorization' : "saviojoseph"}}
			 ).then(res => dispatch(receivePostList(res.data))).catch(err => console.log(err))

)
