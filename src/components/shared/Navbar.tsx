import { useContext } from "react";
import { KeycloakContext } from "../../helpers/KeycloakContext";
import LogoutIcon from "@mui/icons-material/Logout";

const NavItems = [
  {
    name: "Domů",
    icon: "",
    url: "/",
  },
  {
    name: "Managemnet vozů",
    icon: "",
    url: "/manage-vehicles",
  },
  {
    name: "Odstavené vozy",
    icon: "",
    url: "/parked-vehicles",
  },
  {
    name: "Export dat",
    icon: "",
    url: "/export",
  },
];

const Navbar = () => {
  const { logout } = useContext(KeycloakContext);

  return (
    <nav className="flex items-center justify-around bg-primary-yellow text-black">
      <div className="flex">
        {NavItems.map(({ name, url }) => (
          <a
            key={name}
            href={url}
            className="py-4 w-[148px] text-center hover:bg-white hover:border-gray-300 hover:shadow-md hover:rounded-sm"
          >
            {name}
          </a>
        ))}
      </div>
      <div
        onClick={() => logout()}
        className="flex justify-center items-center py-4 w-[148px] gap-2 hover:bg-white hover:border-gray-300 hover:shadow-md hover:rounded-sm"
      >
        <LogoutIcon className="logout" />
        <button>Odhlasit se</button>
      </div>
    </nav>
  );
};

export default Navbar;
