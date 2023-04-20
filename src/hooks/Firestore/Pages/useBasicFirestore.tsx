import { DocumentData, DocumentReference, setDoc } from "firebase/firestore";

const useBasicFirestore = (vehicleDoc: string, docRefToUpdate: DocumentReference<DocumentData>) => {
  const addRow = async (id: string, spz: string, repairDate: string, setIsClicked: (value: boolean) => void) => {
    await setDoc(docRefToUpdate, {
      vehicles: [],
      locomotives: {
        id: id,
        lSpz: spz,
        repairDate: repairDate,
        isVehicle: false,
        vehicleDoc: vehicleDoc,
      },
      line: [],
      contact: { carLeader: "", phone: "" },
      station: { from: "", to: "" },
    });
    setIsClicked(true);
  };

  return { addRow };
};

export default useBasicFirestore;
