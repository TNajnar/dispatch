import { ChangeEvent, useState } from "react";
import {
  arrayRemove,
  collection,
  doc,
  runTransaction,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import clsx from "clsx";
import { TVehicleObject } from "../types";
import useDragNDrop from "../../hooks/useDragNDrop";
import Menu from "../ui/Menu/Menu";
import EditableField from "../ui/EditableField";

interface IVehicleProps {
  id?: string;
  vehicleSpz?: string;
  vehicleClass?: string;
  vehicleRepairDate?: Timestamp;
  documentID?: string;
  collectionName?: string;
  rowIndex?: number;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<string>>;
  isMenuOpen?: string;
}

const Vehicle = ({
  id,
  vehicleSpz,
  vehicleClass,
  vehicleRepairDate,
  documentID,
  collectionName,
  rowIndex,
  setIsMenuOpen,
  isMenuOpen,
}: IVehicleProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [spzState, setSpzState] = useState<string>("");

  const collectionRows = collection(database, `${collectionName}`);

  const { wrapperRef, onMouseDrag, onMouseDown, onMouseUp } = useDragNDrop();

  const handleEditSpzVehicle = () => {
    setIsEditable(true);
    setIsMenuOpen("");
    setSpzState("");
  };

  const handleSumbitEditVehicleSpz = async () => {
    const docRefToUpdate = doc(collectionRows, documentID);
    const newValues = {
      id: id,
      spz: spzState,
      class: vehicleClass,
      repairDate: vehicleRepairDate,
      isVehicle: true,
    };
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      const data = sfDoc.data();
      const filterVehicles = [
        ...data?.vehicles.filter((veh: TVehicleObject) => veh.id !== id),
        newValues,
      ];
      transaction.update(docRefToUpdate, { vehicles: filterVehicles });
    });
    setIsEditable(false);
    setIsMenuOpen("");
  };

  const handleOnChangeVehicleSPZ = (event: ChangeEvent<HTMLInputElement>) => {
    setSpzState(event?.target.value);
  };

  const deleteVehicle = async (id: string) => {
    const getDocRef = doc(database, `${collectionName}`, documentID!);
    await updateDoc(getDocRef, {
      vehicles: arrayRemove({
        id: id,
        spz: vehicleSpz,
        class: vehicleClass,
        repairDate: vehicleRepairDate,
        isVehicle: true,
      }),
    });
  };

  const handleClassColor = async (colors: string) => {
    const docRefToUpdate = doc(collectionRows, documentID);
    const newValues = {
      id: id,
      spz: vehicleSpz,
      class: colors,
      repairDate: vehicleRepairDate,
      isVehicle: true,
    };
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      const data = sfDoc.data();
      const filterVehicles = [
        ...data?.vehicles.filter((veh: TVehicleObject) => veh.id !== id),
        newValues,
      ];
      transaction.update(docRefToUpdate, { vehicles: filterVehicles });
    });

    setIsMenuOpen("");
  };

  const handleVehicleRepairDate = async (repairD: Timestamp) => {
    const docRefToUpdate = doc(collectionRows, documentID);
    const newValues = {
      id: id,
      spz: vehicleSpz,
      class: vehicleClass,
      repairDate: repairD,
      isVehicle: true,
    };
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      const data = sfDoc.data();
      const filterVehicles = [
        ...data?.vehicles.filter((veh: TVehicleObject) => veh.id !== id),
        newValues,
      ];
      transaction.update(docRefToUpdate, { vehicles: filterVehicles });
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
      <div>
        {!isEditable && isMenuOpen === id && (
          <Menu
            carRepairDate={vehicleRepairDate}
            rowIndex={rowIndex}
            deleteItem={() => deleteVehicle(id!)}
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
          />
          <div className={clsx("absolute right-0 w-2 h-full", vehicleClass)} />
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
