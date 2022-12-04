import { useRef, useState } from "react";
import Locomotive from "../Train/Locomotive";
import Vehicle from "../Train/Vehicle";
import {
  arrayUnion,
  collection,
  doc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import database from "../../shared/firebaseconfig";
import { nanoid } from "nanoid";
import Button from "../ui/Button";
import PopUpMenu from "../ui/PopUpMenu";

const collectionRows = collection(database, "ManageTrains");

const VehicleRow = ({ document }: any): JSX.Element => {
  const outsideClickRef = useRef<HTMLDivElement>(null);
  const [openMenuID, setOpenMenuID] = useState<string>();
  const [nameLine, setNameLine] = useState<string>();

  const id = nanoid();

  const vehicles = document.vehicles;
  const lines = document.line;

  const linesLenght = Object.keys(lines).length;

  const addVehicle = async () => {
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

  const handleSubmit = (event: any) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    addLine();
    setNameLine(undefined);
    setOpenMenuID(undefined);
  };

  const handleOnChange = (event: any) => {
    setNameLine(event.target.value);
  };

  const addLine = async () => {
    const docRefToUpdate = doc(collectionRows, document.id);
    setOpenMenuID(document.id);
    await updateDoc(docRefToUpdate, {
      line: arrayUnion({ id: id, nameLine: nameLine }),
    });
  };

  const handleCloseMenu = () => {
    setOpenMenuID(undefined);
  };

  return (
    <div className="grid grid-cols-4 pt-4 place-items-center pb-4 w-full border-b border-gray">
      <div className="flex col-span-2 items-center gap-4">
        <Button text="+" onClick={addVehicle} isRounded={true} />
        {vehicles.map((vehicle: any) => (
          <div key={vehicle.id} className="flex flex-col items-center gap-6">
            <Vehicle id={vehicle.id} documentID={document.id} />
          </div>
        ))}
      </div>
      <div>
        <Locomotive />
      </div>
      <div className="flex gap-4">
        {linesLenght < 3 && <Button text="+" onClick={addLine} />}
        {lines.map(
          (line: any) =>
            !!line.nameLine && (
              <div key={line.id} className="px-4 py-2 border border-black">
                {line.nameLine}
              </div>
            )
        )}
      </div>

      <PopUpMenu
        open={!!openMenuID}
        value={nameLine}
        title="Název linky"
        context="Zde napiš nápiš název linky."
        label="Název linky"
        handleClose={handleCloseMenu}
        handleOnSubmit={() => handleSubmit(this)}
        handleOnChange={handleOnChange}
      />
    </div>
  );
};

export default VehicleRow;
