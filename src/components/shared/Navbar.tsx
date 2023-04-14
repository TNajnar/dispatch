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

interface INavbarProps {
  isDarkMode: boolean;
}

const Navbar = ({ isDarkMode }: INavbarProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navigate = useNavigate();
  const { logout } = useContext(KeycloakContext);

  const darkNavbar = isDarkMode
    ? "bg-primary-darkBlue text-primary-lightBlue"
    : "bg-primary-yellow text-black";
  const darkLogout = isDarkMode ? "hover:bg-primary-blue" : "hover:bg-white";

  const handleNavItemClick = (index: number, url: string) => {
    setActiveIndex(index);
    navigate(url);
  };

  return (
    <nav className={clsx("flex items-center justify-around", darkNavbar)}>
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
              "py-4 w-[148px] text-center hover:border-gray-300 hover:shadow-md",
              isDarkMode ? "hover:bg-primary-blue" : "hover:bg-white",
              isDarkMode && activeIndex === index && "bg-primary-blue shadow-sm",
              !isDarkMode && activeIndex === index && "bg-white shadow-sm"
            )}
          >
            {name}
          </a>
        ))}
      </div>

      <div
        onClick={() => logout()}
        className={clsx(
          "flex justify-center items-center gap-2 py-4 w-[148px] hover:shadow-md",
          darkLogout
        )}
      >
        <LogoutIcon className="logout" />
        <button>Odhlasit se</button>
      </div>
    </nav>
  );
};

export default Navbar;
