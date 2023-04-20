import { Timestamp } from "firebase/firestore";
import MultiMenu from "./MultiMenu";
import ConstructionIcon from "@mui/icons-material/Construction";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import clsx from "clsx";

interface ICarRepairMenuProps {
  isHoveredRepair?: boolean;
  carRepairDate?: Timestamp;
  darkHover: string;
  isDarkMode: boolean;
  handleRepairDate?: (repairD: Timestamp) => void;
}

const CarRepairMenu = ({
  isHoveredRepair,
  carRepairDate,
  isDarkMode,
  darkHover,
  handleRepairDate,
}: ICarRepairMenuProps) => (
  <div className={clsx("flex items-center px-4 py-2 gap-4", darkHover)}>
    <ConstructionIcon className="menuIcons" /> Oprava Vozu
    <KeyboardDoubleArrowRightIcon className="menuIcons" />
    {isHoveredRepair && (
      <MultiMenu carRepairDate={carRepairDate} handleRepairDate={handleRepairDate} isDarkMode={isDarkMode} />
    )}
  </div>
);

export default CarRepairMenu;
