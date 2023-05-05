import { Timestamp } from "firebase/firestore";
import clsx from "clsx";

interface ICarRepairLightProps {
  carRepairDate: Timestamp;
  setShowDateInfo: (value: boolean) => void;
}

const today = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
const todayTimestamp = Timestamp.fromDate(today);

const CarRepairLight = ({ carRepairDate, setShowDateInfo }: ICarRepairLightProps) => {
  let carRepairTomorrowDateTimestamp;

  //24=number of hours in a day || 60=number of minutes in an hour || 60=number of seconds in minute || 1000=number of miliseconds in second
  const carTomorrow = carRepairDate ? new Date(carRepairDate.toMillis() + 24 * 60 * 60 * 1000) : undefined;

  if (carTomorrow) {
    carRepairTomorrowDateTimestamp = Timestamp.fromDate(carTomorrow);
  }

  // if repairs is over next day controll light is hidden
  const informationDayRepairDone = carRepairTomorrowDateTimestamp?.seconds === todayTimestamp.seconds;

  const carIsRepaired = carRepairDate?.seconds !== todayTimestamp.seconds;

  // car is ready
  const repairIsOver = carRepairDate?.seconds === todayTimestamp.seconds;

  // after repair, car is ready control light is hidden
  const expiredDate = carRepairDate && carRepairDate?.seconds < todayTimestamp.seconds;

  return (
    <div>
      <div
        onMouseEnter={() => setShowDateInfo?.(true)}
        onMouseLeave={() => setShowDateInfo?.(false)}
        className={clsx(
          "absolute left-1 top-1 w-3 h-3 rounded-full",
          !carRepairDate && "hidden",
          informationDayRepairDone && "hidden",
          carIsRepaired && "bg-red-600",
          repairIsOver && "bg-secondary-green",
          expiredDate && "hidden"
        )}
      />
    </div>
  );
};

export default CarRepairLight;
