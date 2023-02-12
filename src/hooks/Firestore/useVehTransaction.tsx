import {
  arrayUnion,
  DocumentData,
  DocumentReference,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { TVehicleObject } from "../../components/types";
import database from "../../shared/firebaseconfig";

const useVehTransaction = (
  isVehicle: boolean,
  vehicleDoc: string,
  docRefToUpdate: DocumentReference<DocumentData>
) => {
  const addVehicleTransaction = async (
    id: string,
    spz: string,
    classColor: string,
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
        class: classColor,
        repairDate: repairDate,
        isVehicle: isVehicle,
        vehicleDoc: vehicleDoc,
      }));
      transaction.update(docRefToUpdate, { vehicles: newCar });
    });
  };

  const editVehTransaction = async (
    id: string,
    spz: string,
    classColor: string,
    repairDate: Timestamp,
    setIsMenuOpen?: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const newValues = {
      id: id,
      spz: spz,
      class: classColor,
      repairDate: repairDate,
      isVehicle: true,
      vehicleDoc: vehicleDoc,
    };
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      const data = sfDoc.data();
      const filterVehicles = [
        ...data?.vehicles.filter((veh: TVehicleObject) => veh.id !== id),
        newValues,
      ];
      transaction.update(docRefToUpdate, { vehicles: filterVehicles });
    });
    setIsMenuOpen?.("");
  };

  return { addVehicleTransaction, editVehTransaction };
};

export default useVehTransaction;
