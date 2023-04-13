import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import database from "../shared/firebaseconfig";
import TableRow from "../components/ExportData/TableRow";
import { TManageTrainDoc } from "../components/types";
import { CSVLink } from "react-csv";
import ReactXlsxExport from "react-xlsx-export";
import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import clsx from "clsx";

const headers = [
  { label: "Vozidla", key: "vehicles" },
  { label: "Lokomotiva", key: "locomotives" },
  { label: "Linka", key: "line" },
  { label: "Strojvedoucí", key: "carLeader" },
  { label: "Telefonní číslo", key: "phone" },
  { label: "Z žst.", key: "from" },
  { label: "Do žst.", key: "to" },
];

const tableHeader = [
  "Vozy",
  "Lokomotiva",
  "Linky",
  "Strojvedoucí",
  "Tel. číslo",
  "Z žst.",
  "Do žst.",
];

interface IExportProps {
  isDarkMode: boolean;
}

const Export = ({ isDarkMode }: IExportProps) => {
  const [docRow, setDocRow] = useState<TManageTrainDoc[]>([]);

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

  // Define the data to be exported
  const data = docRow.map((doc) => {
    return {
      Vozidla: doc.vehicles.map((vehicle) => vehicle.spz).join(", "),
      Lokomotiva: doc.locomotives.lSpz,
      Linky: doc.line.map((line) => line.nameLine).join(", "),
      Strojvedoucí: doc.contact.carLeader,
      "Tel. číslo": doc.contact.phone,
      "Z žst.": doc.station.from,
      "Do žst.": doc.station.to,
    };
  });

  const dataCsv = docRow.map((doc) => {
    return {
      vehicles: doc.vehicles.map((vehicle) => vehicle.spz).join(", "),
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
        <thead>
          <tr>
            {tableHeader.map((item, index) => (
              <th
                key={`${index}_${item}`}
                className={clsx(
                  "border",
                  index === 0 && "w-[30%]",
                  index === 1 && "w-[10%]",
                  index === 2 && "w-[15%]",
                  index === 3 && "w-[13%]",
                  index === 4 && "w-[12%]",
                  index === 5 && "w-[10%]",
                  index === 6 && "w-[10%]",
                  isDarkMode ? "border-[#BBE1FA]" : "border-black"
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
          data={data}
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
