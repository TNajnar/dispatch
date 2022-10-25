import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LocomotiveManagement from "./pages/LocomotiveManagement";
import ParkedVagons from "./pages/ParkedVagons";

const App = () => {
  let contentContainer;
  switch (window.location.pathname) {
    case "/":
      contentContainer = <HomePage />;
      break;
    case "/manage-vagons":
      contentContainer = <LocomotiveManagement />;
      break;
    case "/parked-vagons":
      contentContainer = <ParkedVagons />;
      break;
    default:
      break;
  }

  return (
    <div className="pageLayout">
      <Navbar />
      <div className="contentLayout">{contentContainer}</div>
    </div>
  );
};

export default App;
