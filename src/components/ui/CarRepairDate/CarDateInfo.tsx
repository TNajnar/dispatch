import { Timestamp } from "firebase/firestore";

interface ICarDateInfoProps {
  date: Timestamp;
}

const CarDateInfo = ({ date }: ICarDateInfoProps) => {
  const formateDate = date
    .toDate()
    .toLocaleString("cs-CZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//, ".");

  return (
    <div className="absolute -top-12 left-0 px-2 w-[125px] bg-secondary-gray shadow-default rounded-lg">
      <p className="font-bold">Oprava končí:</p>
      <p>{formateDate}</p>
    </div>
  );
};

export default CarDateInfo;
