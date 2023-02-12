import {
  arrayRemove,
  collection,
  doc,
  runTransaction,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import database from "../../shared/firebaseconfig";
import { TVehicleObject } from "../types";
import CarRepairSign from "../ui/CarRepairSign";
import EditableField from "../ui/EditableField";
import Menu from "../ui/Menu/Menu";

interface ILocomotiveProps {
  id: string;
  locomotiveSpz: string;
  locomotiveRepairDate: Timestamp;
  locomotiveDoc?: string;
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

  const handleEditLocomotive = () => {
    setIsEditable(true);
    setIsMenuOpen("");
  };

  const handleSubmitEditLocomotive = async () => {
    const docRefToUpdate = doc(collectionRows, documentID);
    if (!isParked) {
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
            isVehicle: false,
          },
        });
      });
    } else {
      const newValues = {
        id: id,
        spz: locoStateSpz,
        repairDate: locomotiveRepairDate,
        isVehicle: false,
        vehicleDoc: locomotiveDoc,
      };
      await runTransaction(database, async (transaction) => {
        const sfDoc = await transaction.get(docRefToUpdate);
        const data = sfDoc.data();
        const filterCars = [
          ...data?.vehicles.filter((veh: TVehicleObject) => veh.id !== id),
          newValues,
        ];
        transaction.update(docRefToUpdate, { vehicles: filterCars });
      });
    }
    setIsEditable(false);
    setIsMenuOpen("");
    setLocoStateSpz("");
  };

  const handleOnChangeLocomotive = (event: ChangeEvent<HTMLInputElement>) => {
    setLocoStateSpz(event?.target.value);
  };

  const handleLocomotiveRepairDate = async (repairD: Timestamp) => {
    const docRefToUpdate = doc(collectionRows, documentID);

    if (!isParked) {
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
            isVehicle: false,
          },
        });
      });
    } else {
      const newValues = {
        id: id,
        spz: locomotiveSpz,
        repairDate: repairD,
        isVehicle: false,
        vehicleDoc: locomotiveDoc,
      };
      await runTransaction(database, async (transaction) => {
        const sfDoc = await transaction.get(docRefToUpdate);
        const data = sfDoc.data();
        const filterCars = [
          ...data?.vehicles.filter((veh: TVehicleObject) => veh.id !== id),
          newValues,
        ];
        transaction.update(docRefToUpdate, { vehicles: filterCars });
      });
    }
    setIsMenuOpen("");
  };

  const deleteLocomotive = async () => {
    const getDocRef = doc(database, `${collectionName}`, documentID!);
    await updateDoc(getDocRef, {
      vehicles: arrayRemove({
        id: id,
        spz: locomotiveSpz,
        repairDate: locomotiveRepairDate,
        isVehicle: false,
        vehicleDoc: locomotiveDoc,
      }),
    });
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
