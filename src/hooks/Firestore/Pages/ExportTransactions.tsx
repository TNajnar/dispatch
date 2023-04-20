import { DocumentData, DocumentReference, runTransaction } from "firebase/firestore";
import database from "../../../shared/firebaseconfig";

const useExportTransaction = (docRefToUpdate: DocumentReference<DocumentData>) => {
  const editLeaderTransaction = async (leaderState: string, phone: string, setIsEditable: (value: boolean) => void) => {
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
    setIsEditable: (value: boolean) => void
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

  const editFromTransaction = async (fromStationState: string, to: string, setIsEditable: (value: boolean) => void) => {
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const newFromStation = (sfDoc.data().station = fromStationState);
      transaction.update(docRefToUpdate, {
        station: {
          from: newFromStation,
          to: to,
        },
      });
    });
    setIsEditable(false);
  };

  const editToTransaction = async (from: string, toStationState: string, setIsEditable: (value: boolean) => void) => {
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const newToStation = (sfDoc.data().station = toStationState);
      transaction.update(docRefToUpdate, {
        station: {
          from: from,
          to: newToStation,
        },
      });
    });
    setIsEditable(false);
  };

  return {
    editLeaderTransaction,
    editPhoneTransaction,
    editFromTransaction,
    editToTransaction,
  };
};

export default useExportTransaction;
