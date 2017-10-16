import React from 'react';
import ReactDOM from 'react-dom';
import 'bulmaswatch/journal/bulmaswatch.min.css'
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import postReducer from './post/postReducer';

let reducers = combineReducers({
	posts: postReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose

let store = createStore(reducers, composeEnhancers(
									applyMiddleware(thunk, logger))
								)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
