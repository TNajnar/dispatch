import {
  DocumentData,
  DocumentReference,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { TVehicleObject } from "../../../components/types";
import database from "../../../shared/firebaseconfig";

const useLocFilterTrans = (
  vehicleDoc: string,
  docRefToUpdate: DocumentReference<DocumentData>
) => {
  const editTransactionF = async (
    id: string,
    spz: string,
    repairDate: Timestamp,
    setIsMenuOpen?: (value: string) => void,
    setIsEditable?: (value: boolean) => void
  ) => {
    const newValues = {
      id: id,
      spz: spz,
      repairDate: repairDate,
      isVehicle: false,
      vehicleDoc: vehicleDoc,
    };
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      const data = sfDoc.data();
      const filterCars = [
        ...data?.vehicles.filter((car: TVehicleObject) => car.id !== id),
        newValues,
      ];
      transaction.update(docRefToUpdate, { vehicles: filterCars });
    });
    setIsEditable?.(false);
    setIsMenuOpen?.("");
  };

  const dateFilterTransaction = async (
    id: string,
    spz: string,
    repairDate: Timestamp,
    setIsMenuOpen?: (value: string) => void
  ) => {
    const newValues = {
      id: id,
      spz: spz,
      repairDate: repairDate,
      isVehicle: false,
      vehicleDoc: vehicleDoc,
    };
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      const data = sfDoc.data();
      const filterCars = [
        ...data?.vehicles.filter((veh: TVehicleObject) => veh.id !== id),
        newValues,
      ];
      transaction.update(docRefToUpdate, { vehicles: filterCars });
    });
    setIsMenuOpen?.("");
  };

  return {
    editTransactionF,
    dateFilterTransaction,
  };
};

export default useLocFilterTrans;
