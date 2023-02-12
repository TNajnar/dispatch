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
import { TParkedVehicleDoc, TVehicleObject } from "../types";
import Locomotive from "../Train/Locomotive";
import useClickAbleMenu from "../../hooks/useClickAbleMenu";
import { useState } from "react";
import useDragAndDrop from "../../hooks/useDragAndDrop";

interface ITrainRailProps {
  document: TParkedVehicleDoc;
  getAllCars: TVehicleObject[][];
  rowIndex: number;
}

const collectionRows = collection(database, "ParkedVehicles");

const TrainRail = ({ document, getAllCars, rowIndex }: ITrainRailProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<string>("");

  const id = nanoid();

  const collectionName = "ParkedVehicles";
  const nameRail = document.nameRail;
  const parkedVehicles = document.vehicles;

  const transferredCars = getAllCars.flat();

  useClickAbleMenu(id, setIsMenuOpen);

  const { isDragging, handleDragging, handleUpdateList } = useDragAndDrop(
    transferredCars,
    collectionName
  );

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
        vehicleDoc: document.id,
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
        vehicleDoc: document.id,
      }));
      transaction.update(docRefToUpdate, { vehicles: newLocomotive });
    });
    setIsMenuOpen("");
  };

  const handleOpenMenu = (id: string) => {
    setIsMenuOpen(() => id);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event?.preventDefault();
    handleUpdateList(event.dataTransfer.getData("id"), document.id);
    handleDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) =>
    event.preventDefault();

  return (
    <div className="flex items-center py-4 gap-4 border-b border-primary-gray">
      {!!nameRail && (
        <h2 className="w-20 text-h3 font-bold border-r border-black">
          {nameRail}
        </h2>
      )}
      <div
        className="flex gap-5 w-full"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {parkedVehicles.map((car) => (
          <div key={car.id} onClick={() => handleOpenMenu(car.id)}>
            {car.isVehicle ? (
              <Vehicle
                id={car.id}
                vehicleSpz={car.spz}
                vehicleClass={car.class}
                vehicleRepairDate={car.repairDate}
                vehicleDoc={car.vehicleDoc}
                documentID={document.id}
                rowIndex={rowIndex}
                collectionName={collectionName}
                setIsMenuOpen={setIsMenuOpen}
                isMenuOpen={isMenuOpen}
              />
            ) : (
              <Locomotive
                id={car.id}
                locomotiveSpz={car.spz}
                locomotiveRepairDate={car.repairDate}
                locomotiveDoc={car.vehicleDoc}
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
      </div>
      <div className="flex-1" />
      <div>
        <Button text="L" onClick={addLocomotive} isRounded={true} />
        <Button text="+" onClick={addVehicle} isRounded={true} />
      </div>
    </div>
  );
};

export default TrainRail;
