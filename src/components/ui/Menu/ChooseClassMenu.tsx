import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MultiMenu from "./MultiMenu";

interface IChooseClassMenuProps {
  isHoveredClass?: boolean;
  handleClassColor?: (colors: string) => void;
}

const ChooseClassMenu = ({ isHoveredClass, handleClassColor }: IChooseClassMenuProps) => (
  <div className="flex justify-between items-center w-full px-4 py-2 gap-4 hover:bg-secondary-yellow">
    <div className="flex items-center gap-4">
      <FormatColorTextIcon sx={{ fontSize: "16px" }} />
      Zvol třídu
    </div>
    <KeyboardDoubleArrowRightIcon sx={{ fontSize: "16px" }} />
    {isHoveredClass && <MultiMenu isColorClass={true} classColor={handleClassColor} />}
  </div>
);

export default ChooseClassMenu;
