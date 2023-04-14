import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { KeycloakContextProvider } from "./helpers/KeycloakContext";
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <KeycloakContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </KeycloakContextProvider>
);
