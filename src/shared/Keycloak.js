import Keycloak from 'keycloak-js';

const keycloak  = new Keycloak({
  url: "https://localhost:8443",
  realm: "Keycloak-react-auth",
  clientId: "dispatch-client",
});

export default keycloak;