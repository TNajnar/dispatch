import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { ChangeEvent, EventHandler, useEffect, useState } from "react";
import Button from "../components/ui/Button";
import database from "../shared/firebaseconfig";
import TrainRail from "../components/ParkedVehicles/TrainRail";
import PopUpMenu from "../components/ui/PopUpMenu";
import { TParkedVehicleDoc } from "../components/types";

const collectionRows = collection(database, "ParkedVehicles");
const newDoc = doc(collectionRows);

const ParkedVagons = () => {
  const [openMenuName, setOpenMenuName] = useState<string>();
  const [docRow, setDocRow] = useState<TParkedVehicleDoc[]>([]);
  const [rowName, setRowName] = useState<string>("");

  const addRow = async () => {
    await setDoc(newDoc, {
      nameRail: rowName,
      vehicles: [],
    });
  };

  const handleOnChangeRow = (event: ChangeEvent<HTMLInputElement>) => {
    setRowName(event.target.value);
  };

  const handleSubmitRow = async (event: React.FormEvent<HTMLInputElement>) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    addRow();
    setRowName("");
    setOpenMenuName("");
  };

  const handleCloseMenuRow = () => {
    setRowName("");
    setOpenMenuName("");
  };

  const deleteRow = async (rowID: string) => {
    await deleteDoc(doc(database, "ParkedVehicles", rowID));
  };

  useEffect(() => {
    //onSnapshot instead of getDocs so that you also listen for updates to the data.
    const unsub = onSnapshot(
      collection(database, "ParkedVehicles"),
      (docSnapshot) => {
        const documents = docSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setDocRow(documents as TParkedVehicleDoc[]);
      }
    );
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="w-full text-h2 font-bold border-b border-black">Kolej</h2>

      {docRow.map((document, index: number) => (
        <div key={document.id} className="relative">
          <Button
            text="-"
            clasName="absolute -right-10 inset-y-1/2"
            onClick={() => deleteRow(document.id)}
          />
          <TrainRail rowIndex={index} document={document} />
        </div>
      ))}

      <Button
        clasName="self-center"
        text="+"
        onClick={() => setOpenMenuName(newDoc.id)}
        isRounded={true}
      />

      <PopUpMenu
        open={!!openMenuName}
        value={rowName}
        title="Název koleje"
        context="Zde napiš nápiš název koleje na které budou vozy"
        label="Název koleje"
        handleClose={handleCloseMenuRow}
        handleOnSubmit={() => handleSubmitRow(this!)}
        handleOnChange={handleOnChangeRow}
      />
    </div>
  );
};

export default ParkedVagons;
