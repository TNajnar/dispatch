import { ChangeEvent, useState } from "react";
import { DocumentData, DocumentReference } from "firebase/firestore";
import useExportTransaction from "../../../hooks/Firestore/Pages/ExportTransactions";
import EditField from "./EditField";
import EditIcon from "@mui/icons-material/Edit";
import clsx from "clsx";

interface ICarLeaderProps {
  carLeader: string;
  phone: string;
  docRefToUpdate: DocumentReference<DocumentData>;
  isDarkMode: boolean;
  darkEdit: string;
}

const CarLeader = ({ carLeader, phone, docRefToUpdate, isDarkMode, darkEdit }: ICarLeaderProps) => {
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
          isDarkMode={isDarkMode}
          handleOnChange={handleOnChangeLeader}
          handleSubmit={handleSumbitLeader}
        />
      )}

      {!isEditableLeader && carLeader}

      {!isEditableLeader && (
        <span onClick={handleEditCarLeader}>
          <EditIcon className={clsx("edit", darkEdit)} />
        </span>
      )}
    </div>
  );
};

export default CarLeader;
