import React from "react";
import ReactDOM from "react-dom";
import AbagoGame from "./AbacoGame";
import App from "./App";
import "./index.css";
import Redux from "./redux";
import { Provider } from "react-redux";
import { store } from "./store/index";
import SagaRedux from "./redux-saga-page";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <AbagoGame /> */}
      {/* <App /> */}
      {/* <Redux /> */}
      <SagaRedux />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
