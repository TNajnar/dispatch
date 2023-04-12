import clsx from "clsx";
import Switcher from "./shared/Switcher";

interface IMainComponentProps {
  children: JSX.Element;
  isDarkMode: boolean;
  setDarkMode: (checked: boolean) => void;
}

const MainComponent = ({ children, isDarkMode, setDarkMode }: IMainComponentProps) => (
  <div className={clsx("contentLayout", isDarkMode && 'text-[#BBE1FA]')}>
    <Switcher isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
    {children}
  </div>
);


export default MainComponent;
