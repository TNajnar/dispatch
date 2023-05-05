import { useEffect } from "react";

const useClickAbleMenu = (id: string, setIsMenuOpen: (value: string) => void) => {
  const handleClickOutside = (event?: MouseEvent) => {
    const menuElements = window.document.getElementsByClassName("vehicleMenu");

    // convert menuElements to array and than check if was clicked on some el in menuElements
    const haveClickedMenu = Array.from(menuElements).some((el) => el.contains(event?.target as Node));

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
