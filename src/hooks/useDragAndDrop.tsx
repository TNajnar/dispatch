import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { TVehicleObject } from "../components/types";
import database from "../shared/firebaseconfig";

const collectionRows = collection(database, `ManageTrains`);

const useDragAndDrop = (data: TVehicleObject[][]) => {
  const [isDragging, setIsDragging] = useState(false);
  const flatCars = data.flat();

  const handleUpdateList = async (id: string, docID: string) => {
    let findDraggedCar = flatCars.filter((car) => {
      if (car.id === id) {
        return car;
      }
    });

    let draggedCar = findDraggedCar[0];
    let draggedCarDoc = draggedCar.vehicleDoc;

    if (draggedCar && draggedCar.vehicleDoc !== docID) {
      let updatedDoc = (draggedCar.vehicleDoc = docID);

      const docRefToUpdate = doc(collectionRows, docID);
      const docRefToRemove = doc(collectionRows, draggedCarDoc);

      await runTransaction(database, async (transaction) => {
        const sfDoc = await transaction.get(docRefToUpdate);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }
        const newCar = (sfDoc.data().vehicles = arrayUnion({
          id: id,
          spz: draggedCar.spz,
          class: draggedCar.class,
          repairDate: draggedCar.repairDate,
          isVehicle: true,
          vehicleDoc: updatedDoc,
        }));
        transaction.update(docRefToUpdate, { vehicles: newCar });
      });

      await updateDoc(docRefToRemove, {
        vehicles: arrayRemove({
          id: draggedCar.id,
          spz: draggedCar.spz,
          class: draggedCar.class,
          repairDate: draggedCar.repairDate,
          isVehicle: true,
          vehicleDoc: draggedCarDoc,
        }),
      });
    }
  };

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  return {
    isDragging,
    handleUpdateList,
    handleDragging,
  };
};

export default useDragAndDrop;
