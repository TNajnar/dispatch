import { useState } from "react";
import Locomotive from "../Train/Locomotive";
import Vehicle from "../Train/Vehicle";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import { nanoid } from "nanoid";
import Button from "../ui/Button";

const VehicleRow = ({ document }: any) => {
  const collectionRows = collection(database, "ManageTrains");
  const id = nanoid();

  const vehicles = document.vehicles;

  const AddVehicle = async () => {
    const docRefToUpdate = doc(collectionRows, document.id);
    try {
      await runTransaction(database, async (transaction) => {
        const sfDoc = await transaction.get(docRefToUpdate);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }

        const newVehicle = (sfDoc.data().vehicles = arrayUnion({ id: id }));
        transaction.update(docRefToUpdate, { vehicles: newVehicle });
      });
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };

  const DeleteVehicle = async (vehicleID: string) => {
    const getDocRef = doc(database, "ManageTrains", document.id);
    await updateDoc(getDocRef, {
      vehicles: arrayRemove({ id: vehicleID }),
    });
  };

  return (
    <div className="grid grid-cols-4 pt-4 place-items-center pb-4 w-full border-b border-gray-200">
      <div className="flex col-span-2 items-center gap-4">
        <Button text="+" onClick={AddVehicle} isRounded={true} />

        {vehicles.map((vehicle: any) => (
          <div className="relative flex flex-col items-center gap-6">
            <Button
              text="-"
              clasName="absolute bottom-20"
              onClick={() => DeleteVehicle(vehicle.id)}
            />

            <Vehicle key={vehicle.id} />
          </div>
        ))}
      </div>
      <div>
        <Locomotive />
      </div>
      <div className="flex gap-4">
        <div className="px-4 py-2 border border-black">1011</div>
        <div className="px-4 py-2 border border-black">1051</div>
        <div className="px-4 py-2 border border-black">1057</div>
      </div>
    </div>
  );
};

export default VehicleRow;
