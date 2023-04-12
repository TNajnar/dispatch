import { createContext, useEffect, useState } from "react";
import Keycloak from "keycloak-js";

let initOptions = {
  url: "https://localhost:8443",
  realm: "Dispatch",
  clientId: "dispatch-client",
  onLoad: "login-required",
  KeycloakResponseType: "code",
};

interface IKeycloakContextProps {
  keycloakValue: Keycloak | null;
  authenticated: boolean;
  logout: () => void;
}

const KeycloakContext = createContext<IKeycloakContextProps>({
  keycloakValue: null,
  authenticated: false,
  logout: () => {},
});

const KeycloakContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [keycloackValue, setKeycloackValue] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  const setKeycloak = () => {
    const keycloak = new Keycloak(initOptions);
    keycloak
      .init({ onLoad: "login-required" })
      .then(function (authenticated) {
        if (authenticated) {
          setKeycloackValue(keycloak);
          setAuthenticated(true);
        }
      })
      .catch(function () {
        console.log("failed to initialized");
      });
  };

  const logout = () => {
    setAuthenticated(false);
    setKeycloackValue(null);
    if (keycloackValue) {
      keycloackValue?.logout();
    }
  };

  useEffect(() => {
    setKeycloak();
  }, []);

  return (
    <KeycloakContext.Provider value={{ keycloakValue: keycloackValue, authenticated, logout }}>
      {children}
    </KeycloakContext.Provider>
  );
};

export { KeycloakContextProvider, KeycloakContext };
