import { collection, doc } from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import Vehicle from "../Train/Vehicle";
import Button from "../ui/Button";
import { nanoid } from "nanoid";
import { TParkedVehicleDoc, TVehicleObject } from "../types";
import Locomotive from "../Train/Locomotive";
import useClickAbleMenu from "../../hooks/useClickAbleMenu";
import { useState } from "react";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import useVehTransaction from "../../hooks/Firestore/Vehicle/useVehTransaction";
import useLocTrans from "../../hooks/Firestore/Locomotive/useLocTrans";

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

  const { addVehicleTransaction } = useVehTransaction(document.id, docRefToUpdate);

  const { addLocTransaction } = useLocTrans(document.id, docRefToUpdate);

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
      <div>
        <Button text="L" onClick={addLocomotive} isRounded={true} />
        <Button text="+" onClick={addVehicle} isRounded={true} />
      </div>
    </div>
  );
};

export default TrainRail;
