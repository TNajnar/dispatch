import { ChangeEvent, useContext, useState } from "react";
import { collection, doc } from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import { nanoid } from "nanoid";
import { Line, Locomotive, Vehicle } from "../Train";
import { ThemeContext } from "../../context/ThemeContext";
import { useVehicleTransaction, useLineTransaction } from "../../hooks/Firestore";
import { TManageTrainDoc, TVehicleObject } from "../types";
import { useClickAbleMenu, useDragAndDrop } from "../../hooks";
import { Button, PopUpMenu } from "../ui";
import clsx from "clsx";

interface IVehicleRowProps {
  document: TManageTrainDoc;
  allVehicles: TVehicleObject[][];
  rowIndex: number;
}

const collectionRows = collection(database, "ManageTrains");

const VehicleRow = ({ document, allVehicles, rowIndex }: IVehicleRowProps) => {
  const [openPopMenuID, setOpenPopMenuID] = useState<string>("");
  const [nameLine, setNameLine] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<string>("");

  const { isDarkMode } = useContext(ThemeContext);

  const id = nanoid();

  const darkMode = isDarkMode ? "border-primary-lightBlue" : "border-primary-gray";

  const docRefToUpdate = doc(collectionRows, document.id);

  const collectionName = "ManageTrains";
  const vehicles = document.vehicles;
  const lines = document.line;
  const locomotive = document.locomotives;
  // convert to array, all in one arr.. Datas for dragNdrop
  const transferredVehicles = allVehicles.flat();

  const vehiclesLenght = Object.keys(vehicles).length;
  const linesLenght = Object.keys(lines).length;

  useClickAbleMenu(id, setIsMenuOpen);
  const { isDragging, handleDragging, handleUpdateList } = useDragAndDrop(
    transferredVehicles,
    collectionName
  );
  const { addVehicleTransaction } = useVehicleTransaction(document.id, docRefToUpdate);
  const { addLine } = useLineTransaction(docRefToUpdate);

  const addVehicle = () => {
    addVehicleTransaction(id, "", "", "");
  };

  const handleAddLine = () => {
    addLine(id, nameLine);
    setOpenPopMenuID("");
  };

  const handleOnChangeLine = (event: ChangeEvent<HTMLInputElement>) => {
    setNameLine(event.target.value);
  };

  const handleSubmitLine = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    handleAddLine();
    setNameLine("");
    setOpenPopMenuID("");
  };

  const handleOpenMenu = (id: string) => {
    setIsMenuOpen(() => id);
  };

  const handleCloseMenu = () => {
    setNameLine("");
    setOpenPopMenuID("");
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event?.preventDefault();
    handleUpdateList(event.dataTransfer.getData("id"), document.id);
    handleDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault();

  return (
    <div className={clsx("grid grid-cols-4 place-items-center pb-2 w-full h-[101px] border-b", darkMode)}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex justify-end items-center col-span-2 w-full h-full"
      >
        {vehiclesLenght < 5 && (
          <Button clasName="absolute left-3 z-10" text="+" onClick={addVehicle} isRounded={true} />
        )}
        <div className="flex gap-4 justify-end">
          {vehicles.map((vehicle, index) => (
            <div
              key={`${vehicle.id}_${vehicle.spz}`}
              className={clsx(index === vehicles.length - 1 && "pr-1")}
              onClick={() => handleOpenMenu(vehicle.id)}
            >
              <Vehicle
                id={vehicle.id}
                vehicleSpz={vehicle.spz}
                vehicleClass={vehicle.class}
                vehicleRepairDate={vehicle.repairDate}
                documentID={document.id}
                vehicleDoc={vehicle.vehicleDoc}
                collectionName={collectionName}
                rowIndex={rowIndex}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                handleDragging={handleDragging}
              />
            </div>
          ))}
        </div>
      </div>
      <div onClick={() => setIsMenuOpen(locomotive.id)}>
        <Locomotive
          id={locomotive.id}
          locomotiveSpz={locomotive.lSpz}
          locomotiveRepairDate={locomotive.repairDate}
          locomotiveDoc={locomotive.vehicleDoc}
          documentID={document.id}
          collectionName={collectionName}
          rowIndex={rowIndex}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
        />
      </div>
      <div className="flex items-center gap-4 h-14">
        {linesLenght < 4 && <Button text="+" onClick={() => setOpenPopMenuID(document.id)} />}
        {lines.map(
          (line) =>
            !!line.nameLine && (
              <div key={line.id} onClick={() => handleOpenMenu(line.id)}>
                <Line
                  id={line.id}
                  nameLine={line.nameLine}
                  documentID={document.id}
                  rowIndex={rowIndex}
                  setIsMenuOpen={setIsMenuOpen}
                  isMenuOpen={isMenuOpen}
                />
              </div>
            )
        )}
      </div>

      <PopUpMenu
        open={!!openPopMenuID}
        value={nameLine}
        title="Název linky"
        context="Zde napiš název linky."
        label="Název linky"
        handleClose={handleCloseMenu}
        handleOnSubmit={() => handleSubmitLine(this!)}
        handleOnChange={handleOnChangeLine}
      />
    </div>
  );
};

export default VehicleRow;
