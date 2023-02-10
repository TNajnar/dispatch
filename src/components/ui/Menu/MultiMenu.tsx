import clsx from "clsx";
import { Timestamp } from "firebase/firestore";
import { ChangeEvent } from "react";

interface IMultiClassMenuProps {
  isColorClass?: boolean;
  carRepairDate?: Timestamp;
  classColor?: (colors: string) => void;
  handleRepairDate?: (repairD: Timestamp) => void;
}

const vehicleClasses = Object.freeze<Record<number, string | undefined>>({
  0: "bg-red-500",
  1: "bg-primary-yellow",
  2: "bg-gray-500",
  3: "bg-blue-400",
  4: "bg-pink-400",
  5: "bg-black",
});

const MultiClassMenu = ({
  isColorClass,
  carRepairDate,
  classColor,
  handleRepairDate,
}: IMultiClassMenuProps) => {
  const colors = [0, 1, 2, 3, 4, 5];

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    handleRepairDate?.(Timestamp.fromDate(selectedDate));
  };

  return (
    <div className="absolute -right-[192px] p-3 w-48 bg-secondary-gray shadow-[0_0px_14px_-4px_rgba(0,0,0,0.3)] rounded-lg">
      {isColorClass ? (
        <div className="flex flex-col justify-center">
          <p className="font-bold">Vyber barvu třídy:</p>
          <div className="flex justify-center pt-1 gap-2">
            {colors.slice(0, 6).map((_, index) => (
              <div
                key={index}
                onClick={() => classColor?.(vehicleClasses[index]!)}
                className={clsx(
                  "w-4 h-4 hover:border border-secondary-yellow rounded-full",
                  vehicleClasses[index]
                )}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <label className="font-bold">Datum opravy:</label>
          <input
            type="date"
            className="border border-primary-gray rounded-sm hover:border-black"
            value={
              carRepairDate &&
              carRepairDate.toDate().toISOString().substring(0, 10)
            }
            onChange={handleOnChange}
          />
        </div>
      )}
    </div>
  );
};

export default MultiClassMenu;
