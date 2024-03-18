import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField, Typography, Autocomplete, ListItem, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider } from "@mui/material";
// import ListboxProps from '@mui/material/Autocomplete/Listbox';
export default function MatchSettingsModal({
    isOpen,
    handleCloseModal,
    addGameToMatch,
    players,
}) {

    // This should be a fetch from the DB. This is just a placeholder.
    const [allAvailablePlayers, setAllAvailablePlayers] = useState([
        { id: 1, name: "Michael" },
        { id: 2, name: "Dominik" },
        { id: 3, name: "Nelson" },
        { id: 4, name: "Tom" },
        { id: 5, name: "John" },
        { id: 6, name: "Jane" },
        { id: 7, name: "Bob" },
        { id: 8, name: "Krystal" },
    ]);

    // const [winsNeeded, setWinsNeeded] = useState(5);

    // handleWinsChange = (event) =>{
    //     console.log('Wins changed');
    // }


    return (
        <Dialog
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            PaperProps={{ style: { overflow: 'hidden' } }}
        >
            <DialogTitle id="alert-dialog-title" align='center'>
                {"Match Settings"}
            </DialogTitle>
            <DialogContent>
                <Divider style={{ marginTop: 0, marginBottom: 20 }} />

                <Typography id="delete-modal-title" variant="h6" paddingBottom={'15px'}>
                    Players in Match
                </Typography>

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={allAvailablePlayers}
                    fullWidth
                    getOptionLabel={(option) => option.name} // Use 'name' as the label
                    renderInput={(params) => <TextField {...params} label="Player 1" />} // Set label to "Name"
                    style={{ marginBottom: 15 }}
                    ListboxProps={{ style: { maxHeight: 150 } }}
                />

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={allAvailablePlayers}
                    fullWidth
                    getOptionLabel={(option) => option.name} // Use 'name' as the label
                    renderInput={(params) => <TextField {...params} label="Player 2" />} // Set label to "Name"
                    style={{ marginBottom: 15 }}
                    ListboxProps={{ style: { maxHeight: 150 } }}
                />

                <Divider style={{ marginTop: 20, marginBottom: 20 }} />

                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ width: '60%' }}>

                                    <Typography id="delete-modal-title" variant="h6">
                                        Wins Needed
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id="winsNeeded"
                                        label=""
                                        value={5}
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
                <Button color="error" onClick={handleCloseModal} >Cancel</Button>
                <Button  >
                    Insert
                </Button>
            </DialogActions>
        </Dialog>
    );
}
