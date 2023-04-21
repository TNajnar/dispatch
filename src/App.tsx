import { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import ParkedVehicles from "./pages/ParkedVehicles";
import MainComponent from "./components/MainComponent";
import Navbar from "./components/shared/Navbar";
import Export from "./pages/Export";
import HomePage from "./pages/HomePage";
import ManageTrains from "./pages/ManageTrains";

const App = () => {
  const { isDarkMode } = useContext(ThemeContext);

  document.body.style.backgroundColor = `${isDarkMode ? "#1B262C" : "#ffff"}`;

  return (
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
                <ParkedVehicles />
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
};

export default App;
