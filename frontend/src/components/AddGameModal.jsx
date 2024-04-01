import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { addGame } from "../services/matchService";

export default function AddGameModal({
  isOpen,
  handleCloseModal,
  addGameToMatch,
  players,
  changeMatchPlayers,
  match,
}) {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [scoreIsATie, setScoreIsATie] = useState(true);
  const [requestError, setRequestError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  console.log(players);
  const resetValues = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setScoreIsATie(true);
  };

  const handleChange = (event) => {
    const inputValue = Number(event.target.value);
    const playerId = event.target.id;

    // Check if the input is a valid number and less than 1000
    if (!isNaN(inputValue) && inputValue < 1000) {
      if (playerId === "player1Score") {
        setPlayer1Score(() => {
          // Update state based on previous state
          const newPlayer1Score = inputValue;

          // Tie-checking logic
          if (newPlayer1Score === player2Score) {
            setScoreIsATie(true);
          } else {
            setScoreIsATie(false);
          }
          return newPlayer1Score;
        });
      } else if (playerId === "player2Score") {
        setPlayer2Score(() => {
          // Update state based on previous state
          const newPlayer2Score = inputValue;

          // Tie-checking logic
          if (player1Score === newPlayer2Score) {
            setScoreIsATie(true);
          } else {
            setScoreIsATie(false);
          }
          return newPlayer2Score;
        });
      }
    }
  };

  const handleInsert = async () => {
    try {
      setIsFetching(true);

      const insertNewGame = await addGame(
        match._id,
        player1Score,
        player2Score
      );

      if (!insertNewGame.status === 201) {
        setRequestError(true);
        setIsFetching(false);
        return;
      }

      setIsFetching(false);

      addGameToMatch({
        _id: insertNewGame.data._id,
        player1Score,
        player2Score,
      });

      resetValues();
      handleCloseModal();
    } catch (error) {
      setRequestError(true);
      setIsFetching(false);
      console.error("Error adding game:", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{"Insert Game"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description"></DialogContentText>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={"65%"}>Player</TableCell>
                <TableCell align="center">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={1}>
                <TableCell>{players[0].username}</TableCell>
                <TableCell>
                  <TextField
                    id="player1Score"
                    label=""
                    value={player1Score}
                    onChange={handleChange}
                    inputProps={{ inputMode: "numeric" }}
                    autoFocus
                  />
                </TableCell>
              </TableRow>
              <TableRow key={2}>
                <TableCell>{players[1].username}</TableCell>
                <TableCell>
                  <TextField
                    id="player2Score"
                    label=""
                    value={player2Score}
                    onChange={handleChange}
                    inputProps={{ inputMode: "numeric" }}
                    autoFocus
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <Typography color="error" hidden={!requestError} align="center">
        There was an error adding the game{" "}
      </Typography>

      <DialogActions>
        <Button color="error" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button onClick={handleInsert} disabled={scoreIsATie}>
          {/* If is fetching, making is a circularprogress */}
          {isFetching ? <CircularProgress size={24} /> : "Insert"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
