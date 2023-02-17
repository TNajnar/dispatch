import { TManageTrainDoc } from "../types";
import { useState } from "react";
import { collection, doc } from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import CarLeader from "./CarLeader";
import CarPhone from "./CarPhone";

interface ITableRowProps {
  document: TManageTrainDoc;
}

const collectionRows = collection(database, "ManageTrains");

const TableRow = ({ document }: ITableRowProps) => {
  const [isEditableLeader, setIsEditableLeader] = useState<boolean>(false);
  const [isEditablePhone, setIsEditablePhone] = useState<boolean>(false);

  const vehicles = document.vehicles;
  const locomotive = document.locomotives;
  const lines = document.line;
  const carLeader = document.contact.carLeader;
  const phone = document.contact.phone;

  const docRefToUpdate = doc(collectionRows, document.id);

  return (
    <tbody className="w-full">
      <tr>
        <td className="">
          {vehicles.map((vehicle) => (
            <span key={vehicle.id} className="pr-2">
              {vehicle.spz}
            </span>
          ))}
        </td>
        <td className="text-center">{locomotive.lSpz}</td>
        <td>
          {lines.map((line) => (
            <span key={line.id} className="pr-2">
              {line.nameLine}
            </span>
          ))}
        </td>
        <td className="relative text-center">
          <CarLeader
            isEditable={isEditableLeader}
            carLeader={carLeader}
            phone={phone}
            docRefToUpdate={docRefToUpdate}
            setIsEditable={setIsEditableLeader}
          />
        </td>
        <td className="relative text-center">
          <CarPhone
            isEditable={isEditablePhone}
            carLeader={carLeader}
            phone={phone}
            docRefToUpdate={docRefToUpdate}
            setIsEditable={setIsEditablePhone}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default TableRow;
