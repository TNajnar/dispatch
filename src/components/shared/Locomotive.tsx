import { ChangeEvent, useContext, useState } from "react";
import { collection, doc, Timestamp } from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import { ThemeContext } from "../../context/ThemeContext";
import { useLocFilterTrans, useLocoTransaction } from "../../hooks/Firestore";
import { CarDateInfo, CarRepairLight, EditableField, Menu } from "../ui";
import clsx from "clsx";
import { TLocomotiveObject } from "../types";

interface ILocomotiveProps extends TLocomotiveObject {
  collectionName: string;
  documentID: string;
  rowIndex: number;
  isParked?: boolean;
  isMenuOpen?: string;
  isDragging?: boolean;
  handleVehicleRepairDate?: (repairD: Timestamp) => void;
  setIsMenuOpen: (value?: string) => void;
  handleDragging?: (dragging: boolean) => void;
}

const Locomotive = ({
  collectionName,
  id,
  lSpz,
  repairDate,
  vehicleDoc,
  documentID,
  rowIndex,
  isParked = false,
  isMenuOpen,
  setIsMenuOpen,
  handleDragging,
}: ILocomotiveProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [locoStateSpz, setLocoStateSpz] = useState<string>("");
  const [showDateInfo, setShowDateInfo] = useState<boolean>(false);

  const { isDarkMode } = useContext(ThemeContext);

  const darkModeBorder = isDarkMode ? "border-primary-lightBlue" : "border-black";
  const darkModeBg = isDarkMode ? "bg-primary-blue" : "bg-white";

  const collectionRows = collection(database, collectionName);
  const docRefToUpdate = doc(collectionRows, documentID);

  const { editTransaction, dateTransaction, deleteLoc } = useLocoTransaction(vehicleDoc, docRefToUpdate);

  const { editTransactionF, dateFilterTransaction } = useLocFilterTrans(vehicleDoc, docRefToUpdate);

  const handleEditLocomotive = () => {
    setIsEditable(true);
    setIsMenuOpen("");
  };

  const handleSubmitEditLocomotive = () => {
    if (!isParked) {
      editTransaction(id, locoStateSpz, repairDate, setIsMenuOpen, setIsEditable);
    } else {
      editTransactionF(id, locoStateSpz, repairDate, setIsMenuOpen, setIsEditable);
    }
    setLocoStateSpz("");
  };

  const handleOnChangeLocomotive = (event: ChangeEvent<HTMLInputElement>) => {
    setLocoStateSpz(event?.target.value);
  };

  const handleLocomotiveRepairDate = (repairD: Timestamp) => {
    if (!isParked) {
      dateTransaction(id, lSpz, repairD, setIsMenuOpen);
    } else {
      dateFilterTransaction(id, lSpz, repairD, setIsMenuOpen);
    }
  };

  const deleteLocomotive = () => {
    deleteLoc(id, lSpz, repairDate);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("id", id!);
    handleDragging?.(true);
  };

  const handleDragEnd = () => {
    handleDragging?.(false);
  };

  return (
    <div className="relative group" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} onClick={(): void => setIsMenuOpen(id)}>
      {!isEditable && isMenuOpen === id && (
        <Menu
          carRepairDate={repairDate}
          rowIndex={rowIndex}
          isLocomotive={true}
          isParked={isParked}
          editItem={handleEditLocomotive}
          deleteItem={deleteLocomotive}
          handleRepairDate={handleLocomotiveRepairDate}
        />
      )}

      {showDateInfo && <CarDateInfo date={repairDate} isDarkMode={isDarkMode} />}

      <div
        className={clsx(
          "relative w-32 h-14 overflow-hidden flex border group-hover:border-2 border-black rounded-lg rounded-tr-[35px]",
          darkModeBg
        )}
      >
        <EditableField
          isEditable={isEditable}
          state={locoStateSpz}
          realData={lSpz}
          isLocomotive={true}
          handleOnChange={handleOnChangeLocomotive}
          handleSubmit={handleSubmitEditLocomotive}
        />
        <CarRepairLight carRepairDate={repairDate} setShowDateInfo={setShowDateInfo} />
        <div
          className={clsx(
            "absolute -top-[1px] left-20 w-16 h-8 border rounded-l-xl",
            darkModeBg,
            darkModeBorder
          )}
        />
        <div
          className={clsx(
            "absolute -bottom-5 -left-5 w-20 h-8 border rounded-md",
            darkModeBg,
            darkModeBorder
          )}
        />
      </div>
      {/* Wheels */}
      <div className="relative overflow-hidden w-30 h-3 ">
        <div
          className={clsx(
            "absolute -top-[3px] left-4 w-[13px] h-[14px] border group-hover:border-2 border-black rounded-full",
            darkModeBg
          )}
        />
        <div
          className={clsx(
            "absolute -top-[3px] left-24 w-[13px] h-[14px] border group-hover:border-2 border-black rounded-full",
            darkModeBg
          )}
        />
        <div
          className={clsx(
            "absolute -top-[3px] left-20 w-[13px] h-[14px] border group-hover:border-2 border-black rounded-full",
            darkModeBg
          )}
        />
      </div>
    </div>
  );
};

export default Locomotive;
