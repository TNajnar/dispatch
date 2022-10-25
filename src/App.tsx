import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LocomotiveManagemnt from "./pages/LocomotiveManagement";
import ParkedVagons from "./pages/ParkedVagons";

const NavItems = [
  {
    name: "Domů",
    icon: "",
    url: "/",
    element: <HomePage />,
  },
  {
    name: "Managemnet vozů",
    icon: "",
    url: "/manage-vagons",
    element: <LocomotiveManagemnt />,
  },
  {
    name: "Odstavené vozy",
    icon: "",
    url: "/parked-vagons",
    element: <ParkedVagons />,
  },
];

const App = () => {
  return (
    <Router>
      <nav className="flex items-center justify-around bg-[#ffe1a3] text-black pageLayout">
        <div className="flex">
          {NavItems.map(({ name, url }) => (
            <Link
              key={name}
              to={url}
              className="w-[150px] py-4 text-center hover:bg-white hover:border-gray-300 hover:shadow-md hover:rounded-sm"
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="text-black">StudentAgencyLOGO</div>
      </nav>

      <Routes>
        <Route>
          {NavItems.map(({ name, url, element }) => (
            <Route key={name} path={url} element={element}>
              {name}
            </Route>
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
