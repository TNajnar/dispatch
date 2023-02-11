import clsx from "clsx";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

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

  //24=number of hours in a day || 60=number of minutes in an hour || 60=number of seconds in minute || 1000=number of miliseconds in second
  const carTomorrow = carRepairDate
    ? new Date(carRepairDate.toMillis() + 24 * 60 * 60 * 1000)
    : undefined;

  if (carTomorrow) {
    carRepairTomorrowDateTimestamp = Timestamp.fromDate(carTomorrow);
  }

  const informationDayRepairDone = // if repairs is over next day controll light is hidden
    carRepairTomorrowDateTimestamp?.seconds === todayTimestamp.seconds;

  const carIsRepaired = carRepairDate?.seconds !== todayTimestamp.seconds;

  const repairIsOver = carRepairDate?.seconds === todayTimestamp.seconds;

  const expiredDate =
    carRepairDate && carRepairDate?.seconds < todayTimestamp.seconds;

  return (
    <div>
      <div
        className={clsx(
          "absolute left-1 top-1 w-3 h-3 rounded-full",
          !carRepairDate && "hidden",
          informationDayRepairDone && "hidden",
          carIsRepaired && "bg-red-600",
          repairIsOver && "bg-green-600",
          expiredDate && "hidden"
        )}
      />
    </div>
  );
};

export default CarRepairSign;
