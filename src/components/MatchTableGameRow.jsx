import { Typography, TableRow, TableCell } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";
import DeleteGameModal from "./DeleteGameModal";

export default function MatchTableGameRow({
  rowKey,
  rowData,
  handleDelete,
  openModal,
  handleConfirmDelete,
  handleCloseModal,
}) {
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
