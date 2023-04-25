import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import { store } from "redux/store";
import App from "./App";

import "react-notifications/lib/notifications.css";
import "./index.scss";
import "react-notifications/lib/notifications.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <NotificationContainer />
      </BrowserRouter>
    </Provider>
  </>
);
