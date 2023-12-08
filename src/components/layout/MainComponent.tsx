import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Switcher from "../shared/Switcher";
import clsx from "clsx";

interface IMainComponentProps {
  children: JSX.Element;
}

const MainComponent = ({ children }: IMainComponentProps) => {
  const { isDarkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className={clsx("contentLayout", isDarkMode && "text-primary-lightBlue")}>
      <Switcher isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
      {children}
    </div>
  );
};

export default MainComponent;
