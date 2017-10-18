import axios from 'axios';

export const RECEIVE_CATEGORY_LIST = 'RECEIVE_CATEGORY_LIST';

export const receiveCategoryList = posts => ({
	type: RECEIVE_CATEGORY_LIST,
	posts
})

export const fetchCategories = () => dispatch => (
	axios.get('/categories',
			  {headers: {'Authorization' : "saviojoseph"}}
			 ).then(res => dispatch(receiveCategoryList(res.data))).catch(err => console.log(err))

)
