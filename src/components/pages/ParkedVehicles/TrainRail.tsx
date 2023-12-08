import { useContext, useState } from "react";
import { collection, doc } from "firebase/firestore";
import database from "../../../shared/firebaseconfig";
import { ThemeContext } from "../../../context/ThemeContext";
import { Locomotive, Vehicle } from "../../shared";
import { nanoid } from "nanoid";
import { useVehicleTransaction, useLocoTransaction } from "../../../hooks/Firestore";
import { TParkedVehicleDoc, TVehicleObject } from "../../types";
import { useClickAbleMenu, useDragAndDrop } from "../../../hooks";
import { Button } from "../../ui";
import clsx from "clsx";
import { ECollections } from "../../../utils/enums";

interface ITrainRailProps {
  document: TParkedVehicleDoc;
  getAllCars: TVehicleObject[][];
  rowIndex: number;
}

const collectionRows = collection(database, "ParkedVehicles");

const TrainRail = ({ document, getAllCars, rowIndex }: ITrainRailProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<string | undefined>(undefined);
  const id = nanoid();

  const { isDarkMode } = useContext(ThemeContext);

  const darkMode = isDarkMode ? "border-primary-lightBlue" : "border-primary-gray";
  const darkTrail = isDarkMode ? "border-primary-lightBlue" : "border-black";

  const docRefToUpdate = doc(collectionRows, document.id);

  const nameRail = document.nameRail;
  const parkedVehicles = document.vehicles;

  // convert to array, all in one arr. Datas for dragNdrop
  const transferredCars = getAllCars.flat();

  const vehiclesLenght = Object.keys(parkedVehicles).length;

  useClickAbleMenu(id, setIsMenuOpen);
  const { handleDragging, handleUpdateList } = useDragAndDrop(transferredCars, ECollections.PARKED_VEHICLES);
  const { addVehicleTransaction } = useVehicleTransaction(document.id, docRefToUpdate);
  const { addLocTransaction } = useLocoTransaction(document.id, docRefToUpdate);

  const addVehicle = async () => {
    addVehicleTransaction(id, "", "", "");
  };

  const addLocomotive = async () => {
    addLocTransaction(id, "", "");
    setIsMenuOpen(undefined);
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
      <div className="flex items-center gap-5 w-[85%] h-full" onDrop={handleDrop} onDragOver={handleDragOver}>
        {parkedVehicles.map((car, index) => (
          <div key={car.id} className={clsx(index === 0 && "pl-1")} onClick={() => handleOpenMenu(car.id)}>
            {car.isVehicle ? (
              <Vehicle
                {...car}
                collectionName={ECollections.PARKED_VEHICLES}
                documentID={document.id}
                handleDragging={handleDragging}
                isMenuOpen={isMenuOpen}
                rowIndex={rowIndex}
                setIsMenuOpen={setIsMenuOpen}
              />
            ) : (
              <Locomotive
                collectionName={ECollections.PARKED_VEHICLES}
                documentID={document.id}
                handleDragging={handleDragging}
                id={car.id}
                isMenuOpen={isMenuOpen}
                isParked
                isVehicle={car.isVehicle}
                lSpz={car.spz}
                repairDate={car.repairDate}
                rowIndex={rowIndex}
                setIsMenuOpen={setIsMenuOpen}
                vehicleDoc={car.vehicleDoc}
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