import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import database from "../shared/firebaseconfig";
import { TableRow } from "../components/pages";
import { ThemeContext } from "../context/ThemeContext";
import { TManageTrainDoc } from "../components/types";
import { CSVLink } from "react-csv";
import ReactXlsxExport from "react-xlsx-export";
import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import clsx from "clsx";
import data from "../data.json";

const Export = () => {
  const [docRow, setDocRow] = useState<TManageTrainDoc[]>([]);

  const { isDarkMode } = useContext(ThemeContext);

  const headers = data.headers;
  const tableHeader = data.tableHeader;
  const columnWidths = data.columnWidths;

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

  // Define the data to be exported for xlsx format
  const dataXlsx = docRow.map((doc) => {
    return {
      Vozidla: doc.vehicles
        .map((vehicle) => vehicle.spz)
        .filter((spz) => spz !== "")
        .join(", "),
      Lokomotiva: doc.locomotives.lSpz,
      Linky: doc.line.map((line) => line.nameLine).join(", "),
      Strojvedoucí: doc.contact.carLeader,
      "Tel. číslo": doc.contact.phone,
      "Z žst.": doc.station.from,
      "Do žst.": doc.station.to,
    };
  });

  // Define the data to be exported for xlsx format
  const dataCsv = docRow.map((doc) => {
    return {
      vehicles: doc.vehicles
        .map((vehicle) => vehicle.spz)
        .filter((spz) => spz !== "")
        .join(", "),
      locomotives: doc.locomotives.lSpz,
      line: doc.line.map((line) => line.nameLine).join(", "),
      carLeader: doc.contact.carLeader,
      phone: doc.contact.phone,
      from: doc.station.from,
      to: doc.station.to,
    };
  });

  return (
    <div className="flex flex-col gap-10">
      <table className="w-full">
        <thead className="text-center">
          <tr>
            {tableHeader.map((item, index) => (
              <th
                key={`${index}_${item}`}
                className={clsx(
                  "border",
                  columnWidths[index],
                  isDarkMode ? "border-primary-lightBlue" : "border-black"
                )}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        {docRow.map((document) => (
          <TableRow key={document.id} document={document} isDarkMode={isDarkMode} />
        ))}
      </table>

      <div className="flex justify-center gap-4">
        <ReactXlsxExport
          data={dataXlsx}
          filename="TrainManagement"
          className="border-none"
          children={
            <Button variant="contained" endIcon={<ExitToAppIcon />}>
              Exportovat do Excelu
            </Button>
          }
        />

        <Button variant="contained" className="w-60" endIcon={<ExitToAppIcon />}>
          <CSVLink headers={headers} data={dataCsv} filename="TrainManagement">
            Exportovat CSV
          </CSVLink>
        </Button>
      </div>
    </div>
  );
};

export default Export;
