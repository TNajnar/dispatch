import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { KeycloakContextProvider } from "./helpers/KeycloakContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <KeycloakContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </KeycloakContextProvider>
);
