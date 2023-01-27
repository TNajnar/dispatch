import ConstructionIcon from "@mui/icons-material/Construction";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Timestamp } from "firebase/firestore";
import MultiMenu from "./MultiMenu";

interface ICarRepairMenuProps {
  isHoveredRepair?: boolean;
  vehicleRepairDate?: Timestamp;
  handleVehicleRepairDate?: (repairD: Timestamp) => void;
}

const CarRepairMenu = ({
  isHoveredRepair,
  vehicleRepairDate,
  handleVehicleRepairDate,
}: ICarRepairMenuProps) => (
  <div className="flex items-center px-4 py-2 gap-4 hover:bg-secondary-yellow">
    <ConstructionIcon sx={{ fontSize: "16px" }} /> Oprava Vozu
    <KeyboardDoubleArrowRightIcon sx={{ fontSize: "16px" }} />
    {isHoveredRepair && (
      <MultiMenu
        vehicleRepairDate={vehicleRepairDate}
        handleRepairDate={handleVehicleRepairDate}
      />
    )}
  </div>
);

export default CarRepairMenu;
