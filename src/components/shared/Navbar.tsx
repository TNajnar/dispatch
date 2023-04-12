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

  const handleNavItemClick = (index: number, url: string) => {
    setActiveIndex(index);
    navigate(url);
  };
  
  return (
    <nav className={clsx("flex items-center justify-around", isDarkMode ? 'bg-[#0F4C75] text-[#BBE1FA]' : 'bg-primary-yellow text-black')}>
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
              isDarkMode ? 'hover:bg-[#3282B8]' : 'hover:bg-white',
              isDarkMode && activeIndex === index && "bg-[#3282B8] shadow-sm",
              !isDarkMode && activeIndex === index && "bg-white shadow-sm",
            )}
          >
            {name}
          </a>
        ))}
      </div>

      <div
        onClick={() => logout()}
        className={clsx("flex justify-center items-center py-4 w-[148px] gap-2 hover:shadow-md", isDarkMode ? 'hover:bg-[#3282B8]' : 'hover:bg-white hover:border-gray-300')}
      >
        <LogoutIcon className="logout" />
        <button>Odhlasit se</button>
      </div>
    </nav>
  );
};

export default Navbar;
