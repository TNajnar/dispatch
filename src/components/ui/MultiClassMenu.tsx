import { useState } from "react";

interface IMultiClassMenu {
  classColor?: (colors: string) => void;
}

const vehicleClasses = Object.freeze<Record<number, string | undefined>>({
  0: "red-500",
  1: "primary-yellow",
  2: "gray-500",
  3: "blue-400",
  4: "pink-400",
  5: "black",
});

const MultiClassMenu = ({ classColor }: IMultiClassMenu) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const colors = [0, 1, 2, 3, 4, 5];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute -right-[168px] py-3 bg-primary-gray shadow-[0_0px_14px_-4px_rgba(0,0,0,0.3)] rounded-lg"
    >
      Vyber barvu podle vozu
      <div className="flex justify-center pt-1 gap-2">
        {colors.slice(0, 6).map((_, index) => (
          <div
            key={index}
            onClick={() => classColor?.(vehicleClasses[index]!)}
            className={`w-4 h-4 bg-${vehicleClasses[index]} rounded-full hover:border border-secondary-yellow`}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiClassMenu;
