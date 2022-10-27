import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainComponent from "./components/MainComponent";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LocomotiveManagement from "./pages/LocomotiveManagement";
import ParkedVagons from "./pages/ParkedVehicles";

const App = () => {
  return (
    <div className="pageLayout">
      <Navbar />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainComponent>
                <HomePage />
              </MainComponent>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/manage-vehicles"
            element={
              <MainComponent>
                <LocomotiveManagement />
              </MainComponent>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/parked-vehicles"
            element={
              <MainComponent>
                <ParkedVagons />
              </MainComponent>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
