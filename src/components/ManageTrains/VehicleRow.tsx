import { ChangeEvent, EventHandler, useState } from "react";
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
import { TManageTrainDoc } from "../types";
import Line from "../Train/Line";

interface IVehicleRowProps {
  document: TManageTrainDoc;
  rowIndex: number;
}

const collectionRows = collection(database, "ManageTrains");

const VehicleRow = ({ document, rowIndex }: IVehicleRowProps) => {
  const [openMenuID, setOpenMenuID] = useState<string>("");
  const [nameLine, setNameLine] = useState<string>("");

  const collectionName = "ManageTrains";

  const id = nanoid();

  const vehicles = document.vehicles;
  const lines = document.line;
  const locomotive = document.locomotives;

  const linesLenght = Object.keys(lines).length;

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

  const addLine = async () => {
    const docRefToUpdate = doc(collectionRows, document.id);
    setOpenMenuID(document.id);
    await updateDoc(docRefToUpdate, {
      line: arrayUnion({ id: id, nameLine: nameLine }),
    });
  };

  const handleOnChangeLine: EventHandler<ChangeEvent<HTMLInputElement>> = (
    event
  ) => {
    setNameLine(event.target.value);
  };

  const handleSubmitLine = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    addLine();
    setNameLine("");
    setOpenMenuID("");
  };

  const handleCloseMenu = () => {
    setOpenMenuID("");
  };

  return (
    <div className="grid grid-cols-4 pt-4 place-items-center pb-4 w-full border-b border-primary-gray">
      <div className="flex col-span-2 items-center gap-4">
        <Button text="+" onClick={addVehicle} isRounded={true} />
        {vehicles.map((vehicle) => (
          <div
            key={`${vehicle.id}_${vehicle.spz}`}
            className="flex flex-col items-center gap-6"
          >
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
      </div>
      <div>
        <Locomotive
          id={locomotive.id}
          locomotiveSpz={locomotive.lSpz}
          locomotiveRepairDate={locomotive.repairDate}
          documentID={document.id}
          rowIndex={rowIndex}
        />
      </div>
      <div className="flex gap-4">
        {/* {linesLenght < 4 && <Button text="+" onClick={addLine} />} */}
        <Button text="+" onClick={() => setOpenMenuID(document.id)} />
        {lines.map(
          (line) =>
            !!line.nameLine && (
              <div key={line.id}>
                <Line
                  id={line.id}
                  nameLine={line.nameLine}
                  documentID={document.id}
                  rowIndex={rowIndex}
                />
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
        handleOnSubmit={() => handleSubmitLine(this!)}
        handleOnChange={handleOnChangeLine}
      />
    </div>
  );
};

export default VehicleRow;
