import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MultiMenu from "./MultiMenu";
import clsx from "clsx";

interface IChooseClassMenuProps {
  isHoveredClass?: boolean;
  isDarkMode: boolean;
  darkHover: string;
  handleClassColor?: (colors: string) => void;
}

const ChooseClassMenu = ({
  isHoveredClass,
  handleClassColor,
  isDarkMode,
  darkHover,
}: IChooseClassMenuProps) => (
  <div className={clsx("flex justify-between items-center w-full px-4 py-2 gap-4", darkHover)}>
    <div className="flex items-center gap-4">
      <FormatColorTextIcon className="menuIcons" />
      Zvol třídu
    </div>
    <KeyboardDoubleArrowRightIcon className="menuIcons" />
    {isHoveredClass && (
      <MultiMenu isColorClass={true} classColor={handleClassColor} isDarkMode={isDarkMode} />
    )}
  </div>
);

export default ChooseClassMenu;
