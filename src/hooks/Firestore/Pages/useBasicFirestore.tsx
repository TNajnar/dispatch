import {
    DocumentData,
    DocumentReference,
    setDoc,
  } from "firebase/firestore";

  
  const useBasicFirestore = (
    vehicleDoc: string,
    docRefToUpdate: DocumentReference<DocumentData>,
  ) => {
    const addRow = async (
      id: string,
      spz: string,
      repairDate: string,
      setIsClicked: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
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
      });
      setIsClicked(true);
    };
  
    return { addRow };
  };
  
  export default useBasicFirestore;
  