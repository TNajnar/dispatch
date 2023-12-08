import { useContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import database from "../shared/firebaseconfig";
import { VehicleRow } from "../components/pages";
import { nanoid } from "nanoid";
import { useBasicFirestore } from "../hooks/Firestore";
import { TManageTrainDoc } from "../components/types";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ThemeContext } from "../context/ThemeContext";
import { Button } from "../components/ui";
import clsx from "clsx";

const collectionRows = collection(database, "ManageTrains");

const ManageTrains = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [docRow, setDocRow] = useState<TManageTrainDoc[]>([]);
  const id = nanoid();

  const { isDarkMode } = useContext(ThemeContext);

  const darkMode = isDarkMode ? "border-primary-lightBlue" : "border-black";
  const darkHover = isDarkMode ? "hover:bg-primary-blue" : "hover:bg-secondary-yellow";

  const currentDoc = doc(collectionRows);

  const { addRow } = useBasicFirestore(currentDoc.id, currentDoc);

  // get all rows (docs) as two dimensional array. Datas for dragNdrop
  const allVehicles = docRow.map((veh) => {
    return veh.vehicles;
  });

  const handleAddRow = () => {
    addRow(id, "", "", setIsClicked);
  };

  const deleteRow = async (rowID: string) => {
    await deleteDoc(doc(database, "ManageTrains", rowID));
  };

  useEffect(() => {
    //onSnapshot instead of getDocs so that you also listen for updates to the data.
    const unsub = onSnapshot(collection(database, "ManageTrains"), (docSnapshot) => {
      const documents = docSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setDocRow(documents as TManageTrainDoc[]);
    });

    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <div className={clsx("grid grid-cols-4 w-full text-center font-bold border-b", darkMode)}>
        <h3 className={clsx("col-span-2 border-r", darkMode)}>Vozy</h3>
        <h3 className={clsx("font-bold border-r", darkMode)}>Lokomotiva</h3>
        <h3 className="font-bold">Spoj</h3>
      </div>

      {docRow.map((vehicleRow, index: number) => (
        <div key={vehicleRow.id} className="flex w-full items-center">
          <VehicleRow rowIndex={index} vehicleRow={vehicleRow} allVehicles={allVehicles} />
          <div
            className={clsx("absolute right-8 p-1 hover:rounded-full", darkHover)}
            onClick={() => deleteRow(vehicleRow.id)}
          >
            <DeleteOutlineIcon />
          </div>
        </div>
      ))}

      <Button text="+" onClick={handleAddRow} isRounded={true} />
    </div>
  );
};

export default ManageTrains;
