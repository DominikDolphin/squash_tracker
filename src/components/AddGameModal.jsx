import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function AddGameModal({
  isOpen,
  handleCloseModal,
  addGameToMatch,
  players
}) {

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [scoreIsATie, setScoreIsATie] = useState(true);

  const resetValues = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setScoreIsATie(true);
  }

  const handleChange = (event) => {
    const inputValue = Number(event.target.value);
    const playerId = event.target.id;

    // Check if the input is a valid number and less than 1000
    if (!isNaN(inputValue) && inputValue < 1000) {
      if (playerId === 'player1Score') {
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
      } else if (playerId === 'player2Score') {
        
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

  const handleInsert = () => {
    let winner, winnerScore, loserScore, winnerPlayerID, loserPlayerID;

    if (player1Score > player2Score) {
      winner = players[0].name;
      winnerPlayerID = players[0].id;
      loserPlayerID = players[1].id;
      winnerScore = player1Score;
      loserScore = player2Score;
    } else if (player1Score < player2Score) {
      winner = players[1].name;
      winnerPlayerID = players[1].id;
      loserPlayerID = players[0].id;

      winnerScore = player2Score;
      loserScore = player1Score;
    }

    addGameToMatch({
      id: uuidv4(),
      winnerPlayerID: winnerPlayerID,
      loserPlayerID: loserPlayerID,
      winner: winner,
      winnerScore: winnerScore,
      loserScore: loserScore
    });

    resetValues();
    handleCloseModal();
  }


  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {"Insert Game"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">

        </DialogContentText>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={'65%'}>Player</TableCell>
                <TableCell align="center">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={1}>
                <TableCell>
                  {players[0].name}
                </TableCell>
                <TableCell>
                  <TextField
                    id="player1Score"
                    label=""
                    value={player1Score}
                    onChange={handleChange}
                    inputProps={{ inputMode: 'numeric' }}
                    autoFocus
                  />
                </TableCell>
              </TableRow>
              <TableRow key={2}>
                <TableCell>
                  {players[1].name}
                </TableCell>
                <TableCell>
                  <TextField
                    id="player2Score"
                    label=""
                    value={player2Score}
                    onChange={handleChange}
                    inputProps={{ inputMode: 'numeric' }}
                    autoFocus
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleCloseModal}>Cancel</Button>
        <Button onClick={handleInsert} disabled={scoreIsATie}>
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
}
