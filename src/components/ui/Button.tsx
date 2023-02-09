import clsx from "clsx";

export interface IButtonProps {
  text?: string;
  clasName?: string;
  isRounded?: boolean;
  onClick?: () => void;
}

const Button = ({ text, clasName, isRounded, onClick }: IButtonProps) => (
  <button
    className={clsx(
      "flex justify-center items-center text-3xl",
      isRounded &&
        "w-12 h-12 bg-primary-yellow border-4 border-black rounded-full",
      clasName
    )}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
