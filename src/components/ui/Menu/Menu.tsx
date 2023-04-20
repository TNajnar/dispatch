import { useContext, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { CarRepairMenu, ChooseClassMenu } from "./components";
import { ThemeContext } from "../../../helpers/ThemeContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import clsx from "clsx";

interface IMenuProps {
  carRepairDate?: Timestamp;
  rowIndex?: number;
  isLineMenu?: boolean;
  isLocomotive?: boolean;
  isParked?: boolean;
  editItem?: () => void;
  deleteItem?: () => void;
  handleClassColor?: (colors: string) => void;
  handleRepairDate?: (repairD: Timestamp) => void;
}

const Menu = ({
  carRepairDate,
  rowIndex,
  isLineMenu,
  isLocomotive,
  isParked,
  editItem,
  deleteItem,
  handleClassColor,
  handleRepairDate,
}: IMenuProps) => {
  const [isHoveredClass, setIsHoveredClass] = useState<boolean>(false);
  const [isHoveredRepair, setIsHoveredRepair] = useState<boolean>(false);

  const { isDarkMode } = useContext(ThemeContext);

  const darkHover = isDarkMode ? "hover:bg-primary-blue" : "hover:bg-secondary-yellow";

  return (
    <div
      className={clsx(
        "vehicleMenu",
        "absolute z-30 py-3 w-max h-max shadow-default rounded-lg",
        isDarkMode ? "bg-primary-darkBlue" : "bg-secondary-gray",
        !isLineMenu && rowIndex === 0 && "top-14 left-1/2",
        isLineMenu && rowIndex === 0 && "top-[41px] right-1/2",
        isLineMenu ? "bottom-[41px] right-1/2" : "bottom-[69px] left-1/2"
      )}
    >
      <div className={clsx("flex items-center px-4 py-2 gap-4", darkHover)} onClick={editItem}>
        <EditIcon className="menuIcons" /> Edituj
      </div>

      {!isLineMenu && !isLocomotive && (
        <div onMouseEnter={() => setIsHoveredClass(true)} onMouseLeave={() => setIsHoveredClass(false)}>
          <ChooseClassMenu
            isHoveredClass={isHoveredClass}
            isDarkMode={isDarkMode}
            darkHover={darkHover}
            handleClassColor={handleClassColor}
          />
        </div>
      )}

      {!isLineMenu && (
        <div onMouseEnter={() => setIsHoveredRepair(true)} onMouseLeave={() => setIsHoveredRepair(false)}>
          <CarRepairMenu
            isHoveredRepair={isHoveredRepair}
            carRepairDate={carRepairDate}
            isDarkMode={isDarkMode}
            darkHover={darkHover}
            handleRepairDate={handleRepairDate}
          />
        </div>
      )}

      <div
        className={clsx("flex items-center px-4 py-2 gap-4", darkHover, !isParked && isLocomotive && "hidden")}
        onClick={deleteItem}
      >
        <DeleteOutlineIcon className="menuIcons" />
        Odstraň
      </div>
    </div>
  );
};
export default Menu;
