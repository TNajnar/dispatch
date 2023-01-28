import { RefObject, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import clsx from "clsx";
import { Timestamp } from "firebase/firestore";
import ChooseClassMenu from "./ChooseClassMenu";
import CarRepairMenu from "./CarRepairMenu";

interface IMenuProps {
  carRepairDate?: Timestamp;
  rowIndex?: number;
  outsideClickRef?: RefObject<HTMLDivElement>;
  isLineMenu?: boolean;
  isLocomotive?: boolean;
  editItem?: () => void;
  deleteItem?: () => void;
  handleClassColor?: (colors: string) => void;
  handleRepairDate?: (repairD: Timestamp) => void;
}

const Menu = ({
  carRepairDate,
  rowIndex,
  outsideClickRef,
  isLineMenu,
  isLocomotive,
  editItem,
  deleteItem,
  handleClassColor,
  handleRepairDate,
}: IMenuProps) => {
  const [isHoveredClass, setIsHoveredClass] = useState<boolean>(false);
  const [isHoveredRepair, setIsHoveredRepair] = useState<boolean>(false);

  return (
    <div
      ref={outsideClickRef}
      className={clsx(
        "absolute z-10 py-3 w-max h-max bg-secondary-gray shadow-[0_0px_14px_-4px_rgba(0,0,0,0.3)] rounded-lg",
        !isLineMenu && rowIndex === 0 && "top-14 left-1/2",
        isLineMenu && rowIndex === 0 && "top-[41px] right-1/2",
        isLineMenu ? "bottom-[41px] right-1/2" : "bottom-[69px] left-1/2"
      )}
    >
      <div
        className="flex items-center px-4 py-2 gap-4 hover:bg-secondary-yellow"
        onClick={editItem}
      >
        <EditIcon sx={{ fontSize: "16px" }} /> Edituj
      </div>

      {!isLineMenu && !isLocomotive && (
        <div
          onMouseEnter={() => setIsHoveredClass(true)}
          onMouseLeave={() => setIsHoveredClass(false)}
        >
          <ChooseClassMenu
            isHoveredClass={isHoveredClass}
            handleClassColor={handleClassColor}
          />
        </div>
      )}

      {!isLineMenu && (
        <div
          onMouseEnter={() => setIsHoveredRepair(true)}
          onMouseLeave={() => setIsHoveredRepair(false)}
        >
          <CarRepairMenu
            isHoveredRepair={isHoveredRepair}
            carRepairDate={carRepairDate}
            handleRepairDate={handleRepairDate}
          />
        </div>
      )}

      {!isLocomotive && (
        <div
          className="flex items-center px-4 py-2 gap-4 hover:bg-secondary-yellow"
          onClick={deleteItem}
        >
          <DeleteOutlineIcon sx={{ fontSize: "16px" }} />
          Odstraň
        </div>
      )}
    </div>
  );
};
export default Menu;