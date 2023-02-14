import {
  arrayRemove,
  arrayUnion,
  DocumentData,
  DocumentReference,
  runTransaction,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import database from "../../../shared/firebaseconfig";

const useLocTrans = (
  vehicleDoc: string,
  docRefToUpdate: DocumentReference<DocumentData>
) => {
  const addLocTransaction = async (
    id: string,
    spz: string,
    repairDate: string
  ) => {
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const newCar = (sfDoc.data().vehicles = arrayUnion({
        id: id,
        spz: spz,
        repairDate: repairDate,
        isVehicle: false,
        vehicleDoc: vehicleDoc,
      }));
      transaction.update(docRefToUpdate, { vehicles: newCar });
    });
  };

  const editTransaction = async (
    id: string,
    spz: string,
    repairDate: Timestamp,
    setIsMenuOpen?: React.Dispatch<React.SetStateAction<string>>,
    setIsEditable?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const newLocomotiveSpz = (sfDoc.data().lSpz = spz);
      transaction.update(docRefToUpdate, {
        locomotives: {
          id: id,
          lSpz: newLocomotiveSpz,
          repairDate: repairDate,
          isVehicle: false,
          vehicleDoc: vehicleDoc,
        },
      });
    });
    setIsEditable?.(false)
    setIsMenuOpen?.("");
  };

  const dateTransaction = async (
    id: string,
    spz: string,
    repairDate: Timestamp,
    setIsMenuOpen?: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const locomotiveDate = (sfDoc.data().repairDate = repairDate);
      transaction.update(docRefToUpdate, {
        locomotives: {
          id: id,
          lSpz: spz,
          repairDate: locomotiveDate,
          isVehicle: false,
          vehicleDoc: vehicleDoc,
        },
      });
    });
    setIsMenuOpen?.("");
  };

  const deleteLoc = async (id: string, spz: string, repairDate: Timestamp) => {
    await updateDoc(docRefToUpdate, {
      vehicles: arrayRemove({
        id: id,
        spz: spz,
        repairDate: repairDate,
        isVehicle: false,
        vehicleDoc: vehicleDoc,
      }),
    });
  };

  return {
    addLocTransaction,
    editTransaction,
    dateTransaction,
    deleteLoc,
  };
};

export default useLocTrans;
