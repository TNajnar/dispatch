import { useState } from "react";
import { collection, doc } from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import { nanoid } from "nanoid";
import Vehicle from "../Train/Vehicle";
import Locomotive from "../Train/Locomotive";
import useClickAbleMenu from "../../hooks/useClickAbleMenu";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { useVehicleTransaction, useLocoTransaction } from '../../hooks/Firestore'
import { TParkedVehicleDoc, TVehicleObject } from "../types";
import { Button } from "../ui";

interface ITrainRailProps {
  document: TParkedVehicleDoc;
  getAllCars: TVehicleObject[][];
  rowIndex: number;
}

const collectionRows = collection(database, "ParkedVehicles");

const TrainRail = ({ document, getAllCars, rowIndex }: ITrainRailProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<string>("");

  const id = nanoid();

  const docRefToUpdate = doc(collectionRows, document.id);

  const collectionName = "ParkedVehicles";
  const nameRail = document.nameRail;
  const parkedVehicles = document.vehicles;

  const transferredCars = getAllCars.flat();

  useClickAbleMenu(id, setIsMenuOpen);

  const { isDragging, handleDragging, handleUpdateList } = useDragAndDrop(
    transferredCars,
    collectionName
  );

  const { addVehicleTransaction } = useVehicleTransaction(document.id, docRefToUpdate);

  const { addLocTransaction } = useLocoTransaction(document.id, docRefToUpdate);

  const addVehicle = async () => {
    addVehicleTransaction(id, "", "", "");
  };

  const addLocomotive = async () => {
    addLocTransaction(id, "", "");
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

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault();

  return (
    <div className="flex items-center py-4 h-[101px] gap-4 border-b border-primary-gray">
      {!!nameRail && (
        <h2 className="mr-2 w-24 text-h3 font-bold border-r border-black">{nameRail}</h2>
      )}
      <div
        className="flex gap-5 w-full h-full"
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
      <div className="absolute right-0 bottom-2 flex flex-col justify-center items-center gap-1">
        <Button text="L" onClick={addLocomotive} isRounded={true} />
        <Button text="V" onClick={addVehicle} isRounded={true} />
      </div>
    </div>
  );
};

export default TrainRail;
