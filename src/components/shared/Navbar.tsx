import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeycloakContext } from "../../helpers/KeycloakContext";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import clsx from "clsx";
import data from "../../data.json";

interface INavbarProps {
  isDarkMode: boolean;
}

const Navbar = ({ isDarkMode }: INavbarProps) => {
  const [activeTab, setActiveTab] = useState<string>("");
  const navigate = useNavigate();
  const { logout } = useContext(KeycloakContext);

  const NavItems = data.NavItems;

  const darkNavbar = isDarkMode
    ? "bg-primary-darkBlue text-primary-lightBlue"
    : "bg-primary-yellow text-black";
  const darkLogout = isDarkMode ? "hover:bg-primary-blue" : "hover:bg-white";

  const handleNavItemClick = (url: string) => {
    setActiveTab(url);
    localStorage.setItem("activeIndex", url.toString()); // store the active index in local storage
    navigate(url);
  };

  useEffect(() => {
    const storedIndex = localStorage.getItem("activeIndex");
    if (storedIndex) {
      setActiveTab(storedIndex);
    }
  }, []);

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
              !isDarkMode && activeTab === url && "bg-white shadow-sm"
            )}
          >
            {index === 0 && <HomeIcon className="" />}
            {index === 3 && <FileDownloadIcon className="export" />}
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
