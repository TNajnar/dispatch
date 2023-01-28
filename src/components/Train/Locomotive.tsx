import { collection, doc, runTransaction, Timestamp } from "firebase/firestore";
import { ChangeEvent, useRef, useState } from "react";
import useDragNDrop from "../../hooks/useDragNDrop";
import database from "../../shared/firebaseconfig";
import EditableField from "../ui/EditableField";
import Menu from "../ui/Menu/Menu";

interface ILocomotiveProps {
  id?: string;
  locomotiveSpz?: string;
  locomotiveRepairDate?: Timestamp;
  documentID?: string;
  rowIndex?: number;
  handleVehicleRepairDate?: (repairD: Timestamp) => void;
}

const collectionRows = collection(database, "ManageTrains");

const Locomotive = ({
  id,
  locomotiveSpz,
  locomotiveRepairDate,
  documentID,
  rowIndex,
}: ILocomotiveProps) => {
  const outsideClickRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [locoStateSpz, setLocoStateSpz] = useState<string>("");

  const { wrapperRef, onMouseDrag, onMouseDown, onMouseUp } = useDragNDrop(
    outsideClickRef,
    setIsMenuOpen
  );

  const handleEditLocomotive = () => {
    setIsEditable(true);
    setIsMenuOpen(false);
  };

  const handleSubmitEditLocomotive = async () => {
    const docRefToUpdate = doc(collectionRows, documentID);
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const newLocomotiveSpz = (sfDoc.data().lSpz = locoStateSpz);
      transaction.update(docRefToUpdate, {
        locomotives: {
          id: id,
          lSpz: newLocomotiveSpz,
          repairDate: locomotiveRepairDate,
        },
      });
    });
    setIsEditable(false);
    setIsMenuOpen(false);
    setLocoStateSpz("");
  };

  const handleOnChangeLocomotive = (event: ChangeEvent<HTMLInputElement>) => {
    setLocoStateSpz(event?.target.value);
  };

  const handleLocomotiveRepairDate = async (repairD: Timestamp) => {
    const docRefToUpdate = doc(collectionRows, documentID);
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const locomotiveDate = (sfDoc.data().repairDate = repairD);
      transaction.update(docRefToUpdate, {
        locomotives: {
          id: id,
          lSpz: locomotiveSpz,
          repairDate: locomotiveDate,
        },
      });
    });
  };

  return (
    <div
      className="relative"
      ref={wrapperRef}
      onMouseMove={onMouseDrag}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {!isEditable && isMenuOpen && (
        <Menu
          carRepairDate={locomotiveRepairDate}
          rowIndex={rowIndex}
          outsideClickRef={outsideClickRef}
          isLocomotive={true}
          editItem={handleEditLocomotive}
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
