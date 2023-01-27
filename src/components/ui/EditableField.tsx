import clsx from "clsx";
import { ChangeEvent } from "react";

interface IEditableFieldProps {
  isEditable?: boolean;
  state?: string;
  realData?: string;
  isLine?: boolean;
  handleOnChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: () => void;
}

const EditableField = ({
  isEditable,
  state,
  realData,
  isLine,
  handleOnChange,
  handleSubmit,
}: IEditableFieldProps) => (
  <div
    className={clsx(
      "relative flex justify-center items-center",
      isLine ? "gap-1" : "gap-2"
    )}
  >
    <input
      type="text"
      value={isEditable ? state : realData}
      className={clsx(
        "text-center text-gray-600 bg-white",
        (isEditable || !!realData?.length) &&
          !isLine &&
          "border-b border-secondary-gray rounded-sm",
        isLine ? "w-10" : "w-12",
        isLine &&
          isEditable &&
          "border border-secondary-gray hover:border-black"
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

export default EditableField;
