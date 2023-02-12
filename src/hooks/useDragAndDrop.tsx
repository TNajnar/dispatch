import { arrayRemove, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { TVehicleObject } from "../components/types";
import DropTransaction from "./Firestore/Transaction";
import database from "../shared/firebaseconfig";

const useDragAndDrop = (data: TVehicleObject[], collectionName: string) => {
  const [isDragging, setIsDragging] = useState(false);

  const collectionRows = collection(database, `${collectionName}`);

  const handleUpdateList = async (id: string, docID: string) => {
    let findDraggedCar = data.filter((car) => {
      if (car.id === id) {
        return car;
      }
    });

    let draggedCar = findDraggedCar[0];
    let draggedCarDoc = draggedCar.vehicleDoc;
    let updatedDoc: string;

    const { updateDropVehicle, updateDropLocomotive } = DropTransaction(
      draggedCar.id,
      draggedCar.spz,
      draggedCar.repairDate,
      draggedCar.isVehicle
    );

    if (draggedCar && draggedCar.vehicleDoc !== docID) {
      updatedDoc = draggedCar.vehicleDoc = docID;

      const docRefToUpdate = doc(collectionRows, docID);
      const docRefToRemove = doc(collectionRows, draggedCarDoc);

      if (draggedCar.isVehicle) {
        updateDropVehicle(draggedCar.class, docRefToUpdate, updatedDoc);

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
      } else {
        updateDropLocomotive(docRefToUpdate, updatedDoc);

        await updateDoc(docRefToRemove, {
          vehicles: arrayRemove({
            id: draggedCar.id,
            spz: draggedCar.spz,
            repairDate: draggedCar.repairDate,
            isVehicle: false,
            vehicleDoc: draggedCarDoc,
          }),
        });
      }
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
