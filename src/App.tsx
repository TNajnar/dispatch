import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainComponent from "./components/MainComponent";
import Navbar from "./components/shared/Navbar";
import Export from "./pages/Export";
import HomePage from "./pages/HomePage";
import ManageTrains from "./pages/ManageTrains";
import ParkedVagons from "./pages/ParkedVehicles";

const App = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  document.body.style.backgroundColor = `${isDarkMode ? "#1B262C" : "#ffff"}`;

  return (
    <div className="pageLayout">
      <Router>
        <Navbar isDarkMode={isDarkMode} />
        <Routes>
          <Route
            path="/"
            element={
              <MainComponent isDarkMode={isDarkMode} setDarkMode={setDarkMode}>
                <HomePage />
              </MainComponent>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/manage-vehicles"
            element={
              <MainComponent isDarkMode={isDarkMode} setDarkMode={setDarkMode}>
                <ManageTrains isDarkMode={isDarkMode} />
              </MainComponent>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/parked-vehicles"
            element={
              <MainComponent isDarkMode={isDarkMode} setDarkMode={setDarkMode}>
                <ParkedVagons isDarkMode={isDarkMode} />
              </MainComponent>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/export"
            element={
              <MainComponent isDarkMode={isDarkMode} setDarkMode={setDarkMode}>
                <Export isDarkMode={isDarkMode} />
              </MainComponent>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
