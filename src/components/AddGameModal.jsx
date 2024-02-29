import React, { useState } from "react";
import { Modal, Typography, Button, TextField, Paper, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function AddGameModal({
  rowKey,
  isOpen,
  handleInsertButton,
  handleCloseModal,
}) {

  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const inputValue = event.target.value;
    // Check if the input is a valid number
    if (!isNaN(inputValue)) {
      setValue(inputValue);
    }
  };

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
                    id="Score" 
                    label="" 
                    value={value}
                    onChange={handleChange}
                    inputProps={{ inputMode: 'numeric' }} 
                  />
                </TableCell>
              </TableRow>
              {/* <TableRow key={2}>
                <TableCell>
                  Dominik
                </TableCell>
                <TableCell>
                  <TextField id="Score" label="" inputProps={{ inputMode: 'numeric' }} />
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>

      </DialogContent>
      <DialogActions>
        <Button color="error">Cancel</Button>
        <Button autoFocus>
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
}
