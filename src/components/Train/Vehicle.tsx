import { ChangeEvent, useRef, useState } from "react";
import VehicleMenu from "../ui/VehicleMenu";
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

interface IVehicleProps {
  id?: string;
  vehicleSpz?: string;
  vehicleClass?: string;
  vehicleRepairDate?: Timestamp;
  documentID?: string;
  rowIndex?: number;
}

const collectionRows = collection(database, "ManageTrains");

const Vehicle = ({
  id,
  vehicleSpz,
  vehicleClass,
  vehicleRepairDate,
  documentID,
  rowIndex,
}: IVehicleProps) => {
  const outsideClickRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [spzState, setSpzState] = useState<string>("");

  const { wrapperRef, onMouseDrag, onMouseDown, onMouseUp } = useDragNDrop(
    outsideClickRef,
    setIsMenuOpen
  );

  const handleEditSpzVehicle = () => {
    setIsEditable(true);
    setIsMenuOpen(false);
  };

  const handleSumbitEditSpz = async () => {
    const docRefToUpdate = doc(collectionRows, documentID);
    const newValues = {
      id: id,
      spz: spzState,
      class: vehicleClass,
      repairDate: vehicleRepairDate,
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
    setIsMenuOpen(false);
  };

  const handleOnChangeSPZ = (event: ChangeEvent<HTMLInputElement>) => {
    setSpzState(event?.target.value);
  };

  const deleteVehicle = async () => {
    const getDocRef = doc(database, "ManageTrains", documentID!);
    await updateDoc(getDocRef, {
      vehicles: arrayRemove({
        id: id,
        spz: vehicleSpz,
        class: vehicleClass,
        repairDate: vehicleRepairDate,
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

    setIsMenuOpen(false);
  };

  const handleVehicleRepairDate = async (repairD: Timestamp) => {
    const docRefToUpdate = doc(collectionRows, documentID);
    const newValues = {
      id: id,
      spz: vehicleSpz,
      class: vehicleClass,
      repairDate: repairD,
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
      {!isEditable && isMenuOpen && (
        <VehicleMenu
          vehicleID={id}
          vehicleRepairDate={vehicleRepairDate}
          rowIndex={rowIndex}
          outsideClickRef={outsideClickRef}
          deleteVehicle={deleteVehicle}
          editVehicle={handleEditSpzVehicle}
          handleClassColor={handleClassColor}
          handleVehicleRepairDate={handleVehicleRepairDate}
        />
      )}

      <div className="relative flex justify-center items-center w-[100px] h-14 gap-3 overflow-hidden bg-white border border-black rounded-lg">
        <input
          type="text"
          value={`${!!isEditable ? spzState : vehicleSpz}`}
          className={clsx(
            "w-12 text-center text-gray-600 bg-white",
            (!!isEditable || !!vehicleSpz?.length) && "border-b border-gray"
          )}
          disabled={!isEditable}
          onChange={handleOnChangeSPZ}
        />
        {!!isEditable && (
          <div
            className="text-xs border border-black"
            onClick={handleSumbitEditSpz}
          >
            OK
          </div>
        )}
        <div className={clsx("absolute right-0 w-1 h-full", vehicleClass)} />
      </div>
      {/* Wheels */}
      <div className="relative overflow-hidden w-30 h-3">
        <div className="absolute -top-[3px] left-4 w-[13px] h-[14px] bg-white border border-black rounded-full" />
        <div className="absolute -top-[3px] left-[70px] w-[13px] h-[14px] border border-black rounded-full" />
      </div>
    </div>
  );
};

export default Vehicle;
