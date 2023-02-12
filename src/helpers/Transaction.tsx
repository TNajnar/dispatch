import {
  arrayUnion,
  DocumentData,
  DocumentReference,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import database from "../shared/firebaseconfig";

const DropTransaction = (
  id: string,
  spz: string,
  repairDate: Timestamp,
  isVehicle: boolean
) => {
  const updateDropVehicle = async (
    classCol: string,
    docRefToUpdate: DocumentReference<DocumentData>,
    updatedDoc: string
  ) => {
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const newCar = (sfDoc.data().vehicles = arrayUnion({
        id: id,
        spz: spz,
        class: classCol,
        repairDate: repairDate,
        isVehicle: isVehicle,
        vehicleDoc: updatedDoc,
      }));
      transaction.update(docRefToUpdate, { vehicles: newCar });
    });
  };

  const updateDropLocomotive = async (
    docRefToUpdate: DocumentReference<DocumentData>,
    updatedDoc: string
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
        isVehicle: isVehicle,
        vehicleDoc: updatedDoc,
      }));
      transaction.update(docRefToUpdate, { vehicles: newCar });
    });
  };

  return { updateDropVehicle, updateDropLocomotive };
};

export default DropTransaction;
