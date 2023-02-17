import { DocumentData, DocumentReference, runTransaction } from "firebase/firestore";
import database from "../../../shared/firebaseconfig";

const useExportTransaction = (docRefToUpdate: DocumentReference<DocumentData>) => {
  const editLeaderTransaction = async (
    leaderState: string,
    phone: string,
    setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const newCarLeader = (sfDoc.data().carLeader = leaderState);
      transaction.update(docRefToUpdate, {
        contact: {
          carLeader: newCarLeader,
          phone: phone,
        },
      });
    });
    setIsEditable(false);
  };

  const editPhoneTransaction = async (
    carLeader: string,
    phoneState: string,
    setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const newPhone = (sfDoc.data().phone = phoneState);
      transaction.update(docRefToUpdate, {
        contact: {
          carLeader: carLeader,
          phone: newPhone,
        },
      });
    });
    setIsEditable(false);
  };

  return { editLeaderTransaction, editPhoneTransaction };
};

export default useExportTransaction;
