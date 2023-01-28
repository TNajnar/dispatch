import {
  arrayUnion,
  collection,
  doc,
  runTransaction,
} from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import Vehicle from "../Train/Vehicle";
import Button from "../ui/Button";
import { nanoid } from "nanoid";
import { TParkedVehicleDoc } from "../types";

interface ITrainRailProps {
  document: TParkedVehicleDoc;
  rowIndex?: number;
}

const collectionRows = collection(database, "ParkedVehicles");

const TrainRail = ({ document, rowIndex }: ITrainRailProps) => {
  const nameRail = document.nameRail;
  const parkedVehicles = document.vehicles;
  const collectionName = "ParkedVehicles";

  const id = nanoid();

  const addVehicle = async () => {
    const docRefToUpdate = doc(collectionRows, document.id);
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const newVehicle = (sfDoc.data().vehicles = arrayUnion({
        id: id,
        spz: "",
        class: "",
        repairDate: "",
      }));
      transaction.update(docRefToUpdate, { vehicles: newVehicle });
    });
  };

  return (
    <div className="flex items-center py-4 gap-5 border-b border-primary-gray">
      {!!nameRail && (
        <h2 className="w-20 text-h3 font-bold border-r border-black">
          {nameRail}
        </h2>
      )}
      {parkedVehicles.map((vehicle) => (
        <div key={vehicle.id} className="relative flex justify-center">
          <Vehicle
            id={vehicle.id}
            vehicleSpz={vehicle.spz}
            vehicleClass={vehicle.class}
            vehicleRepairDate={vehicle.repairDate}
            documentID={document.id}
            collectionName={collectionName}
            rowIndex={rowIndex}
          />
        </div>
      ))}
      <div className="flex-1"></div>
      <Button text="+" onClick={addVehicle} isRounded={true} />
    </div>
  );
};

export default TrainRail;
