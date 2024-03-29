import { ReactNode, createContext, useEffect, useState } from "react";

interface IThemeContextProps {
  isDarkMode: boolean;
  setDarkMode: (checked: boolean) => void;
}

const ThemeContext = createContext<IThemeContextProps>({
  isDarkMode: false,
  setDarkMode: () => {},
});

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setDarkMode] = useState<boolean>(() => {
    // Get store value from local storage
    const storedMode = localStorage.getItem("isDarkMode");
    return storedMode !== null ? JSON.parse(storedMode) : false;
  });

  useEffect(() => {
    // Save mode to local storage
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return <ThemeContext.Provider value={{ isDarkMode, setDarkMode }}>{children}</ThemeContext.Provider>;
};

export { ThemeContextProvider, ThemeContext };
