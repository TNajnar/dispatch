import { ChangeEvent, useContext } from "react";
import { collection, doc } from "firebase/firestore";
import database from "../../../shared/firebaseconfig";
import { Line, Locomotive, Vehicle } from "../../shared";
import { nanoid } from "nanoid";
import { ThemeContext } from "../../../context/ThemeContext";
import { TManageTrainDoc, TVehicleObject } from "../../types";
import { useClickAbleMenu, useDragAndDrop } from "../../../hooks";
import { Button, PopUpMenu } from "../../ui";
import { ECollections } from "../../../utils/enums";
import clsx from "clsx";
import useVehicleRowData from "./hooks/useVehicleRowData";

interface IVehicleRowProps {
  vehicleRow: TManageTrainDoc;
  allVehicles: TVehicleObject[][];
  rowIndex: number;
}

const collectionRows = collection(database, ECollections.MANAGE_TRAINS);

const VehicleRow = ({ vehicleRow, allVehicles, rowIndex }: IVehicleRowProps) => {
  const { isDarkMode } = useContext(ThemeContext);

  const {
    id,
    locomotives,
    line,
    vehicles
  } = vehicleRow;

  const docRefToUpdate = doc(collectionRows, id);
  const {
    addLineHandler,
    addVehicleHandler,
    handleCloseMenu,
    isMenuOpen,
    setIsMenuOpen,
    setNameLine,
    setOpenPopMenuID,
    nameLine,
    openPopMenuID,
  } = useVehicleRowData(docRefToUpdate);

  const nanoId = nanoid();

  const darkMode = isDarkMode ? "border-primary-lightBlue" : "border-primary-gray";
  
  // convert to array, all in one arr.. Datas for dragNdrop
  const transferredVehicles = allVehicles.flat();

  useClickAbleMenu(nanoId, setIsMenuOpen);
  const {
    handleDragging,
    handleUpdateList
  } = useDragAndDrop(transferredVehicles, ECollections.MANAGE_TRAINS);

  const handleSubmitLine = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    addLineHandler(nanoId, nameLine || ""); //TODO
    setNameLine('');
    setOpenPopMenuID(undefined);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event?.preventDefault();
    handleUpdateList(event.dataTransfer.getData("id"), id);
    handleDragging(false);
  };

  return (
    <div className={clsx("grid grid-cols-4 place-items-center pb-2 w-full h-[101px] border-b", darkMode)}>
      <div
        className="flex justify-end items-center col-span-2 w-full h-full"
        onDrop={handleDrop}
        onDragOver={(event: React.DragEvent<HTMLDivElement>): void => event.preventDefault()}
      >
        {vehicles.length < 5 && (
          <Button
            clasName="absolute left-3 z-10"
            text="+"
            onClick={() => addVehicleHandler(nanoId, id, "", "", "")}
            isRounded={true}
          />
        )}
        
        <div className="flex justify-end gap-4">
          {vehicles.map((vehicle) => (
            <Vehicle
              key={vehicle.id}
              {...vehicle}
              collectionName={ECollections.MANAGE_TRAINS}
              documentID={id}
              handleDragging={handleDragging}
              isMenuOpen={isMenuOpen}
              rowIndex={rowIndex}
              setIsMenuOpen={setIsMenuOpen}
            />
          ))}
        </div>
      </div>

      <Locomotive
        {...locomotives}
        collectionName={ECollections.MANAGE_TRAINS}
        documentID={id}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        rowIndex={rowIndex}
      />

      <div className="flex items-center gap-4 h-14">
        {line.length < 4 && <Button text="+" onClick={(): void => setOpenPopMenuID(id)} />}
        {line.map(
          (line) =>
            !!line.nameLine && (
              <div key={line.id} onClick={(): void => setIsMenuOpen(line.id)}>
                <Line
                  id={line.id}
                  nameLine={line.nameLine}
                  documentID={id}
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
        handleOnChange={(e: ChangeEvent<HTMLInputElement>) => setNameLine(e.target.value)}
      />
    </div>
  );
};

export default VehicleRow;
