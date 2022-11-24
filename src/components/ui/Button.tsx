import clsx from "clsx";

export interface IButtonProps {
  text?: string;
  clasName?: string;
  isRounded?: boolean;
  onClick?: () => void;
}

const Button = ({ text, clasName, isRounded, onClick }: IButtonProps) => (
  <button
    onClick={onClick}
    className={clsx(
      "flex items-center justify-center text-3xl",
      isRounded &&
        "w-12 h-12 border-4 bg-primary-yellow rounded-full divide-x-4 border-black",
      clasName
    )}
  >
    {text}
  </button>
);

export default Button;
