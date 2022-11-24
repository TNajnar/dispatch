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

const ManageTrains = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [docRow, setDocRow] = useState<any>([]);
  const collectionRows = collection(database, "ManageTrains");
  const id = nanoid();

  const f = docRow.map((item: any) => item.id);

  const AddRow = async () => {
    await setDoc(doc(collectionRows), {
      vehicles: [],
      locomotives: { locomotiveID: id },
      line: [],
    });

    setIsClicked(true);
  };

  const deleteRow = async (rowID: string) => {
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
          <div
            onClick={() => deleteRow(document.id)}
            className="w-14 h-14 flex items-center text-3xl justify-center"
          >
            -
          </div>
        </div>
      ))}

      <div className="flex gap-4">
        <div
          onClick={AddRow}
          className="w-14 h-14 flex items-center text-3xl justify-center border-4 border-black divide-x-4 rounded-full bg-[#fabb00]"
        >
          +
        </div>
      </div>
    </div>
  );
};

export default ManageTrains;
