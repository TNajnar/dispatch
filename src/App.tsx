import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainComponent from "./components/MainComponent";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ManageTrains from "./pages/ManageTrains";
import ParkedVagons from "./pages/ParkedVehicles";

const App = () => (
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
              <ManageTrains />
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

export default App;
