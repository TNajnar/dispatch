import clsx from "clsx";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";

interface ICarRepairSignProps {
  carRepairDate?: Timestamp;
}

const today = new Date(
  Date.UTC(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  )
);
const todayTimestamp = Timestamp.fromDate(today);
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const tomorrowTimestamp = Timestamp.fromDate(tomorrow);

const CarRepairSign = ({ carRepairDate }: ICarRepairSignProps) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  // console.log(tomorrowTimestamp.toDate().toISOString().substring(0, 10));

  return (
    <div>
      <div
        className={clsx(
          "absolute left-1 top-1 w-3 h-3 rounded-full",
          !carRepairDate && "hidden",
          carRepairDate &&
            carRepairDate?.seconds > tomorrowTimestamp.seconds &&
            "hidden",
          carRepairDate?.seconds !== todayTimestamp.seconds && "bg-red-600",
          carRepairDate?.seconds === todayTimestamp.seconds && "bg-green-600"
        )}
      />
    </div>
  );
};

export default CarRepairSign;
