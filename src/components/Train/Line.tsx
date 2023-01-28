import {
  arrayRemove,
  collection,
  doc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { ChangeEvent, useRef, useState } from "react";
import useDragNDrop from "../../hooks/useDragNDrop";
import database from "../../shared/firebaseconfig";
import { TLineObject } from "../types";
import EditableField from "../ui/EditableField";
import Menu from "../ui/Menu/Menu";

interface ILineprops {
  id?: string;
  nameLine?: string;
  stateLinzk?: string;
  documentID?: string;
  rowIndex?: number;
}

const collectionRows = collection(database, "ManageTrains");

const Line = ({ id, nameLine, documentID, rowIndex }: ILineprops) => {
  const outsideClickRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [lineState, setLineState] = useState<string>("");

  const { wrapperRef, onMouseDown, onMouseUp } = useDragNDrop(
    outsideClickRef,
    setIsMenuOpen
  );

  const handleEditLine = () => {
    setIsEditable(true);
    setIsMenuOpen(false);
  };

  const handleSubmitEditLine = async () => {
    const docRefToUpdate = doc(collectionRows, documentID);
    const newValues = {
      id: id,
      nameLine: lineState,
    };
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      const data = sfDoc.data();
      const filterLines = [
        ...data?.line.filter((line: TLineObject) => line.id !== id),
        newValues,
      ];
      transaction.update(docRefToUpdate, { line: filterLines });
    });
    setIsEditable(false);
    setIsMenuOpen(false);
    setLineState("");
  };

  const handleOnChangeLine = (event: ChangeEvent<HTMLInputElement>) => {
    setLineState(event?.target.value);
  };

  const handleDeleteLine = async () => {
    const getDocRef = doc(database, "ManageTrains", documentID!);
    await updateDoc(getDocRef, {
      line: arrayRemove({
        id: id,
        nameLine: nameLine,
      }),
    });
  };

  return (
    <div
      className="relative py-2 w-[70px] border border-black cursor-default"
      ref={wrapperRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {!isEditable && isMenuOpen && (
        <Menu
          outsideClickRef={outsideClickRef}
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
