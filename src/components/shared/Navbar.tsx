import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeycloakContext } from "../../helpers/KeycloakContext";
import LogoutIcon from "@mui/icons-material/Logout";
import clsx from "clsx";

const NavItems = [
  {
    name: "Domů",
    url: "/",
  },
  {
    name: "Managemnet vozů",
    url: "/manage-vehicles",
  },
  {
    name: "Odstavené vozy",
    url: "/parked-vehicles",
  },
  {
    name: "Export dat",
    url: "/export",
  },
];

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navigate = useNavigate();
  const { logout } = useContext(KeycloakContext);

  const handleNavItemClick = (index: number, url: string) => {
    setActiveIndex(index);
    navigate(url);
  };

  return (
    <nav className="flex items-center justify-around bg-primary-yellow text-black">
      <div className="flex">
        {NavItems.map(({ name, url }, index) => (
          <a
            key={name}
            href={url}
            onClick={(event) => {
              event.preventDefault();
              handleNavItemClick(index, url);
            }}
            className={clsx(
              "py-4 w-[148px] text-center shadow-sm hover:bg-white hover:border-gray-300 hover:shadow-md hover:rounded-sm",
              activeIndex === index && "bg-white"
            )}
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
