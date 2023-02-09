import {
  arrayUnion,
  collection,
  doc,
  runTransaction,
} from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import Vehicle from "../Train/Vehicle";
import Button from "../ui/Button";
import { nanoid } from "nanoid";
import { TParkedVehicleDoc } from "../types";
import Locomotive from "../Train/Locomotive";
import useClickAbleMenu from "../../hooks/useClickAbleMenu";
import { useState } from "react";

interface ITrainRailProps {
  document: TParkedVehicleDoc;
  rowIndex?: number;
}

const collectionRows = collection(database, "ParkedVehicles");

const TrainRail = ({ document, rowIndex }: ITrainRailProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<string>("");

  const nameRail = document.nameRail;
  const parkedVehicles = document.vehicles;
  const collectionName = "ParkedVehicles";

  const id = nanoid();

  const addVehicle = async () => {
    const docRefToUpdate = doc(collectionRows, document.id);
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const newVehicle = (sfDoc.data().vehicles = arrayUnion({
        id: id,
        spz: "",
        class: "",
        repairDate: "",
        isVehicle: true,
      }));
      transaction.update(docRefToUpdate, { vehicles: newVehicle });
    });
  };

  const addLocomotive = async () => {
    const docRefToUpdate = doc(collectionRows, document.id);
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const newLocomotive = (sfDoc.data().vehicles = arrayUnion({
        id: id,
        spz: "",
        repairDate: "",
        isVehicle: false,
      }));
      transaction.update(docRefToUpdate, { vehicles: newLocomotive });
    });
    setIsMenuOpen("");
  };

  const handleOpenMenu = (id: string) => {
    setIsMenuOpen(() => id);
  };

  useClickAbleMenu(id, setIsMenuOpen);

  return (
    <div className="flex items-center py-4 gap-4 border-b border-primary-gray">
      {!!nameRail && (
        <h2 className="w-20 text-h3 font-bold border-r border-black">
          {nameRail}
        </h2>
      )}
      {parkedVehicles.map((car) => (
        <div
          onClick={() => handleOpenMenu(car.id)}
          key={car.id}
          className="relative flex justify-center"
        >
          {car.isVehicle ? (
            <Vehicle
              id={car.id}
              vehicleSpz={car.spz}
              vehicleClass={car.class}
              vehicleRepairDate={car.repairDate}
              documentID={document.id}
              collectionName={collectionName}
              rowIndex={rowIndex}
              setIsMenuOpen={setIsMenuOpen}
              isMenuOpen={isMenuOpen}
            />
          ) : (
            <Locomotive
              id={car.id}
              locomotiveSpz={car.spz}
              locomotiveRepairDate={car.repairDate}
              documentID={document.id}
              collectionName={collectionName}
              isParked={true}
              rowIndex={rowIndex}
              setIsMenuOpen={setIsMenuOpen}
              isMenuOpen={isMenuOpen}
            />
          )}
        </div>
      ))}
      <div className="flex-1" />
      <div>
        <Button text="L" onClick={addLocomotive} isRounded={true} />
        <Button text="+" onClick={addVehicle} isRounded={true} />
      </div>
    </div>
  );
};

export default TrainRail;
