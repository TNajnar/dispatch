import { useEffect } from "react";

const useDropArea = (isDragging: boolean) => {
  useEffect(() => {
    const dropAreas = window.document.querySelectorAll(".dropArea");
    dropAreas.forEach((dropArea) => {
      const divElement = dropArea as HTMLDivElement;
      if (isDragging) {
        divElement.style.border = "1.5px dashed gray";
      } else {
        divElement.style.border = "";
      }
    });
  }, [isDragging]);
};

export default useDropArea;
