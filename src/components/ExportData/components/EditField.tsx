import { ChangeEvent } from "react";
import clsx from "clsx";

interface IEditFieldProps {
  isEditable?: boolean;
  state?: string;
  realData?: string;
  handleOnChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: () => void;
}

const EditField = ({
  isEditable,
  state,
  realData,
  handleOnChange,
  handleSubmit,
}: IEditFieldProps) => {
  return (
    <div className={clsx("relative flex justify-center items-center gap-1")}>
      <input
        type="text"
        value={isEditable ? state : realData}
        className={clsx(
          "text-center w-4/5 text-gray-600 bg-secondary-gray border border-primary-gray rounded-sm hover:border-black"
        )}
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

export default EditField;
