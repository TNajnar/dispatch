import { ChangeEvent, useState } from "react";
import Locomotive from "../Train/Locomotive";
import Vehicle from "../Train/Vehicle";
import { collection, doc } from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import { nanoid } from "nanoid";
import Button from "../ui/Button";
import PopUpMenu from "../ui/PopUpMenu";
import { TManageTrainDoc, TVehicleObject } from "../types";
import Line from "../Train/Line";
import useClickAbleMenu from "../../hooks/useClickAbleMenu";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import useVehTransaction from "../../hooks/Firestore/Vehicle/useVehTransaction";
import useLineTransaction from "../../hooks/Firestore/Line/useLineTransaction";

interface IVehicleRowProps {
  document: TManageTrainDoc;
  getAllVehicles: TVehicleObject[][];
  rowIndex: number;
}

const collectionRows = collection(database, "ManageTrains");

const VehicleRow = ({ document, getAllVehicles, rowIndex }: IVehicleRowProps) => {
  const [openPopMenuID, setOpenPopMenuID] = useState<string>("");
  const [nameLine, setNameLine] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<string>("");

  const id = nanoid();

  const docRefToUpdate = doc(collectionRows, document.id);

  const collectionName = "ManageTrains";
  const vehicles = document.vehicles;
  const lines = document.line;
  const locomotive = document.locomotives;
  const transferredVehicles = getAllVehicles.flat();

  const linesLenght = Object.keys(lines).length;

  useClickAbleMenu(id, setIsMenuOpen);

  const { isDragging, handleDragging, handleUpdateList } = useDragAndDrop(
    transferredVehicles,
    collectionName
  );

  const { addVehicleTransaction } = useVehTransaction(document.id, docRefToUpdate);
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
    <div className="grid grid-cols-4 place-items-center pb-2 w-full h-[101px] border-b border-primary-gray">
      {/* <div className="flex justify-end items-center col-span-2 mr-2 w-[99%] overflow-x-scroll overflow-y-hidden"> */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="dropArea flex justify-end items-center col-span-2 pb-2 w-[98%] h-full"
      >
        <Button
          clasName="absolute left-3 z-10"
          text="+"
          onClick={addVehicle}
          isRounded={true}
        />
        {/* <div className="flex gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap"> */}
        <div className="flex gap-4 justify-end">
          {vehicles.map((vehicle) => (
            <div
              key={`${vehicle.id}_${vehicle.spz}`}
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
                isDragging={isDragging}
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
      <div className="flex gap-4">
        {/* {linesLenght < 4 && <Button text="+" onClick={addLine} />} */}
        <Button text="+" onClick={() => setOpenPopMenuID(document.id)} />
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
        context="Zde napiš nápiš název linky."
        label="Název linky"
        handleClose={handleCloseMenu}
        handleOnSubmit={() => handleSubmitLine(this!)}
        handleOnChange={handleOnChangeLine}
      />
    </div>
  );
};

export default VehicleRow;
