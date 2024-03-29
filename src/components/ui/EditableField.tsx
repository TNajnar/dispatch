import { ChangeEvent, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import clsx from "clsx";

interface IEditableFieldProps {
  isEditable?: boolean;
  state?: string;
  realData?: string;
  isLine?: boolean;
  isLocomotive?: boolean;
  handleOnChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: () => void;
}

const EditableField = ({
  isEditable,
  state,
  realData,
  isLine,
  isLocomotive,
  handleOnChange,
  handleSubmit,
}: IEditableFieldProps) => {
  const { isDarkMode } = useContext(ThemeContext);

  const border = (isEditable || !!realData?.length) && !isLine;
  const width = isLine ? "w-10" : "w-12";
  const hover = (isLocomotive || isLine) && isEditable;
  const padding = isLocomotive;
  const darkMode = isDarkMode ? "bg-primary-blue text-primary-lightBlue" : "bg-white text-gray-600";

  return (
    <div
      className={clsx(
        "relative flex justify-center items-center",
        isLocomotive || isLine ? "gap-1" : "gap-2",
        isLocomotive && !isEditable && "left-4",
        isLocomotive && isEditable && "left-1",
        padding && "mb-2"
      )}
    >
      <input
        type="text"
        value={isEditable ? state : realData}
        className={clsx(
          "text-center",
          border && "border-b border-primary-gray rounded-sm",
          width,
          hover && "border border-primary-gray hover:border-black",
          darkMode
        )}
        maxLength={5}
        disabled={!isEditable}
        onChange={handleOnChange}
      />
      {isEditable && (
        <div onClick={handleSubmit} className="w-max h-max text-xs border border-black">
          OK
        </div>
      )}
    </div>
  );
};

export default EditableField;
