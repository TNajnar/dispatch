import { useContext, useState } from "react";
import { collection, doc } from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import { ThemeContext } from "../../context/ThemeContext";
import { nanoid } from "nanoid";
import { Locomotive, Vehicle } from "../Train";
import { useVehicleTransaction, useLocoTransaction } from "../../hooks/Firestore";
import { TParkedVehicleDoc, TVehicleObject } from "../types";
import { useClickAbleMenu, useDragAndDrop, useDropArea } from "../../hooks";
import { Button } from "../ui";
import clsx from "clsx";

interface ITrainRailProps {
  document: TParkedVehicleDoc;
  getAllCars: TVehicleObject[][];
  rowIndex: number;
}

const collectionRows = collection(database, "ParkedVehicles");

const TrainRail = ({ document, getAllCars, rowIndex }: ITrainRailProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<string>("");
  const id = nanoid();

  const { isDarkMode } = useContext(ThemeContext);

  const darkMode = isDarkMode ? "border-primary-lightBlue" : "border-primary-gray";
  const darkTrail = isDarkMode ? "border-primary-lightBlue" : "border-black";

  const docRefToUpdate = doc(collectionRows, document.id);

  const collectionName = "ParkedVehicles";
  const nameRail = document.nameRail;
  const parkedVehicles = document.vehicles;

  const transferredCars = getAllCars.flat();

  const vehiclesLenght = Object.keys(parkedVehicles).length;

  useClickAbleMenu(id, setIsMenuOpen);
  const { isDragging, handleDragging, handleUpdateList } = useDragAndDrop(transferredCars, collectionName);
  useDropArea(isDragging);
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
    <div className={clsx("flex items-center py-2 h-[101px] gap-4 border-b", darkMode)}>
      {!!nameRail && <h2 className={clsx("mr-2 w-24 text-h3 font-bold border-r", darkTrail)}>{nameRail}</h2>}
      <div
        className="dropArea flex items-center gap-5 w-[87%] h-full"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {parkedVehicles.map((car, index) => (
          <div key={car.id} className={clsx(index === 0 && "pl-1")} onClick={() => handleOpenMenu(car.id)}>
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
                handleDragging={handleDragging}
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
                handleDragging={handleDragging}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex-1" />
      {vehiclesLenght < 8 && (
        <div className="absolute right-0 bottom-2 flex flex-col justify-center items-center gap-1">
          <Button text="L" onClick={addLocomotive} isRounded={true} />
          <Button text="V" onClick={addVehicle} isRounded={true} />
        </div>
      )}
    </div>
  );
};

export default TrainRail;
