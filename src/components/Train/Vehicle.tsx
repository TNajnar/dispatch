import { ChangeEvent, useState } from "react";
import {collection, doc, Timestamp} from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import clsx from "clsx";
import Menu from "../ui/Menu/Menu";
import EditableField from "../ui/EditableField";
import useVehTransaction from "../../hooks/Firestore/useVehTransaction";
import CarRepairSign from "../ui/CarRepairSign";

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

  const collectionRows = collection(database, `${collectionName}`);
  const docRefToUpdate = doc(collectionRows, documentID);

  const { editVehTransaction, deleteVehicle } = useVehTransaction(vehicleDoc, docRefToUpdate);

  const handleEditSpzVehicle = () => {
    setIsEditable(true);
    setIsMenuOpen("");
    setSpzState("");
  };

  const handleSumbitEditVehicleSpz = () => {   
    editVehTransaction(id, spzState, vehicleClass, vehicleRepairDate, setIsMenuOpen, setIsEditable);
  };

  const handleOnChangeVehicleSPZ = (event: ChangeEvent<HTMLInputElement>) => {
    setSpzState(event?.target.value);
  };

  const handleClassColor = async (colors: string) => {
    editVehTransaction(id, vehicleSpz, colors, vehicleRepairDate, setIsMenuOpen);
  };

  const handleVehicleRepairDate = async (repairD: Timestamp) => {
    editVehTransaction(id, vehicleSpz, vehicleClass, repairD);
    setIsMenuOpen("");
  };

  const handleDeleteVehicle = async () => {
    deleteVehicle(id, vehicleSpz, vehicleClass, vehicleRepairDate)
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("id", id!);
    handleDragging?.(true);

    const dropArea = window.document.getElementsByClassName("dropArea");
    for (let i = 0; i < dropArea.length; i++) {
      const divElement = dropArea[i] as HTMLElement;

      if (!isDragging) {
        divElement.classList.add(
          "border-1",
          "border-dashed",
          "border-primary-gray"
        );
      }
    }
  };

  const handleDragEnd = () => {
    handleDragging?.(false);

    const dropArea = window.document.getElementsByClassName("dropArea");
    for (let i = 0; i < dropArea.length; i++) {
      const divElement = dropArea[i] as HTMLElement;

      divElement.classList.remove(
        "border-1",
        "border-dashed",
        "border-primary-gray"
      );
    }
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
            deleteItem={handleDeleteVehicle}
            editItem={handleEditSpzVehicle}
            handleClassColor={handleClassColor}
            handleRepairDate={handleVehicleRepairDate}
          />
        )}

        <div className="relative flex justify-center w-[100px] h-14 overflow-hidden bg-white border border-black rounded-lg">
          <EditableField
            isEditable={isEditable}
            state={spzState}
            realData={vehicleSpz}
            handleOnChange={handleOnChangeVehicleSPZ}
            handleSubmit={handleSumbitEditVehicleSpz}
            // handleSubmit={() => editVehTransaction(id, spzState, vehicleClass, vehicleRepairDate, setIsMenuOpen)}
          />
          <div className={clsx("absolute right-0 w-2 h-full", vehicleClass)} />

          <CarRepairSign carRepairDate={vehicleRepairDate} />
        </div>
      </div>
      {/* Wheels */}
      <div
        className="relative overflow-hidden w-30 h-3"
        onClick={() => console.log(vehicleRepairDate)}
      >
        <div className="absolute -top-[3px] left-4 w-[13px] h-[14px] bg-white border border-black rounded-full" />
        <div className="absolute -top-[3px] left-[70px] w-[13px] h-[14px] bg-white border border-black rounded-full" />
      </div>
    </div>
  );
};

export default Vehicle;
