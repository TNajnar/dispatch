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

const ParkedVagons = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [docRow, setDocRow] = useState<any>([]);
  const [rowName, setRowName] = useState(String);

  const collectionRows = collection(database, "ParkedVehicles");

  const AddRow = async () => {
    await setDoc(doc(collectionRows), {
      nameRail: "",
      vehicles: [],
    });
    setOpenMenu(true);
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
    setOpenMenu(false);
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
    setOpenMenu(false);
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
        <div className="relative">
          <Button
            text="-"
            clasName="absolute -right-10 inset-y-1/2"
            onClick={() => DeleteRow(document.id)}
          />
          <TrainRail document={document} />
          <PopUpMenu
            open={openMenu}
            value={rowName}
            handleClose={handleCloseMenu}
            handleOnSubmit={() => handleSubmit(document.id, this)}
            handleOnChange={() => handleOnChange}
            // updateRowName={() => UpdateRowName(document.id)}
          />
        </div>
      ))}

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
