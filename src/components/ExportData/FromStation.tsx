import EditIcon from "@mui/icons-material/Edit";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import useExportTransaction from "../../hooks/Firestore/Pages/ExportTransactions";
import EditField from "./ui/EditField";

interface IFromStationProps {
  stationNameFrom: string;
  stationNameTo: string;
  docRefToUpdate: DocumentReference<DocumentData>;
}

const FromStation = ({
  stationNameFrom,
  stationNameTo,
  docRefToUpdate,
}: IFromStationProps) => {
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
          handleOnChange={handleOnChangeStation}
          handleSubmit={handleSumbitStation}
        />
      )}
      {!isEditable && stationNameFrom}
      {!isEditable && (
        <span onClick={handleEditFromStation}>
          <EditIcon className="edit" />
        </span>
      )}
    </div>
  );
};

export default FromStation;
