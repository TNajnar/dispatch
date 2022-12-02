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
  const [openMenuId, setOpenMenuId] = useState<string>();
  const [docRow, setDocRow] = useState<any>([]);
  const [rowName, setRowName] = useState(String);

  const AddRow = async () => {
    const newDoc = doc(collectionRows);
    await setDoc(newDoc, {
      nameRail: "",
      vehicles: [],
    });

    setOpenMenuId(newDoc.id);
  };

  const DeleteRow = async (rowID: string) => {
    await deleteDoc(doc(database, "ParkedVehicles", rowID));
    // console.log(rowID);
  };

  const handleSubmit = (rowID: string, event: any) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    UpdateRowName(rowID);
    setOpenMenuId(undefined);
    console.log(rowName);
  };

  const handleOnChange = (event: any) => {
    setRowName(event.target.value);
    console.log(rowName);
  };

  const UpdateRowName = async (row: string) => {
    const rowRef = doc(collectionRows, row);

    await updateDoc(rowRef, {
      nameRail: rowName,
    })
      .then(() => alert("Added successfully "))
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const handleCloseMenu = () => {
    setOpenMenuId(undefined);
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
        <div className="relative" key={document.id}>
          <Button
            text="-"
            clasName="absolute -right-10 inset-y-1/2"
            onClick={() => DeleteRow(document.id)}
          />
          <TrainRail document={document} />
        </div>
      ))}
      <PopUpMenu
        open={!!openMenuId}
        value={rowName}
        handleClose={handleCloseMenu}
        handleOnSubmit={() => handleSubmit(openMenuId!, this)}
        handleOnChange={handleOnChange}
        // updateRowName={() => UpdateRowName(document.id)}
      />

      <Button
        clasName="self-center"
        text="+"
        onClick={AddRow}
        isRounded={true}
      />
    </div>
  );
};

export default ParkedVagons;
