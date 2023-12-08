import { arrayUnion, DocumentData, DocumentReference, runTransaction, updateDoc } from "firebase/firestore";
import { useState } from "react";
import database from "../../../../shared/firebaseconfig";

type TReturn = {
  addLineHandler: (id: string, nameLine: string) => Promise<void>;
  addVehicleHandler: (id: string,
    vehicleDoc: string,
    classColor?: string,
    repairDate?: string,
    spz?: string
  ) => Promise<void>;
  handleCloseMenu: () => void;
  isMenuOpen?: string;
  nameLine?: string;
  openPopMenuID?: string;
  setIsMenuOpen: (value?: string) => void;
  setNameLine: (value: string) => void;
  setOpenPopMenuID: (value?: string) => void;
}

const useVehicleRowData = (docRefToUpdate: DocumentReference<DocumentData>): TReturn => {
  const [openPopMenuID, setOpenPopMenuID] = useState<string | undefined>(undefined);
  const [nameLine, setNameLine] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<string | undefined>(undefined);

  const addVehicleHandler = async (
    id: string,
    vehicleDoc: string,
    classColor?: string,
    repairDate?: string,
    spz?: string,
  ): Promise<void> => {
    await runTransaction(database, async (transaction) => {
      const sfDoc = await transaction.get(docRefToUpdate);

      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }

      const newCar = (sfDoc.data().vehicles = arrayUnion({
        id: id,
        spz: spz,
        class: classColor,
        repairDate: repairDate,
        isVehicle: true,
        vehicleDoc: vehicleDoc,
      }));

      transaction.update(docRefToUpdate, { vehicles: newCar });
    });
  };

  const addLineHandler = async (id: string, nameLine: string): Promise<void> => {
    await updateDoc(docRefToUpdate, {
      line: arrayUnion({ id, nameLine }),
    });
    setOpenPopMenuID(undefined);
  };

  const handleCloseMenu = (): void => {
    setNameLine('');
    setOpenPopMenuID(undefined);
  };


  return {
    addLineHandler, addVehicleHandler, handleCloseMenu, isMenuOpen, nameLine, openPopMenuID,
    setIsMenuOpen, setNameLine, setOpenPopMenuID
  }
}

export default useVehicleRowData
