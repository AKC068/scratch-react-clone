import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./tailwind.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { SnackbarProvider } from "notistack";

const root = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={4}>
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  root
);
