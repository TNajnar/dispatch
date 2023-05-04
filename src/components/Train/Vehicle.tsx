import { ChangeEvent, Dispatch, SetStateAction, useContext, useState } from "react";
import { collection, doc, Timestamp } from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import { ThemeContext } from "../../context/ThemeContext";
import { useVehicleTransaction } from "../../hooks/Firestore";
import { CarDateInfo, CarRepairLight, EditableField, Menu } from "../ui";
import clsx from "clsx";

interface IVehicleProps {
  id: string;
  vehicleSpz: string;
  vehicleClass: string;
  vehicleRepairDate: Timestamp;
  vehicleDoc: string;
  documentID: string;
  collectionName: string;
  rowIndex: number;
  isMenuOpen?: string;
  setIsMenuOpen: Dispatch<SetStateAction<string>>;
  handleDragging?: (dragging: boolean) => void;
}

const Vehicle = ({
  id,
  vehicleSpz,
  vehicleClass,
  vehicleRepairDate,
  documentID,
  collectionName,
  rowIndex,
  isMenuOpen,
  vehicleDoc,
  setIsMenuOpen,
  handleDragging,
}: IVehicleProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [spzState, setSpzState] = useState<string>("");
  const [showDateInfo, setShowDateInfo] = useState<boolean>(false);

  const { isDarkMode } = useContext(ThemeContext);

  const darkModeBg = isDarkMode ? "bg-primary-blue" : "bg-white";

  const collectionRows = collection(database, `${collectionName}`);
  const docRefToUpdate = doc(collectionRows, documentID);

  const { editVehTransaction, deleteVehicle } = useVehicleTransaction(vehicleDoc, docRefToUpdate);

  const handleEditSpzVehicle = () => {
    setIsEditable(true);
    setIsMenuOpen("");
    setSpzState("");
  };

  const handleOnChangeVehicleSPZ = (event: ChangeEvent<HTMLInputElement>) => {
    setSpzState(event?.target.value);
  };

  const handleSumbitEditVehicleSpz = () => {
    editVehTransaction(id, spzState, vehicleClass, vehicleRepairDate, setIsMenuOpen, setIsEditable);
  };

  const handleClassColor = (colors: string) => {
    editVehTransaction(id, vehicleSpz, colors, vehicleRepairDate, setIsMenuOpen);
  };

  const handleVehicleRepairDate = (repairD: Timestamp) => {
    editVehTransaction(id, vehicleSpz, vehicleClass, repairD);
    setIsMenuOpen("");
  };

  const handleDeleteVehicle = () => {
    deleteVehicle(id, vehicleSpz, vehicleClass, vehicleRepairDate);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("id", id!);
    handleDragging?.(true);
  };

  const handleDragEnd = () => {
    handleDragging?.(false);
  };

  return (
    <div className="relative group" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div>
        {!isEditable && isMenuOpen === id && (
          <Menu
            carRepairDate={vehicleRepairDate}
            rowIndex={rowIndex}
            editItem={handleEditSpzVehicle}
            handleClassColor={handleClassColor}
            handleRepairDate={handleVehicleRepairDate}
            deleteItem={handleDeleteVehicle}
          />
        )}

        {showDateInfo && <CarDateInfo date={vehicleRepairDate} isDarkMode={isDarkMode} />}

        <div
          className={clsx(
            "relative flex justify-center w-[100px] h-14 overflow-hidden border group-hover:border-2 border-black rounded-lg",
            darkModeBg
          )}
        >
          <EditableField
            isEditable={isEditable}
            state={spzState}
            realData={vehicleSpz}
            handleOnChange={handleOnChangeVehicleSPZ}
            handleSubmit={handleSumbitEditVehicleSpz}
          />
          <div className={clsx("absolute right-0 w-2 h-full", vehicleClass)} />

          <CarRepairLight carRepairDate={vehicleRepairDate} setShowDateInfo={setShowDateInfo} />
        </div>
      </div>
      {/* Wheels */}
      <div className="relative overflow-hidden w-30 h-3">
        <div
          className={clsx(
            "absolute -top-[3px] left-4 w-[13px] h-[14px] border group-hover:border-2 border-black rounded-full",
            darkModeBg
          )}
        />
        <div
          className={clsx(
            "absolute -top-[3px] left-[70px] w-[13px] h-[14px] border group-hover:border-2 border-black rounded-full",
            darkModeBg
          )}
        />
      </div>
    </div>
  );
};

export default Vehicle;
