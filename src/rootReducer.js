import { combineReducers } from 'redux';
import postReducer from "./post/postReducer";
import categoryReducer from './category/categoryReducer';

export default combineReducers({
	posts: postReducer,
	categories: categoryReducer
  });
