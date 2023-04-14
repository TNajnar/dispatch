import { collection, doc } from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import { CarLeader, CarPhone, FromStation, ToStation } from "./components";
import { TManageTrainDoc } from "../types";
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
        <td className={clsx("border", darkMode)}>
          {vehicles.map(
            (vehicle, indexV) =>
              vehicle.spz && (
                <span
                  key={vehicle.id}
                  className={clsx("border-r", indexV > 0 ? "px-2" : "pr-2", darkMode)}
                >
                  {vehicle.spz}
                </span>
              )
          )}
        </td>
        <td className={clsx("text-center border", darkMode)}>{locomotive.lSpz}</td>
        <td className={`border ${darkMode}`}>
          {lines.map((line, index) => (
            <span
              key={line.id}
              className={clsx("border-r", index > 0 ? "px-2" : "pr-2", darkMode)}
            >
              {line.nameLine}
            </span>
          ))}
        </td>
        <td className={clsx("relative text-center border", darkMode)}>
          <CarLeader
            carLeader={carLeader}
            phone={phone}
            docRefToUpdate={docRefToUpdate}
            isDarkMode={isDarkMode}
            darkEdit={darkEdit}
          />
        </td>
        <td className={clsx("relative text-center border", darkMode)}>
          <CarPhone
            carLeader={carLeader}
            phone={phone}
            docRefToUpdate={docRefToUpdate}
            isDarkMode={isDarkMode}
            darkEdit={darkEdit}
          />
        </td>
        <td className={clsx("relative text-center border", darkMode)}>
          <FromStation
            stationNameFrom={fromStation}
            stationNameTo={toStation}
            docRefToUpdate={docRefToUpdate}
            isDarkMode={isDarkMode}
            darkEdit={darkEdit}
          />
        </td>
        <td className={clsx("relative text-center border", darkMode)}>
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
