import clsx from "clsx";

export interface IButtonProps {
  text?: string;
  clasName?: string;
  isRounded?: boolean;
  isDarkMode?: boolean;
  onClick?: () => void;
}

const Button = ({ text, clasName, isRounded, isDarkMode, onClick }: IButtonProps) => (
  <button
    className={clsx(
      "flex justify-center text-center text-3xl hover:scale-110",
      isRounded && "w-12 h-12 border-4 border-black rounded-full",
      isDarkMode && "bg-primary-blue",
      !isDarkMode && isRounded && "bg-primary-yellow",
      clasName
    )}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
