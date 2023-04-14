import clsx from "clsx";
import { Timestamp } from "firebase/firestore";

interface ICarDateInfoProps {
  date: Timestamp;
  isDarkMode: boolean;
}

const CarDateInfo = ({ date, isDarkMode }: ICarDateInfoProps) => {
  const formateDate = date
    .toDate()
    .toLocaleString("cs-CZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//, ".");

  return (
    <div
      className={clsx(
        "absolute -top-12 left-0 px-2 w-[125px] shadow-default rounded-lg",
        isDarkMode ? "bg-primary-darkBlue" : "bg-secondary-gray"
      )}
    >
      <p className="font-bold">Oprava končí:</p>
      <p>{formateDate}</p>
    </div>
  );
};

export default CarDateInfo;
