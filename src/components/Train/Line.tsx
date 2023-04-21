import { ChangeEvent, useContext, useState } from "react";
import { collection, doc } from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import { ThemeContext } from "../../context/ThemeContext";
import { useLineTransaction } from "../../hooks/Firestore";
import { EditableField, Menu } from "../ui";
import clsx from "clsx";

interface ILineprops {
  id: string;
  nameLine: string;
  documentID: string;
  rowIndex?: number;
  setIsMenuOpen: (value: string) => void;
  isMenuOpen?: string;
}

const collectionRows = collection(database, "ManageTrains");

const Line = ({ id, nameLine, documentID, rowIndex, isMenuOpen, setIsMenuOpen }: ILineprops) => {
  const [isOpenPopMenuID, setOpenPopMenuID] = useState<string>("");
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [lineState, setLineState] = useState<string>("");

  const { isDarkMode } = useContext(ThemeContext);

  const darkModeBg = isDarkMode ? "bg-primary-blue" : "bg-white";

  const docRefToUpdate = doc(collectionRows, documentID);

  const { editLineTransaction, deleteLine } = useLineTransaction(docRefToUpdate);

  const handleEditLine = () => {
    setIsEditable(true);
    setOpenPopMenuID("");
  };

  const handleSubmitEditLine = () => {
    editLineTransaction(id, lineState, setIsEditable, setOpenPopMenuID, setIsMenuOpen);
    setLineState("");
  };

  const handleOnChangeLine = (event: ChangeEvent<HTMLInputElement>) => {
    setLineState(event?.target.value);
  };

  const handleDeleteLine = () => {
    deleteLine(id, nameLine);
  };

  return (
    <div
      className={clsx("relative py-2 w-[70px] border hover:border-2 border-black cursor-default", darkModeBg)}
    >
      {!isEditable && isMenuOpen === id && (
        <Menu editItem={handleEditLine} deleteItem={handleDeleteLine} isLineMenu={true} rowIndex={rowIndex} />
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
