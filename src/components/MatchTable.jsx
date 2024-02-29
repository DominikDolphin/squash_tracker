import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
} from "@mui/material";
import { useState } from "react";
import MatchTableGameRow from "./MatchTableGameRow";
import AddGameModal from "./AddGameModal";

export default function MatchTable() {
  const [sampleData, setSampleData] = useState([
    { id: 1, winner: "Michael", winnerScore: 11, loserScore: 8 },
    { id: 2, winner: "Dominik", winnerScore: 11, loserScore: 7 },
    { id: 3, winner: "Michael", winnerScore: 14, loserScore: 12 },
  ]);

  const [isOpenAddGameModal, setIsOpenAddGameModal] = useState(false)

  const updateTableOnDelete = (id) => {
    setSampleData(sampleData.filter((item) => item.id !== id));
  }

  const addGameToMatch = (data) => {
    // console.log("Adding to game");
    setSampleData([...sampleData, data])
  }

  const handleModalOpen = () => {
    // console.log("Adding to game");
    setIsOpenAddGameModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenAddGameModal(false)
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
              updateTableOnDelete={() => updateTableOnDelete(row.id)}
            />
          ))}
        </TableBody>
      </Table>
      <Button
        variant="outlined"
        fullWidth
        style={{ marginTop: "5px" }}
        onClick={() => handleModalOpen()}
      >
        Add Game
      </Button>

      <AddGameModal isOpen={isOpenAddGameModal} handleCloseModal={handleCloseModal} handleInsertGame={addGameToMatch} />
    </>
  );
}
