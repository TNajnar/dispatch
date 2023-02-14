import {
    arrayRemove,
    arrayUnion,
    DocumentData,
    DocumentReference,
    runTransaction,
    updateDoc,
  } from "firebase/firestore";
  import { TLineObject } from "../../../components/types";
  import database from "../../../shared/firebaseconfig";
  
  const useLineTransaction = (docRefToUpdate: DocumentReference<DocumentData>) => {

    const addLine = async (id: string, nameLine: string) => {
        await updateDoc(docRefToUpdate, {
            line: arrayUnion({ id: id, nameLine: nameLine }),
        });
    }

    const editLineTransaction = async (
      id: string, 
      nameLine: string,
      setIsEditable?: React.Dispatch<React.SetStateAction<boolean>>,
      setOpenPopMenuID?: React.Dispatch<React.SetStateAction<string>>,
      setIsMenuOpen?: React.Dispatch<React.SetStateAction<string>>,
    ) => {
        const newValues = { id: id, nameLine: nameLine };
        await runTransaction(database, async (transaction) => {
            const sfDoc = await transaction.get(docRefToUpdate);
            const data = sfDoc.data();
            const filterLines = [
              ...data?.line.filter((line: TLineObject) => line.id !== id),
              newValues,
            ];
            transaction.update(docRefToUpdate, { line: filterLines });
          });
      setIsEditable?.(false)
      setOpenPopMenuID?.("");
      setIsMenuOpen?.("");
    };
  
    const deleteLine = async (id: string, nameLine: string,) => {
        await updateDoc(docRefToUpdate, {
            line: arrayRemove({
              id: id,
              nameLine: nameLine,
            }),
          });
    }
  
    return { addLine, editLineTransaction, deleteLine };
  };
  
  export default useLineTransaction;
  