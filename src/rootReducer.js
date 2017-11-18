import { combineReducers } from 'redux';
import postReducer from "./post/postReducer";
import categoryReducer from './category/categoryReducer';
import commentReducer from "./comment/commentReducer";

export default combineReducers({
	posts: postReducer,
  categories: categoryReducer,
  comments: commentReducer
  });
