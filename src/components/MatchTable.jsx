import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";
import { useState } from "react";
import MatchTableGameRow from "./MatchTableGameRow";

export default function MatchTable() {
  const [sampleData, setSampleData] = useState([
    { id: 1, winner: "Michael", winnerScore: 11, loserScore: 8 },
    { id: 2, winner: "Dominik", winnerScore: 11, loserScore: 7 },
    { id: 3, winner: "Michael", winnerScore: 14, loserScore: 12 },
  ]);

  const updateTableOnDelete = (id) =>{
    setSampleData(sampleData.filter((item) => item.id !== id));
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Winner</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1">Score</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1">Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.map((row) => (
            <MatchTableGameRow
              key={row.id}
              rowData={row}
              updateTableOnDelete={()=>updateTableOnDelete(row.id)}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}
