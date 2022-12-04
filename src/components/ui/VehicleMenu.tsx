import { RefObject } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import ConstructionIcon from "@mui/icons-material/Construction";

interface IVehicleMenuProps {
  outsideClickRef?: RefObject<HTMLDivElement>;
  deleteVehicle?: () => void;
}

const VehicleMenu = ({ outsideClickRef, deleteVehicle }: IVehicleMenuProps) => (
  <div
    ref={outsideClickRef}
    className="absolute bottom-[4.2rem] left-1/2 py-3 w-max bg-primary-gray shadow-[0_0px_14px_-4px_rgba(0,0,0,0.3)] rounded-lg"
  >
    <div className="flex items-center px-4 py-2 gap-4 hover:bg-secondary-yellow">
      <EditIcon sx={{ fontSize: "16px" }} /> Edituj
    </div>
    <div className="flex items-center px-4 py-2 gap-4 hover:bg-secondary-yellow">
      <FormatColorTextIcon sx={{ fontSize: "16px" }} /> Zvol třídu
    </div>
    <div className="flex items-center px-4 py-2 gap-4 hover:bg-secondary-yellow">
      <ConstructionIcon sx={{ fontSize: "16px" }} /> Oprava Vozu
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

export default VehicleMenu;
