import React from "react";
import { useEffect } from "react";

const useClickAbleMenu = (id: string, setIsMenuOpen: React.Dispatch<React.SetStateAction<string>>) => {

    const handleClickOutside = (event?: any) => {
        const menuElements = window.document.getElementsByClassName("vehicleMenu");
        const haveClickedMenu = Array.from(menuElements).some((el) =>
          el.contains(event.target)
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
          window.addEventListener("mouseup", handleClickOutside);
        };
      }, []);
}

export default useClickAbleMenu