import { useKeycloak } from "@react-keycloak/web";

// This code checks if a user trying to access a protected route is authenticated,
// and either displays the protected route when a user is authenticated,
// or displays nothing if the user is unauthenticated

const PrivateRoute = ({ children }: any) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  return isLoggedIn ? children : null;
};

export default PrivateRoute;
