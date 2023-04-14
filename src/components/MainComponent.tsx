import Switcher from "./shared/Switcher";
import clsx from "clsx";

interface IMainComponentProps {
  children: JSX.Element;
  isDarkMode: boolean;
  setDarkMode: (checked: boolean) => void;
}

const MainComponent = ({ children, isDarkMode, setDarkMode }: IMainComponentProps) => (
  <div className={clsx("contentLayout", isDarkMode && "text-primary-lightBlue")}>
    <Switcher isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
    {children}
  </div>
);

export default MainComponent;
