import { TManageTrainDoc } from "../types";
import { collection, doc } from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import CarLeader from "./CarLeader";
import CarPhone from "./CarPhone";
import clsx from "clsx";
import FromStation from "./FromStation";
import ToStation from "./ToStation";

interface ITableRowProps {
  document: TManageTrainDoc;
}

const collectionRows = collection(database, "ManageTrains");

const TableRow = ({ document }: ITableRowProps) => {
  const vehicles = document.vehicles;
  const locomotive = document.locomotives;
  const lines = document.line;
  const carLeader = document.contact.carLeader;
  const phone = document.contact.phone;
  const fromStation = document.station.from;
  const toStation = document.station.to;

  const docRefToUpdate = doc(collectionRows, document.id);

  return (
    <tbody className="w-full">
      <tr>
        <td>
          {vehicles.map((vehicle, indexV) => (
            <span
              key={vehicle.id}
              className={clsx(vehicle.spz && "border-r border-black", indexV > 0 ? "px-2" : "pr-2")}
            >
              {vehicle.spz}
            </span>
          ))}
        </td>
        <td className="text-center">{locomotive.lSpz}</td>
        <td>
          {lines.map((line, index) => (
            <span
              key={line.id}
              className={clsx("border-r border-black", index > 0 ? "px-2" : "pr-2")}
            >
              {line.nameLine}
            </span>
          ))}
        </td>
        <td className="relative text-center">
          <CarLeader carLeader={carLeader} phone={phone} docRefToUpdate={docRefToUpdate} />
        </td>
        <td className="relative text-center">
          <CarPhone carLeader={carLeader} phone={phone} docRefToUpdate={docRefToUpdate} />
        </td>
        <td className="relative text-center">
          <FromStation
            stationNameFrom={fromStation}
            stationNameTo={toStation}
            docRefToUpdate={docRefToUpdate}
          />
        </td>
        <td className="relative text-center">
          <ToStation
            stationNameFrom={fromStation}
            stationNameTo={toStation}
            docRefToUpdate={docRefToUpdate}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default TableRow;
