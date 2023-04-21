import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { KeycloakContextProvider } from "./context/KeycloakContext";
import "./styles/index.css";
import { ThemeContextProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <KeycloakContextProvider>
    <ThemeContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ThemeContextProvider>
  </KeycloakContextProvider>
);
