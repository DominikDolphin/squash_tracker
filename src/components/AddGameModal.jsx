import React, { useState } from "react";
import { Modal, Typography, Button, TextField } from "@mui/material";

export default function AddGameModal({
  rowKey,
  isOpen,
  handleInsertButton,
  handleCloseModal,
}) {
  const [winner, setWinner] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");

  const handleWinnerChange = (value) => {
    setWinner(value);
  };

  const handleScore1Change = (event) => {
    setScore1(event.target.value);
  };

  const handleScore2Change = (event) => {
    setScore2(event.target.value);
  };

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
          width: 300,
        }}
      >
        <Typography id="delete-modal-title" variant="h6">
          Insert New Game
        </Typography>

        <div style={{ marginTop: 20 }}>
          <Typography variant="subtitle1">Winner:</Typography>
          <Button
            variant={winner === "Team1" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleWinnerChange("Team1")}
            style={{ marginRight: 10 }}
          >
            Team 1
          </Button>
          <Button
            variant={winner === "Team2" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleWinnerChange("Team2")}
          >
            Team 2
          </Button>
        </div>

        <div style={{ marginTop: 20, display: "flex" }}>
          <div style={{ marginRight: 0 }}>
            <Typography variant="subtitle1">Score:</Typography>
            <TextField
              label="Team 1 Score"
              variant="outlined"
              value={score1}
              onChange={handleScore1Change}
              type="number"
            />
          </div>
          <div>
            <Typography variant="subtitle1" style={{ color: "transparent" }}>
              Placeholder
            </Typography>
            <TextField
              label="Team 2 Score"
              variant="outlined"
              value={score2}
              onChange={handleScore2Change}
              type="number"
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
          <Button variant="contained" color="primary" onClick={handleInsertButton}>
            Insert
          </Button>
          <Button variant="contained" onClick={handleCloseModal}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
