import { Typography, TableRow, TableCell } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";
import DeleteGameModal from "./DeleteGameModal";
import { useState } from "react";
import { deleteGame } from "../services/matchService";
export default function MatchTableGameRow({
  rowKey,
  rowData,
  updateTableOnDelete,
  match
}) {

  const [openModal, setOpenModal] = useState(false);

  const handleDelete = (id) => {
    setOpenModal(true);
  };
  
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmDelete =  async() => {

    deleteGame(match._id, rowData.id)
    .then((success) => {
      if (success) {
        // console.log("Game deleted successfully");
        setOpenModal(false);
        updateTableOnDelete(rowData.id);
      } else {
        console.error("Failed to delete game");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
    
  };

  return (
    <>
      <TableRow key={rowKey}>
        <TableCell>
          <Typography variant="body1">{rowData.winner}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1">
            {`${rowData.winnerScore} - ${rowData.loserScore}`}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <div style={{ display: "flex", gap: 8 }}>
            <IconButton aria-label="edit" color="warning">
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => {
                handleDelete(rowKey);
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </div>
        </TableCell>
      </TableRow>

      <DeleteGameModal
        isOpen={openModal}
        handleConfirmDelete={() => handleConfirmDelete(rowKey)}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}
