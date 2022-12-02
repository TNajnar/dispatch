import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import Vehicle from "../Train/Vehicle";
import Button from "../ui/Button";
import { nanoid } from "nanoid";

const TrainRail = ({ document }: any) => {
  const collectionRows = collection(database, "ParkedVehicles");
  const id = nanoid();

  const parkedVehicles = document.vehicles;

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
    const getDocRef = doc(database, "ParkedVehicles", document.id);
    await updateDoc(getDocRef, {
      vehicles: arrayRemove({ id: vehicleID }),
    });
  };

  return (
    <div className="flex items-center py-4 gap-8 border-b border-gray h-full">
      <h2 className="pr-4 text-h3 font-bold border-r border-black">17a</h2>
      {parkedVehicles.map((vehicle: any) => (
        <div className="relative flex justify-center">
          <Button
            text="-"
            clasName="absolute bottom-16"
            onClick={() => DeleteVehicle(vehicle.id)}
          />
          <Vehicle />
        </div>
      ))}

      <Button text="+" onClick={AddVehicle} isRounded={true} />
    </div>
  );
};

export default TrainRail;
