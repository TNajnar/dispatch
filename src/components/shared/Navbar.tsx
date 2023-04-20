import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { KeycloakContext } from "../../helpers/KeycloakContext";
import { ThemeContext } from "../../helpers/ThemeContext";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import clsx from "clsx";
import data from "../../data.json";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout } = useContext(KeycloakContext);

  const { isDarkMode } = useContext(ThemeContext);

  const NavItems = data.NavItems;

  const darkNavbar = isDarkMode
    ? "bg-primary-darkBlue text-primary-lightBlue"
    : "bg-primary-yellow text-black";
  const darkLogout = isDarkMode ? "hover:bg-primary-blue" : "hover:bg-white";

  const handleNavItemClick = (url: string) => {
    setActiveTab(url);
    navigate(url);
  };

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  return (
    <nav className={clsx("flex items-center justify-around", darkNavbar)}>
      <div className="flex">
        {NavItems.map(({ name, url }, index) => (
          <a
            key={name}
            href={url}
            onClick={(event) => {
              event.preventDefault();
              handleNavItemClick(url);
            }}
            className={clsx(
              "py-4 w-[148px] text-center hover:border-gray-300 hover:shadow-md",
              isDarkMode ? "hover:bg-primary-blue" : "hover:bg-white",
              isDarkMode && activeTab === url && "bg-primary-blue shadow-sm",
              !isDarkMode && activeTab === url && "bg-white shadow-sm",
              index === 0 && "flex justify-center items-center gap-3"
            )}
          >
            {index === 0 && <HomeIcon />}
            {index === 3 && <FileDownloadIcon className="mr-3" />}
            {name}
          </a>
        ))}
      </div>

      <div
        onClick={() => logout()}
        className={clsx(
          "flex justify-center items-center gap-2 py-[17px] w-[148px] hover:shadow-md",
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
