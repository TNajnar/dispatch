import { useState } from "react";
import { collection, doc } from "firebase/firestore";
import database from "../shared/firebaseconfig";
import { useLocoTransaction as locomotiveTransaction, useVehicleTransaction as vehicleTransaction, useDropTransaction as dropTransaction } from './Firestore'
import { TVehicleObject } from "../components/types";

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

    const docRefToUpdate = doc(collectionRows, docID);
    const docRefToRemove = doc(collectionRows, draggedCarDoc);

    const { updateDropVehicle, updateDropLocomotive } = dropTransaction(
      draggedCar.id,
      draggedCar.spz,
      draggedCar.repairDate,
      draggedCar.isVehicle
    );

    const { deleteVehicle } = vehicleTransaction(draggedCarDoc, docRefToRemove)
    const { deleteLoc } = locomotiveTransaction(draggedCarDoc, docRefToRemove)

    if (draggedCar && draggedCar.vehicleDoc !== docID) {
      updatedDoc = draggedCar.vehicleDoc = docID;

      if (draggedCar.isVehicle) {
        updateDropVehicle(draggedCar.class, docRefToUpdate, updatedDoc);

        deleteVehicle(         
          draggedCar.id,
          draggedCar.spz,
          draggedCar.class,
          draggedCar.repairDate,
        )

      } else {
        updateDropLocomotive(docRefToUpdate, updatedDoc);

        deleteLoc(draggedCar.id, draggedCar.spz, draggedCar.repairDate)
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
