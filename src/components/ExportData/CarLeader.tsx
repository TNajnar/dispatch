import { ChangeEvent, useState } from "react";
import EditField from "./ui/EditField";
import EditIcon from "@mui/icons-material/Edit";
import { DocumentData, DocumentReference, runTransaction } from "firebase/firestore";
import useExportTransaction from "../../hooks/Firestore/Pages/ExportTransactions";

interface ICarLeaderProps {
  isEditable: boolean;
  carLeader: string;
  phone: string;
  docRefToUpdate: DocumentReference<DocumentData>;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

const CarLeader = ({
  isEditable,
  carLeader,
  phone,
  docRefToUpdate,
  setIsEditable,
}: ICarLeaderProps) => {
  const [leaderState, setLeaderState] = useState<string>("");

  const { editLeaderTransaction } = useExportTransaction(docRefToUpdate);

  const handleEditCarLeader = () => {
    setIsEditable(true);
  };

  const handleOnChangeLeader = (event: ChangeEvent<HTMLInputElement>) => {
    setLeaderState(event?.target.value);
  };

  const handleSumbitLeader = () => {
    editLeaderTransaction(leaderState, phone, setIsEditable);
    setLeaderState("");
  };

  return (
    <div>
      {isEditable && (
        <EditField
          isEditable={isEditable}
          state={leaderState}
          realData={carLeader}
          handleOnChange={handleOnChangeLeader}
          handleSubmit={handleSumbitLeader}
        />
      )}

      {!isEditable && carLeader}

      {!isEditable && (
        <span onClick={handleEditCarLeader}>
          <EditIcon className="edit" />
        </span>
      )}
    </div>
  );
};

export default CarLeader;
