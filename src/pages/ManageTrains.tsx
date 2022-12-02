import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import database from "../shared/firebaseconfig";
import VehicleRow from "../components/ManageTrains/VehicleRow";
import { nanoid } from "nanoid";
import Button from "../components/ui/Button";

const ManageTrains = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [docRow, setDocRow] = useState<any>([]);
  const collectionRows = collection(database, "ManageTrains");
  const id = nanoid();

  const AddRow = async () => {
    await setDoc(doc(collectionRows), {
      vehicles: [],
      locomotives: { locomotiveID: id },
      line: [],
    });

    setIsClicked(true);
  };

  const DeleteRow = async (rowID: string) => {
    await deleteDoc(doc(database, "ManageTrains", rowID));
    console.log(rowID);
  };

  useEffect(() => {
    //onSnapshot instead of getDocs so that you also listen for updates to the data.
    const unsub = onSnapshot(
      collection(database, "ManageTrains"),
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
    <div className="flex flex-col justify-center items-center gap-8">
      <div className="grid grid-cols-4 text-center font-bold border-b border-black w-full">
        <h3 className="col-span-2 border-r border-black">Vozy</h3>
        <h3 className="font-bold border-r border-black">Lokomotiva</h3>
        <h3 className="font-bold">Spoj</h3>
      </div>

      {docRow.map((document: any) => (
        <div className="flex w-full items-center">
          <VehicleRow key={document.id} document={document} />
          <Button
            text="-"
            clasName="absolute right-8"
            onClick={() => DeleteRow(document.id)}
          />
        </div>
      ))}

      <Button text="+" onClick={AddRow} isRounded={true} />
    </div>
  );
};

export default ManageTrains;
