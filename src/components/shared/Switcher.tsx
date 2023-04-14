import { DarkModeSwitch } from "react-toggle-dark-mode";

interface ISwitcherProps {
  isDarkMode: boolean;
  setDarkMode: (checked: boolean) => void;
}

const Switcher = ({ isDarkMode, setDarkMode }: ISwitcherProps) => {
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  return (
    <DarkModeSwitch
      className="absolute top-3"
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={35}
    />
  );
};

export default Switcher;
