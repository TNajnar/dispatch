import { Button } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import TableRow from "../components/ExportData/TableRow";
import { TManageTrainDoc } from "../components/types";
import database from "../shared/firebaseconfig";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { CSVLink } from "react-csv";

const Export = () => {
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

  const headers = [
    { label: "Vozidla", key: "vehicles" },
    { label: "Lokomotiva", key: "locomotives" },
    { label: "Linka", key: "line" },
    { label: "Strojvedoucí", key: "carLeader" },
    { label: "Telefonní číslo", key: "phone" },
  ];

  // Define the data to be exported
  const data = docRow.map((doc) => {
    return {
      vehicles: doc.vehicles.map((vehicle) => vehicle.spz).join(", "),
      locomotives: doc.locomotives.lSpz,
      line: doc.line.map((line) => line.nameLine).join(", "),
      carLeader: doc.contact.carLeader,
      phone: doc.contact.phone,
    };
  });

  return (
    <div className="flex flex-col gap-10">
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-1/2">Vozy</th>
            <th className="w-[10%]">Lokomotiva</th>
            <th className="w-[15%]">Linky</th>
            <th className="w-[13%]">Strojvedoucí</th>
            <th className="w-[12%]">Tel. číslo</th>
          </tr>
        </thead>
        {docRow.map((document) => (
          <TableRow key={document.id} document={document} />
        ))}
      </table>

      <Button variant="contained" className="exportButton" endIcon={<ExitToAppIcon />}>
        <CSVLink headers={headers} data={data}>
          Exportovat
        </CSVLink>
      </Button>
    </div>
  );
};

export default Export;
