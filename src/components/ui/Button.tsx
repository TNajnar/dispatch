import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import clsx from "clsx";

export interface IButtonProps {
  text?: string;
  clasName?: string;
  isRounded?: boolean;
  onClick?: () => void;
}

const Button = ({ text, clasName, isRounded, onClick }: IButtonProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <button
      className={clsx(
        "flex justify-center text-center text-3xl hover:scale-110",
        isRounded && "w-12 h-12 border-4 border-black rounded-full",
        isDarkMode && isRounded && "bg-primary-blue",
        !isDarkMode && isRounded && "bg-primary-yellow",
        clasName
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
