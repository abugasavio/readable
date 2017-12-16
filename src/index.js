import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import "semantic-ui-css/semantic.min.css";
import throttle from 'lodash/throttle'
import { fetchCategories } from './category/categoryActions';
import { fetchPosts } from './post/PostActions'
import { loadState, saveState } from './localStorage';
import registerServiceWorker from "./registerServiceWorker";
import App from "./app/App";
import rootReducer from "./rootReducer";

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

store.dispatch(fetchPosts())
store.dispatch(fetchCategories())

store.subscribe(throttle(() => {
  saveState({
    posts: store.getState().posts,
    categories: store.getState().categories,
    comments: store.getState().comments
  });
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
