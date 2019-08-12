import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import configureStore from "./store";

import Board from "./components/Board";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Board />
  </Provider>,
  document.getElementById("app")
);
