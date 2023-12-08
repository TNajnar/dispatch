import { ChangeEvent } from "react";
import clsx from "clsx";

interface IEditFieldProps {
  isEditable?: boolean;
  state?: string;
  realData?: string;
  isDarkMode?: boolean;
  handleOnChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: () => void;
}

const EditField = ({
  isEditable,
  state,
  realData,
  isDarkMode,
  handleOnChange,
  handleSubmit,
}: IEditFieldProps) => {
  const darkMode = isDarkMode
    ? "text-primary-lightBlue bg-primary-darkBlue1 border-primary-lightBlue hover:border-primary-blue"
    : "text-gray-600 bg-secondary-gray border-primary-gray hover:border-black";

  return (
    <div className={clsx("relative flex justify-center items-center gap-1")}>
      <input
        type="text"
        value={isEditable ? state : realData}
        className={clsx("text-center w-4/5 border rounded-sm ", darkMode)}
        disabled={!isEditable}
        onChange={handleOnChange}
      />
      {isEditable && (
        <div onClick={handleSubmit} className={clsx("w-max h-max text-xs border", darkMode)}>
          OK
        </div>
      )}
    </div>
  );
};

export default EditField;
