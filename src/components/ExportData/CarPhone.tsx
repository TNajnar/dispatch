import { ChangeEvent, useState } from "react";
import EditField from "./ui/EditField";
import EditIcon from "@mui/icons-material/Edit";
import { DocumentData, DocumentReference, runTransaction } from "firebase/firestore";
import useExportTransaction from "../../hooks/Firestore/Pages/ExportTransactions";

interface ICarPhoneProps {
  isEditable: boolean;
  carLeader: string;
  phone: string;
  docRefToUpdate: DocumentReference<DocumentData>;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

const CarPhone = ({
  isEditable,
  carLeader,
  phone,
  docRefToUpdate,
  setIsEditable,
}: ICarPhoneProps) => {
  const [phoneState, setPhoneState] = useState<string>("");

  const { editPhoneTransaction } = useExportTransaction(docRefToUpdate);

  const handleEditCarPhone = () => {
    setIsEditable(true);
  };

  const handleOnChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneState(event?.target.value);
  };

  const handleSumbitPhone = () => {
    editPhoneTransaction(carLeader, phoneState, setIsEditable);
    setPhoneState("");
  };

  return (
    <div>
      {isEditable && (
        <EditField
          isEditable={isEditable}
          state={phoneState}
          realData={phone}
          handleOnChange={handleOnChangePhone}
          handleSubmit={handleSumbitPhone}
        />
      )}

      {!isEditable && phone}

      {!isEditable && (
        <span onClick={handleEditCarPhone}>
          <EditIcon className="edit" />
        </span>
      )}
    </div>
  );
};

export default CarPhone;
