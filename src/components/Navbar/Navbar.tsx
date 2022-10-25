import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LocomotiveManagemnt } from "../../pages/LocomotiveManagement";
import ParkedVagons from "../../pages/ParkedVagons";

const NavItems = [
  {
    name: "Managemnet vozů",
    icon: "",
    url: "/",
    element: <LocomotiveManagemnt />,
  },
  {
    name: "Odstavené vozy",
    icon: "",
    url: "/parked-vagons",
    element: <ParkedVagons />,
  },
];

const Navbar = () => {
  return (
    <Router>
      <nav className="flex items-center justify-around bg-[#ffe1a3] text-black">
        <div className="flex">
          {NavItems.map(({ name, url }) => (
            <Link
              key={name}
              to={url}
              className="p-4 hover:bg-white hover:border-gray-300 hover:shadow-md hover:rounded-sm"
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

export default Navbar;
