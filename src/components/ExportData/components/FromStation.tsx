import { ChangeEvent, useState } from "react";
import { DocumentData, DocumentReference } from "firebase/firestore";
import useExportTransaction from "../../../hooks/Firestore/Pages/ExportTransactions";
import EditField from "./EditField";
import EditIcon from "@mui/icons-material/Edit";
import clsx from "clsx";

interface IFromStationProps {
  stationNameFrom: string;
  stationNameTo: string;
  docRefToUpdate: DocumentReference<DocumentData>;
  isDarkMode: boolean;
  darkEdit: string;
}

const FromStation = ({ stationNameFrom, stationNameTo, docRefToUpdate, isDarkMode, darkEdit }: IFromStationProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [fromStationState, setFromStationState] = useState<string>("");

  const { editFromTransaction } = useExportTransaction(docRefToUpdate);

  const handleEditFromStation = () => {
    setIsEditable(true);
  };

  const handleOnChangeStation = (event: ChangeEvent<HTMLInputElement>) => {
    setFromStationState(event?.target.value);
  };

  const handleSumbitStation = () => {
    editFromTransaction(fromStationState, stationNameTo, setIsEditable);
    setFromStationState("");
  };

  return (
    <div>
      {isEditable && (
        <EditField
          isEditable={isEditable}
          state={fromStationState}
          realData={stationNameFrom}
          isDarkMode={isDarkMode}
          handleOnChange={handleOnChangeStation}
          handleSubmit={handleSumbitStation}
        />
      )}
      {!isEditable && stationNameFrom}
      {!isEditable && (
        <span onClick={handleEditFromStation}>
          <EditIcon className={clsx("edit", darkEdit)} />
        </span>
      )}
    </div>
  );
};

export default FromStation;
