import { useState } from "react";
import Locomotive from "../Train/Locomotive";
import Vehicle from "../Train/Vehicle";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import { nanoid } from "nanoid";

const VehicleRow = ({ item }: any) => {
  const [counterVehicle, setCounterVehicle] = useState(0);
  const collectionRows = collection(database, "ManageTrains");
  const id = nanoid();

  const vehicles = item.vehicles;

  const AddVehicle = async () => {
    // const docRef = doc(collectionRows);
    const allCollectionDocs = await getDocs(collectionRows);

    const docRefToUpdate = doc(collectionRows, item.id);
    try {
      await runTransaction(database, async (transaction) => {
        const sfDoc = await transaction.get(docRefToUpdate);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }

        const newVehicle = (sfDoc.data().vehicles = arrayUnion({ id: id }));
        transaction.update(docRefToUpdate, { vehicles: newVehicle });
      });
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
    }

    console.log(item.id);
  };

  return (
    <div className="grid grid-cols-4 pt-4 place-items-center pb-4 w-full border-b border-gray-200">
      <div className="flex col-span-2 items-center gap-4">
        <div
          onClick={AddVehicle}
          className="flex items-center justify-center w-14 h-14  text-3xl border-4 bg-[#fabb00] rounded-full divide-x-4 border-black "
        >
          +
        </div>

        {vehicles.map(() => (
          <Vehicle />
        ))}
      </div>
      <div>
        <Locomotive />
      </div>
      <div className="flex gap-4">
        <div className="px-4 py-2 border border-black">1011</div>
        <div className="px-4 py-2 border border-black">1051</div>
      </div>
    </div>
  );
};

export default VehicleRow;
