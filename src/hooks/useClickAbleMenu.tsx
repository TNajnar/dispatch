import React from "react";
import { useEffect } from "react";

const useClickAbleMenu = (
  id: string,
  setIsMenuOpen: React.Dispatch<React.SetStateAction<string>>
) => {
  const handleClickOutside = (event?: MouseEvent) => {
    const menuElements = window.document.getElementsByClassName("vehicleMenu");

    const haveClickedMenu = Array.from(menuElements).some((el) =>
      el.contains(event?.target as Node)
    );

    if (haveClickedMenu) return;

    if (haveClickedMenu) {
      setIsMenuOpen("");
    } else {
      setIsMenuOpen(id!);
    }
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleClickOutside);
    return () => {
      window.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);
};

export default useClickAbleMenu;
