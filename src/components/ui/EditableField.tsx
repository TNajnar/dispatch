import clsx from "clsx";
import { ChangeEvent } from "react";

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
  const border = (isEditable || !!realData?.length) && !isLine;
  const width = isLine ? "w-10" : "w-12";
  const hover = (isLocomotive || isLine) && isEditable;
  const padding = isLocomotive;

  return (
    <div
      className={clsx(
        "relative flex justify-center items-center",
        isLocomotive || isLine ? "gap-1" : "gap-2",
        isLocomotive && "left-4",
        isLocomotive && isEditable && "left-1",
        padding && "mb-2"
      )}
    >
      <input
        type="text"
        value={isEditable ? state : realData}
        className={clsx(
          "text-center text-gray-600 bg-white",
          border && "border-b border-secondary-gray rounded-sm",
          width,
          hover && "border border-secondary-gray hover:border-black"
        )}
        disabled={!isEditable}
        onChange={handleOnChange}
      />
      {isEditable && (
        <div
          className="w-max h-max text-xs border border-black"
          onClick={handleSubmit}
        >
          OK
        </div>
      )}
    </div>
  );
};

export default EditableField;
