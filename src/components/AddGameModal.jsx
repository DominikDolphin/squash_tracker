import React, { useState } from "react";
import { Button, TextField, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function AddGameModal({
  isOpen,
  handleInsertButton,
  handleCloseModal,
  addGameToMatch
}) {

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);


  const handleChange = (event) => {
    const inputValue = event.target.value;
    const playerId = event.target.id;

    // Check if the input is a valid number and less than 1000
    if (!isNaN(inputValue) && inputValue < 1000) {
      if (playerId === 'player1Score') {
        setPlayer1Score(inputValue);
      } else if (playerId === 'player2Score') {
        setPlayer2Score(inputValue);
      }
    }
  };

  const handleInsert = () => {
    //{ id: sampleData.length + 1, winner: "Michael", winnerScore: 11, loserScore: 8 }
    // addGameToMatch({winner:})
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
                  Michael
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
                  Dominik
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
        <Button>
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
}
