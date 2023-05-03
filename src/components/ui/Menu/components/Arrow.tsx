import clsx from "clsx";

interface IArrowProps {
  isTop?: boolean;
  isLineMenu?: boolean;
  isDarkMode: boolean;
}

const Arrow = ({ isTop, isLineMenu, isDarkMode }: IArrowProps) => {
  const arrowClass = isTop ? "arrow-top -top-2" : "arrow-down -bottom-2";
  const positionClass = isLineMenu ? "right-2" : "left-3";
  const borderColor = isDarkMode ? "border-primary-darkBlue" : "border-white";

  return <div className={clsx("absolute", arrowClass, positionClass, borderColor)} />;
};

export default Arrow;
