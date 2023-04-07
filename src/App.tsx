import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainComponent from "./components/MainComponent";
import Navbar from "./components/shared/Navbar";
import Export from "./pages/Export";
import HomePage from "./pages/HomePage";
import ManageTrains from "./pages/ManageTrains";
import ParkedVagons from "./pages/ParkedVehicles";

const App = () => (
  <div className="pageLayout">
    <Router>
      <Navbar />
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
      <Routes>
        <Route
          path="/export"
          element={
            <MainComponent>
              <Export />
            </MainComponent>
          }
        ></Route>
      </Routes>
    </Router>
  </div>
);

export default App;
