import { RefObject, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import ConstructionIcon from "@mui/icons-material/Construction";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import clsx from "clsx";
import MultiClassMenu from "./MultiClassMenu";
import { Timestamp } from "firebase/firestore";

interface IVehicleMenuProps {
  vehicleID?: string;
  vehicleRepairDate?: Timestamp;
  rowIndex?: number;
  outsideClickRef?: RefObject<HTMLDivElement>;
  deleteVehicle?: () => void;
  editVehicle?: () => void;
  handleClassColor?: (colors: string) => void;
  handleVehicleRepairDate?: (repairD: Timestamp) => void;
}

const VehicleMenu = ({
  vehicleRepairDate,
  rowIndex,
  outsideClickRef,
  deleteVehicle,
  editVehicle,
  handleClassColor,
  handleVehicleRepairDate,
}: IVehicleMenuProps) => {
  const [isHoveredClass, setIsHoveredClass] = useState<boolean>(false);
  const [isHoveredRepair, setIsHoveredRepair] = useState<boolean>(false);

  return (
    <div
      ref={outsideClickRef}
      className={clsx(
        "absolute left-1/2 py-3 w-max bg-primary-gray shadow-[0_0px_14px_-4px_rgba(0,0,0,0.3)] rounded-lg",
        rowIndex === 0 ? "top-[3.5rem] z-10" : "bottom-[4.2rem]"
      )}
    >
      <div
        className="flex items-center px-4 py-2 gap-4 hover:bg-secondary-yellow"
        onClick={editVehicle}
      >
        <EditIcon sx={{ fontSize: "16px" }} /> Edituj
      </div>

      <div
        className="flex justify-between items-center px-4 py-2 gap-4 hover:bg-secondary-yellow"
        onMouseEnter={() => setIsHoveredClass(true)}
        onMouseLeave={() => setIsHoveredClass(false)}
      >
        <div className="flex items-center gap-4 ">
          <FormatColorTextIcon sx={{ fontSize: "16px" }} />
          Zvol třídu
        </div>
        <KeyboardDoubleArrowRightIcon sx={{ fontSize: "16px" }} />
        {isHoveredClass && (
          <MultiClassMenu isColorClass={true} classColor={handleClassColor} />
        )}
      </div>

      <div
        className="flex items-center px-4 py-2 gap-4 hover:bg-secondary-yellow"
        onMouseEnter={() => setIsHoveredRepair(true)}
        onMouseLeave={() => setIsHoveredRepair(false)}
      >
        <ConstructionIcon sx={{ fontSize: "16px" }} /> Oprava Vozu
        <KeyboardDoubleArrowRightIcon sx={{ fontSize: "16px" }} />
        {isHoveredRepair && (
          <MultiClassMenu
            vehicleRepairDate={vehicleRepairDate}
            handleRepairDate={handleVehicleRepairDate}
          />
        )}
      </div>

      <div
        className="flex items-center px-4 py-2 gap-4 hover:bg-secondary-yellow"
        onClick={deleteVehicle}
      >
        <DeleteOutlineIcon sx={{ fontSize: "16px" }} />
        Odstraň
      </div>
    </div>
  );
};
export default VehicleMenu;
