import { collection, doc } from "firebase/firestore";
import database from "../../../shared/firebaseconfig";
import { CarLeader, CarPhone, FromStation, ToStation } from "./components";
import { TManageTrainDoc } from "../../types";
import clsx from "clsx";

interface ITableRowProps {
  document: TManageTrainDoc;
  isDarkMode: boolean;
}

const collectionRows = collection(database, "ManageTrains");

const TableRow = ({ document, isDarkMode }: ITableRowProps) => {
  const vehicles = document.vehicles;
  const locomotive = document.locomotives;
  const lines = document.line;
  const carLeader = document.contact.carLeader;
  const phone = document.contact.phone;
  const fromStation = document.station.from;
  const toStation = document.station.to;

  const darkMode = isDarkMode ? "border-primary-lightBlue" : "border-black";
  const darkEdit = isDarkMode ? "hover:text-primary-blue" : "hover:text-primary-yellow";

  const docRefToUpdate = doc(collectionRows, document.id);

  return (
    <tbody className="w-full">
      <tr>
        <td className={clsx("border text-left", darkMode)}>
          {vehicles.map(
            (vehicle, indexV) =>
              vehicle.spz && (
                <span key={vehicle.id} className={clsx("border-r", indexV > 0 ? "px-2" : "pr-2", darkMode)}>
                  {vehicle.spz}
                </span>
              )
          )}
        </td>
        <td className={clsx("border", darkMode)}>{locomotive.lSpz}</td>
        <td className={`border text-left ${darkMode}`}>
          {lines.map((line, index) => (
            <span key={line.id} className={clsx("border-r", index > 0 ? "px-2" : "pr-2", darkMode)}>
              {line.nameLine}
            </span>
          ))}
        </td>
        <td className={clsx("relative border w-[13%]", darkMode)}>
          <CarLeader
            carLeader={carLeader}
            phone={phone}
            docRefToUpdate={docRefToUpdate}
            isDarkMode={isDarkMode}
            darkEdit={darkEdit}
          />
        </td>
        <td className={clsx("relative border w-[12%]", darkMode)}>
          <CarPhone
            carLeader={carLeader}
            phone={phone}
            docRefToUpdate={docRefToUpdate}
            isDarkMode={isDarkMode}
            darkEdit={darkEdit}
          />
        </td>
        <td className={clsx("relative border w-[10%]", darkMode)}>
          <FromStation
            stationNameFrom={fromStation}
            stationNameTo={toStation}
            docRefToUpdate={docRefToUpdate}
            isDarkMode={isDarkMode}
            darkEdit={darkEdit}
          />
        </td>
        <td className={clsx("relative border w-[10%]", darkMode)}>
          <ToStation
            stationNameFrom={fromStation}
            stationNameTo={toStation}
            docRefToUpdate={docRefToUpdate}
            isDarkMode={isDarkMode}
            darkEdit={darkEdit}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default TableRow;
