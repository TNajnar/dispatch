import { ChangeEvent, useState } from "react";
import { DocumentData, DocumentReference } from "firebase/firestore";
import useExportTransaction from "../../../hooks/Firestore/Pages/ExportTransactions";
import EditField from "./EditField";
import EditIcon from "@mui/icons-material/Edit";

interface ICarPhoneProps {
  carLeader: string;
  phone: string;
  docRefToUpdate: DocumentReference<DocumentData>;
}

const CarPhone = ({ carLeader, phone, docRefToUpdate }: ICarPhoneProps) => {
  const [isEditablePhone, setIsEditablePhone] = useState<boolean>(false);
  const [phoneState, setPhoneState] = useState<string>("");

  const { editPhoneTransaction } = useExportTransaction(docRefToUpdate);

  const handleEditCarPhone = () => {
    setIsEditablePhone(true);
  };

  const handleOnChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneState(event?.target.value);
  };

  const handleSumbitPhone = () => {
    editPhoneTransaction(carLeader, phoneState, setIsEditablePhone);
    setPhoneState("");
  };

  return (
    <div>
      {isEditablePhone && (
        <EditField
          isEditable={isEditablePhone}
          state={phoneState}
          realData={phone}
          handleOnChange={handleOnChangePhone}
          handleSubmit={handleSumbitPhone}
        />
      )}

      {!isEditablePhone && phone}

      {!isEditablePhone && (
        <span onClick={handleEditCarPhone}>
          <EditIcon className="edit" />
        </span>
      )}
    </div>
  );
};

export default CarPhone;
