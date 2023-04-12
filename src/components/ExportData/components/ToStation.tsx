import { ChangeEvent, useState } from "react";
import { DocumentData, DocumentReference } from "firebase/firestore";
import useExportTransaction from "../../../hooks/Firestore/Pages/ExportTransactions";
import EditIcon from "@mui/icons-material/Edit";
import EditField from "./EditField";

interface IToStationProps {
  stationNameFrom: string;
  stationNameTo: string;
  docRefToUpdate: DocumentReference<DocumentData>;
}

const ToStation = ({ stationNameFrom, stationNameTo, docRefToUpdate }: IToStationProps) => {
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
          handleOnChange={handleOnChangeStation}
          handleSubmit={handleSumbitStation}
        />
      )}
      {!isEditable && stationNameTo}
      {!isEditable && (
        <span onClick={handleEditToStation}>
          <EditIcon className="edit" />
        </span>
      )}
    </div>
  );
};

export default ToStation;
