import { ChangeEvent, useState } from "react";
import { collection, doc, Timestamp } from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import clsx from "clsx";
import Menu from "../ui/Menu/Menu";
import EditableField from "../ui/EditableField";
import useVehTransaction from "../../hooks/Firestore/Vehicle/useVehTransaction";
import CarDateInfo from "../ui/CarRepairDate/CarDateInfo";
import CarRepairLight from "../ui/CarRepairDate/CarRepairLight";

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
  isDragging?: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<string>>;
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
  isDragging,
  setIsMenuOpen,
  handleDragging,
}: IVehicleProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [spzState, setSpzState] = useState<string>("");
  const [showDateInfo, setShowDateInfo] = useState<boolean>(false);

  const collectionRows = collection(database, `${collectionName}`);
  const docRefToUpdate = doc(collectionRows, documentID);

  const { editVehTransaction, deleteVehicle } = useVehTransaction(vehicleDoc, docRefToUpdate);

  const handleEditSpzVehicle = () => {
    setIsEditable(true);
    setIsMenuOpen("");
    setSpzState("");
  };

  const handleOnChangeVehicleSPZ = (event: ChangeEvent<HTMLInputElement>) => {
    setSpzState(event?.target.value);
  };

  const handleSumbitEditVehicleSpz = () => {
    editVehTransaction(
      id,
      spzState,
      vehicleClass,
      vehicleRepairDate,
      setIsMenuOpen,
      setIsEditable
    );
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
    <div
      className="relative"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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

        {showDateInfo && <CarDateInfo date={vehicleRepairDate} />}

        <div className="relative flex justify-center w-[100px] h-14 overflow-hidden bg-white border border-black rounded-lg">
          <EditableField
            isEditable={isEditable}
            state={spzState}
            realData={vehicleSpz}
            handleOnChange={handleOnChangeVehicleSPZ}
            handleSubmit={handleSumbitEditVehicleSpz}
          />
          <div className={clsx("absolute right-0 w-2 h-full", vehicleClass)} />

          <CarRepairLight
            carRepairDate={vehicleRepairDate}
            setShowDateInfo={setShowDateInfo}
          />
        </div>
      </div>
      {/* Wheels */}
      <div className="relative overflow-hidden w-30 h-3">
        <div className="absolute -top-[3px] left-4 w-[13px] h-[14px] bg-white border border-black rounded-full" />
        <div className="absolute -top-[3px] left-[70px] w-[13px] h-[14px] bg-white border border-black rounded-full" />
      </div>
    </div>
  );
};

export default Vehicle;
