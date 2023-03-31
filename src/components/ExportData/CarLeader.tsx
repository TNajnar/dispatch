import { ChangeEvent, useState } from "react";
import EditField from "./ui/EditField";
import EditIcon from "@mui/icons-material/Edit";
import { DocumentData, DocumentReference } from "firebase/firestore";
import useExportTransaction from "../../hooks/Firestore/Pages/ExportTransactions";

interface ICarLeaderProps {
  carLeader: string;
  phone: string;
  docRefToUpdate: DocumentReference<DocumentData>;
}

const CarLeader = ({ carLeader, phone, docRefToUpdate }: ICarLeaderProps) => {
  const [isEditableLeader, setIsEditableLeader] = useState<boolean>(false);
  const [leaderState, setLeaderState] = useState<string>("");

  const { editLeaderTransaction } = useExportTransaction(docRefToUpdate);

  const handleEditCarLeader = () => {
    setIsEditableLeader(true);
  };

  const handleOnChangeLeader = (event: ChangeEvent<HTMLInputElement>) => {
    setLeaderState(event?.target.value);
  };

  const handleSumbitLeader = () => {
    editLeaderTransaction(leaderState, phone, setIsEditableLeader);
    setLeaderState("");
  };

  return (
    <div>
      {isEditableLeader && (
        <EditField
          isEditable={isEditableLeader}
          state={leaderState}
          realData={carLeader}
          handleOnChange={handleOnChangeLeader}
          handleSubmit={handleSumbitLeader}
        />
      )}

      {!isEditableLeader && carLeader}

      {!isEditableLeader && (
        <span onClick={handleEditCarLeader}>
          <EditIcon className="edit" />
        </span>
      )}
    </div>
  );
};

export default CarLeader;
