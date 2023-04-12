import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import database from "../shared/firebaseconfig";
import VehicleRow from "../components/ManageTrains/VehicleRow";
import { nanoid } from "nanoid";
import { useBasicFirestore } from "../hooks/Firestore";
import { TManageTrainDoc } from "../components/types";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button } from "../components/ui";

const collectionRows = collection(database, "ManageTrains");

const ManageTrains = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [docRow, setDocRow] = useState<TManageTrainDoc[]>([]);

  const id = nanoid();

  const currentDoc = doc(collectionRows);

  const { addRow } = useBasicFirestore(currentDoc.id, currentDoc);

  const getAllVehicles = docRow.map((veh) => {
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
      <div className="grid grid-cols-4 text-center font-bold border-b border-black w-full">
        <h3 className="col-span-2 border-r border-black">Vozy</h3>
        <h3 className="font-bold border-r border-black">Lokomotiva</h3>
        <h3 className="font-bold">Spoj</h3>
      </div>

      {docRow.map((document, index: number) => (
        <div key={document.id} className="flex w-full items-center">
          <VehicleRow rowIndex={index} document={document} getAllVehicles={getAllVehicles} />
          <div className="absolute right-8 p-1 hover:bg-secondary-yellow hover:rounded-full"  onClick={() => deleteRow(document.id)}>
            <DeleteOutlineIcon />
          </div>
        </div>
      ))}

      <Button text="+" onClick={handleAddRow} isRounded={true} />
    </div>
  );
};

export default ManageTrains;
