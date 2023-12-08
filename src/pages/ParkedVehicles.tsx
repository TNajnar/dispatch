import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import database from "../shared/firebaseconfig";
import { TrainRail } from "../components/pages";
import { ThemeContext } from "../context/ThemeContext";
import { Button, PopUpMenu } from "../components/ui";
import { TParkedVehicleDoc } from "../components/types";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import clsx from "clsx";

const collectionRows = collection(database, "ParkedVehicles");
const newDoc = doc(collectionRows);

const ParkedVehicles = () => {
  const [openMenuName, setOpenMenuName] = useState<string>();
  const [docRow, setDocRow] = useState<TParkedVehicleDoc[]>([]);
  const [rowName, setRowName] = useState<string>("");

  const { isDarkMode } = useContext(ThemeContext);

  const darkMode = isDarkMode ? "border-primary-lightBlue" : "border-black";
  const darkHover = isDarkMode ? "hover:bg-primary-blue" : "hover:bg-secondary-yellow";

  // get all rows (docs) as two dimensional array
  const getAllCars = docRow.map((car) => {
    return car.vehicles;
  });

  const addRow = async () => {
    const newDoc = setDoc(doc(collectionRows), {
      nameRail: rowName,
      vehicles: [],
    });
    return newDoc;
  };

  const handleOnChangeRow = (event: ChangeEvent<HTMLInputElement>) => {
    setRowName(event.target.value);
  };

  const handleSubmitRow = async (event: FormEvent<HTMLInputElement>) => {
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
    const unsub = onSnapshot(collection(database, "ParkedVehicles"), (docSnapshot) => {
      const documents = docSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setDocRow(documents as TParkedVehicleDoc[]);
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className={clsx("w-full text-h2 font-bold border-b", darkMode)}>Kolej</h2>

      {docRow.map((document, index: number) => (
        <div key={document.id} className="relative">
          <div
            className={clsx("absolute -right-11 top-7 p-1 hover:rounded-full", darkHover)}
            onClick={() => deleteRow(document.id)}
          >
            <DeleteOutlineIcon />
          </div>
          <TrainRail document={document} getAllCars={getAllCars} rowIndex={index} />
        </div>
      ))}

      <Button clasName="self-center" text="+" onClick={() => setOpenMenuName(newDoc.id)} isRounded={true} />

      <PopUpMenu
        open={!!openMenuName}
        value={rowName}
        title="Název koleje"
        context="Zde napiš název koleje, na které budou vozy."
        label="Název koleje"
        handleClose={handleCloseMenuRow}
        handleOnSubmit={() => handleSubmitRow(this!)}
        handleOnChange={handleOnChangeRow}
      />
    </div>
  );
};

export default ParkedVehicles;
