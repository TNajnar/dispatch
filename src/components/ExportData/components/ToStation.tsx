import { ChangeEvent, useState } from "react";
import { DocumentData, DocumentReference } from "firebase/firestore";
import useExportTransaction from "../../../hooks/Firestore/Pages/ExportTransactions";
import EditIcon from "@mui/icons-material/Edit";
import EditField from "./EditField";
import clsx from "clsx";

interface IToStationProps {
  stationNameFrom: string;
  stationNameTo: string;
  docRefToUpdate: DocumentReference<DocumentData>;
  isDarkMode: boolean;
  darkEdit: string;
}

const ToStation = ({
  stationNameFrom,
  stationNameTo,
  docRefToUpdate,
  isDarkMode,
  darkEdit,
}: IToStationProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [toStationState, setToStationState] = useState<string>("");

  const { editToTransaction } = useExportTransaction(docRefToUpdate);

  const handleEditToStation = () => {
    setIsEditable(true);
  };

  const handleOnChangeStation = (event: ChangeEvent<HTMLInputElement>) => {
    setToStationState(event?.target.value);
  };

  const handleSumbitStation = () => {
    editToTransaction(stationNameFrom, toStationState, setIsEditable);
    setToStationState("");
  };
  return (
    <div>
      {isEditable && (
        <EditField
          isEditable={isEditable}
          state={toStationState}
          realData={stationNameTo}
          isDarkMode={isDarkMode}
          handleOnChange={handleOnChangeStation}
          handleSubmit={handleSumbitStation}
        />
      )}
      {!isEditable && stationNameTo}
      {!isEditable && (
        <span onClick={handleEditToStation}>
          <EditIcon className={clsx("edit", darkEdit)} />
        </span>
      )}
    </div>
  );
};

export default ToStation;
