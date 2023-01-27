import { EventHandler, RefObject, MouseEvent, useRef } from "react";

type Position = {
  x: number;
  y: number;
};

// The hook takes two parametres as input and then return an objects with four props
const useDragNDrop = (
  outsideClickRef: RefObject<HTMLDivElement>,
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
): {
  wrapperRef: RefObject<HTMLDivElement>;
  onMouseDrag: EventHandler<MouseEvent>;
  onMouseDown: EventHandler<MouseEvent>;
  onMouseUp: EventHandler<MouseEvent>;
} => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const initialPosition = useRef<Position>();
  const isMouseDown = useRef<boolean>(false);

  const onMouseDrag: EventHandler<MouseEvent> = (event) => {
    if (!isMouseDown.current || !initialPosition.current || !wrapperRef.current)
      return;
    const translateY = event.clientY - initialPosition.current.y;
    const translateX = event.clientX - initialPosition.current.x;
    wrapperRef.current.style.transform = `translate(${translateX}px,${translateY}px)`;
    wrapperRef.current.style.zIndex = "1000";
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
    wrapperRef.current.style.transform = "";
    wrapperRef.current.style.zIndex = "";
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

  return { wrapperRef, onMouseDrag, onMouseDown, onMouseUp };
};

export default useDragNDrop;
