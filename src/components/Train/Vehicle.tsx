import { EventHandler, MouseEvent, useRef } from "react";

interface VehicleProps {
  id?: number;
}

type Position = {
  x: number;
  y: number;
};

const Vehicle = ({ id }: VehicleProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const initialPosition = useRef<Position>();
  const isMouseDown = useRef<boolean>();

  const showMenu = () => { };

  const onMouseDrag: EventHandler<MouseEvent> = (e) => {
    if (!isMouseDown.current || !initialPosition.current || !wrapperRef.current) return;
    const translateY = e.clientY - initialPosition.current.y;
    const translateX = e.clientX - initialPosition.current.x;
    wrapperRef.current!.style.transform = `translate(${translateX},${translateY})`;
  }

  const onMouseDown: EventHandler<MouseEvent> = (e) => {
    isMouseDown.current = true;
    initialPosition.current = {
      x: e.clientX,
      y: e.clientY
    };
  }

  const onMouseUp: EventHandler<MouseEvent> = (e) => {
    isMouseDown.current = false;
    if (!initialPosition.current || !wrapperRef.current) return;
    wrapperRef.current!.style.transform = ''
    if (e.clientX === initialPosition.current.x && e.clientY === initialPosition.current.y) showMenu();
  }

  return (
    <div ref={wrapperRef} onMouseMove={onMouseDrag} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <div className="relative w-[100px] h-14 overflow-hidden border border-black rounded-lg" />
      {/* Wheels */}
      <div className="relative overflow-hidden w-30 h-3">
        <div className="absolute -top-[3px] left-4 w-[13px] h-[14px] border rounded-full border-black" />
        <div className="absolute -top-[3px] left-[70px] w-[13px] h-[14px] border rounded-full border-black" />
      </div>
    </div>
  );
}

export default Vehicle;
