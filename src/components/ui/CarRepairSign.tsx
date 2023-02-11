import clsx from "clsx";
import { Timestamp } from "firebase/firestore";

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

const CarRepairSign = ({ carRepairDate }: ICarRepairSignProps) => {
  let carRepairTomorrowDateTimestamp;

  const carTomorrow = carRepairDate
    ? new Date(carRepairDate.toMillis() + 24 * 60 * 60 * 1000)
    : undefined;

  if (carTomorrow) {
    carRepairTomorrowDateTimestamp = Timestamp.fromDate(carTomorrow);
  }

  return (
    <div>
      <div
        className={clsx(
          "absolute left-1 top-1 w-3 h-3 rounded-full",
          !carRepairDate && "hidden",
          carRepairTomorrowDateTimestamp?.seconds === todayTimestamp.seconds &&
            "hidden",
          carRepairDate?.seconds !== todayTimestamp.seconds && "bg-red-600",
          carRepairDate?.seconds === todayTimestamp.seconds && "bg-green-600"
        )}
      />
    </div>
  );
};

export default CarRepairSign;
