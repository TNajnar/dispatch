import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import database from "../shared/firebaseconfig";
import TrainRail from "../components/ParkedVehicles/TrainRail";
import PopUpMenu from "../components/ui/PopUpMenu";

const collectionRows = collection(database, "ParkedVehicles");

const ParkedVagons = () => {
  const [openMenuID, setOpenMenuID] = useState<string>();
  const [docRow, setDocRow] = useState<any>([]);
  const [rowName, setRowName] = useState<string>();

  const addRow = async () => {
    const newDoc = doc(collectionRows);
    await setDoc(newDoc, {
      nameRail: "",
      vehicles: [],
    });

    setOpenMenuID(newDoc.id);
  };

  const handleSubmit = (rowID: string, event: any) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    updateRowName(rowID);
    setRowName(undefined);
    setOpenMenuID(undefined);
  };

  const handleOnChange = (event: any) => {
    setRowName(event.target.value);
  };

  const updateRowName = async (row: string) => {
    const rowRef = doc(collectionRows, row);

    await updateDoc(rowRef, {
      nameRail: rowName,
    });
  };

  const deleteRow = async (rowID: string) => {
    await deleteDoc(doc(database, "ParkedVehicles", rowID));
  };

  const handleCloseMenu = () => {
    setOpenMenuID(undefined);
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
        setDocRow(documents);
      }
    );
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="w-full text-h2 font-bold border-b border-black">Kolej</h2>

      {docRow.map((document: any) => (
        <div key={document.id} className="relative">
          <Button
            text="-"
            clasName="absolute -right-10 inset-y-1/2"
            onClick={() => deleteRow(document.id)}
          />
          <TrainRail document={document} />
        </div>
      ))}

      <PopUpMenu
        open={!!openMenuID}
        value={rowName}
        title="Název koleje"
        context="Zde napiš nápiš název koleje na které budou vozy"
        label="Název linky"
        handleClose={handleCloseMenu}
        handleOnSubmit={() => handleSubmit(openMenuID!, this)}
        handleOnChange={handleOnChange}
      />

      <Button
        clasName="self-center"
        text="+"
        onClick={addRow}
        isRounded={true}
      />
    </div>
  );
};

export default ParkedVagons;
