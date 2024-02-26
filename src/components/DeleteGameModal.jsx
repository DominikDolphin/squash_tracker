import { Modal, Typography, Button } from "@mui/material";

export default function DeleteGameModal({
  rowKey,
  isOpen,
  handleConfirmDelete,
  handleCloseModal,
}) {
  return (
    <Modal
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
      open={isOpen}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: 10,
          width: 300
        }}
      >
        <Typography id="delete-modal-title" variant="h6">
          Confirm Deletion
        </Typography>
        <Typography id="delete-modal-description" variant="body1">
          Are you sure you want to delete this game?
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmDelete}
          >
            Yes
          </Button>
          <Button variant="contained" onClick={handleCloseModal}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
