import {
  arrayRemove,
  collection,
  doc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import useLineTransaction from "../../hooks/Firestore/useLineTransaction";
import database from "../../shared/firebaseconfig";
import { TLineObject } from "../types";
import EditableField from "../ui/EditableField";
import Menu from "../ui/Menu/Menu";

interface ILineprops {
  id: string;
  nameLine: string;
  documentID: string;
  rowIndex?: number;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<string>>;
  isMenuOpen?: string;
}

const collectionRows = collection(database, "ManageTrains");

const Line = ({
  id,
  nameLine,
  documentID,
  rowIndex,
  isMenuOpen,
  setIsMenuOpen,
}: ILineprops) => {
  const [isOpenPopMenuID, setOpenPopMenuID] = useState<string>("");
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [lineState, setLineState] = useState<string>("");

  const docRefToUpdate = doc(collectionRows, documentID);

  const { editLineTransaction, deleteLine} = useLineTransaction(docRefToUpdate);

  const handleEditLine = () => {
    setIsEditable(true);
    setOpenPopMenuID("");
  };

  const handleSubmitEditLine = () => {
    editLineTransaction(id, lineState, setIsEditable, setOpenPopMenuID, setIsMenuOpen);
    setLineState("")
  };

  const handleOnChangeLine = (event: ChangeEvent<HTMLInputElement>) => {
    setLineState(event?.target.value);
  };

  const handleDeleteLine = () => {
    deleteLine(id, nameLine)
  };

  return (
    <div className="relative py-2 w-[70px] border border-black cursor-default">
      {!isEditable && isMenuOpen === id && (
        <Menu
          editItem={handleEditLine}
          deleteItem={handleDeleteLine}
          isLineMenu={true}
          rowIndex={rowIndex}
        />
      )}
      <div className="flex justify-center">
        <EditableField
          isEditable={isEditable}
          state={lineState}
          realData={nameLine}
          isLine={true}
          handleOnChange={handleOnChangeLine}
          handleSubmit={handleSubmitEditLine}
        />
      </div>
    </div>
  );
};

export default Line;
