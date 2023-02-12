import { collection, doc, Timestamp } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import useLocFilterTrans from "../../hooks/Firestore/Locomotive/useLocFilterTrans";
import useLocTransaction from "../../hooks/Firestore/Locomotive/useLocFilterTrans";
import useLocTrans from "../../hooks/Firestore/Locomotive/useLocTrans";
import database from "../../shared/firebaseconfig";
import CarRepairSign from "../ui/CarRepairSign";
import EditableField from "../ui/EditableField";
import Menu from "../ui/Menu/Menu";

interface ILocomotiveProps {
  id: string;
  locomotiveSpz: string;
  locomotiveRepairDate: Timestamp;
  locomotiveDoc: string;
  documentID: string;
  collectionName?: string;
  rowIndex: number;
  isParked?: boolean;
  isMenuOpen?: string;
  isDragging?: boolean;
  handleVehicleRepairDate?: (repairD: Timestamp) => void;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<string>>;
  handleDragging?: (dragging: boolean) => void;
}

const Locomotive = ({
  id,
  locomotiveSpz,
  locomotiveRepairDate,
  locomotiveDoc,
  documentID,
  collectionName,
  rowIndex,
  isParked,
  isMenuOpen,
  isDragging,
  setIsMenuOpen,
  handleDragging,
}: ILocomotiveProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [locoStateSpz, setLocoStateSpz] = useState<string>("");

  const collectionRows = collection(database, `${collectionName}`);
  const docRefToUpdate = doc(collectionRows, documentID);

  const { editTransaction, dateTransaction, deleteLoc } = useLocTrans(
    locomotiveDoc,
    docRefToUpdate
  );

  const { editTransactionF, dateFilterTransaction } = useLocFilterTrans(
    locomotiveDoc,
    docRefToUpdate
  );

  const handleEditLocomotive = () => {
    setIsEditable(true);
    setIsMenuOpen("");
  };

  const handleSubmitEditLocomotive = async () => {
    if (!isParked) {
      editTransaction(id, locoStateSpz, locomotiveRepairDate, setIsMenuOpen);
    } else {
      editTransactionF(id, locoStateSpz, locomotiveRepairDate, setIsMenuOpen);
    }
    setIsMenuOpen("");
    setIsEditable(false);
    setLocoStateSpz("");
  };

  const handleOnChangeLocomotive = (event: ChangeEvent<HTMLInputElement>) => {
    setLocoStateSpz(event?.target.value);
  };

  const handleLocomotiveRepairDate = async (repairD: Timestamp) => {
    if (!isParked) {
      dateTransaction(id, locomotiveSpz, repairD, setIsMenuOpen);
    } else {
      dateFilterTransaction(id, locomotiveSpz, repairD, setIsMenuOpen);
    }
    setIsMenuOpen("");
  };

  const deleteLocomotive = async () => {
    deleteLoc(id, locomotiveSpz, locomotiveRepairDate);
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
      {!isEditable && isMenuOpen === id && (
        <Menu
          carRepairDate={locomotiveRepairDate}
          rowIndex={rowIndex}
          isLocomotive={true}
          isParked={isParked}
          editItem={handleEditLocomotive}
          deleteItem={deleteLocomotive}
          handleRepairDate={handleLocomotiveRepairDate}
        />
      )}

      <div className="relative w-32 h-14 overflow-hidden flex bg-white border border-black rounded-lg rounded-tr-[35px]">
        <EditableField
          isEditable={isEditable}
          state={locoStateSpz}
          realData={locomotiveSpz}
          isLocomotive={true}
          handleOnChange={handleOnChangeLocomotive}
          handleSubmit={handleSubmitEditLocomotive}
        />
        <CarRepairSign carRepairDate={locomotiveRepairDate} />
        <div className="absolute -top-[1px] left-20 w-16 h-8  border rounded-l-xl border-black" />
        <div className="absolute -bottom-5 -left-5 w-20 h-8 border rounded-md border-black" />
      </div>
      {/* Wheels */}
      <div className="relative overflow-hidden w-30 h-3 ">
        <div className="absolute -top-[3px] left-4 w-[13px] h-[14px] bg-white border border-black rounded-full" />
        <div className="absolute -top-[3px] left-24 w-[13px] h-[14px] bg-white border border-black rounded-full" />
        <div className="absolute -top-[3px] left-20 w-[13px] h-[14px] bg-white border border-black rounded-full" />
      </div>
    </div>
  );
};

export default Locomotive;
