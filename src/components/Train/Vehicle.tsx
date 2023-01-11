import { ChangeEvent, EventHandler, MouseEvent, useRef, useState } from "react";
import VehicleMenu from "../ui/VehicleMenu";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import clsx from "clsx";
import { TVehicleObject } from "../types";

interface IVehicleProps {
  id?: string;
  vehicleSpz?: string;
  vehicleClass?: string;
  documentID?: string;
  rowIndex?: number;
}

type Position = {
  x: number;
  y: number;
};

const collectionRows = collection(database, "ManageTrains");

const Vehicle = ({
  id,
  vehicleSpz,
  vehicleClass,
  documentID,
  rowIndex,
}: IVehicleProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const initialPosition = useRef<Position>();
  const isMouseDown = useRef<boolean>();
  const outsideClickRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [spzState, setSpzState] = useState<string>("");

  const onMouseDrag: EventHandler<MouseEvent> = (event) => {
    if (!isMouseDown.current || !initialPosition.current || !wrapperRef.current)
      return;
    const translateY = event.clientY - initialPosition.current.y;
    const translateX = event.clientX - initialPosition.current.x;
    wrapperRef.current!.style.transform = `translate(${translateX}px,${translateY}px)`;
    wrapperRef.current!.style.zIndex = "1000";
  };

  const onMouseDown: EventHandler<MouseEvent> = (event) => {
    isMouseDown.current = true;
    initialPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const onMouseUp: EventHandler<MouseEvent> = (event) => {
    isMouseDown.current = false;
    if (!initialPosition.current || !wrapperRef.current) return;
    wrapperRef.current!.style.transform = "";
    wrapperRef.current!.style.zIndex = "";
    if (
      event.clientX === initialPosition.current.x &&
      event.clientY === initialPosition.current.y
    )
      setIsMenuOpen(true);

    if (
      outsideClickRef.current &&
      !outsideClickRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  const handleEditVehicle = () => {
    setIsEditable(true);
    setIsMenuOpen(false);
  };

  const handleSumbitEdit = async () => {
    const docRefToUpdate = doc(collectionRows, documentID);
    const newValues = {
      id: id,
      spz: spzState,
      class: vehicleClass,
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

  const handleOnChange: EventHandler<ChangeEvent<HTMLInputElement>> = (
    event
  ) => {
    setSpzState(event?.target.value);
  };

  const deleteVehicle = async () => {
    const getDocRef = doc(database, "ManageTrains", documentID!);
    await updateDoc(getDocRef, {
      vehicles: arrayRemove({ id: id, spz: vehicleSpz, class: vehicleClass }),
    });
  };

  const handleClassColor = async (colors: string) => {
    const docRefToUpdate = doc(collectionRows, documentID);
    const newValues = {
      id: id,
      spz: vehicleSpz,
      class: colors,
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
          outsideClickRef={outsideClickRef}
          deleteVehicle={deleteVehicle}
          editVehicle={handleEditVehicle}
          handleClassColor={handleClassColor}
          rowIndex={rowIndex}
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
          onChange={handleOnChange}
        />
        {!!isEditable && (
          <div
            className="text-xs border border-black"
            onClick={handleSumbitEdit}
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
