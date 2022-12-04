import { EventHandler, MouseEvent, useEffect, useRef, useState } from "react";
import VehicleMenu from "../ui/VehicleMenu";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import database from "../../shared/firebaseconfig";

interface IVehicleProps {
  id?: string;
  documentID?: string;
}

type Position = {
  x: number;
  y: number;
};

const Vehicle = ({ id, documentID }: IVehicleProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const initialPosition = useRef<Position>();
  const isMouseDown = useRef<boolean>();
  const outsideClickRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const onMouseDrag: EventHandler<MouseEvent> = (e) => {
    if (!isMouseDown.current || !initialPosition.current || !wrapperRef.current)
      return;
    const translateY = e.clientY - initialPosition.current.y;
    const translateX = e.clientX - initialPosition.current.x;
    wrapperRef.current!.style.transform = `translate(${translateX}px,${translateY})px`;
  };

  const onMouseDown: EventHandler<MouseEvent> = (e) => {
    isMouseDown.current = true;
    initialPosition.current = {
      x: e.clientX,
      y: e.clientY,
    };
    // console.log("Now should be draggable. Mouse is down.");
  };

  const onMouseUp: EventHandler<MouseEvent> = (e) => {
    isMouseDown.current = false;
    if (!initialPosition.current || !wrapperRef.current) return;
    wrapperRef.current!.style.transform = "";
    if (
      e.clientX === initialPosition.current.x &&
      e.clientY === initialPosition.current.y
    )
      setIsMenuOpen(true);

    if (
      outsideClickRef.current &&
      !outsideClickRef.current.contains(e.target as Node)
    ) {
      setIsMenuOpen(false);
    }

    // console.log("Now menu is open. Mouse is Up.");
    // showMenu();
  };

  const deleteVehicle = async () => {
    const getDocRef = doc(database, "ManageTrains", documentID!);
    await updateDoc(getDocRef, {
      vehicles: arrayRemove({ id: id }),
    });
  };

  return (
    <div
      className="relative"
      ref={wrapperRef}
      draggable={true}
      onMouseMove={onMouseDrag}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {isMenuOpen && (
        <VehicleMenu
          outsideClickRef={outsideClickRef}
          deleteVehicle={deleteVehicle}
        />
      )}

      <div className="relative w-[100px] h-14 overflow-hidden border border-black rounded-lg" />
      {/* Wheels */}
      <div className="relative overflow-hidden w-30 h-3">
        <div className="absolute -top-[3px] left-4 w-[13px] h-[14px] border rounded-full border-black" />
        <div className="absolute -top-[3px] left-[70px] w-[13px] h-[14px] border rounded-full border-black" />
      </div>
    </div>
  );
};

export default Vehicle;
