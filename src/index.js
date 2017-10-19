import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { BrowserRouter, Route } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import "semantic-ui-css/semantic.min.css";
import AddPost from "./post/AddPost";
import registerServiceWorker from "./registerServiceWorker";
import App from "./app/App";
import rootReducer from "./rootReducer";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
