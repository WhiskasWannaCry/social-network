import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import NotifyMessage from "./shared/NotifyMessage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SnackbarProvider
    maxSnack={4}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    Components={{
      notifyMessage: NotifyMessage,
    }}
  >
    <Router>
      <App />
    </Router>
  </SnackbarProvider>
);
