import axios from 'axios';

export const RECEIVE_CATEGORY_LIST = 'RECEIVE_CATEGORY_LIST';

export const receiveCategoryList = categories => ({
	type: RECEIVE_CATEGORY_LIST,
	categories
})

export const fetchCategories = () => dispatch => (
	axios.get('/categories',
			  {headers: {'Authorization' : "saviojoseph"}}
			 ).then(res => dispatch(receiveCategoryList(res.data.categories))).catch(err => console.log(err))

)
