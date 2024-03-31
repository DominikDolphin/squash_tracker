import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Divider,
} from "@mui/material";
import axios from "axios";

export default function MatchSettingsModal({
  isOpen,
  handleCloseModal,
  addGameToMatch,
  players,
  changeMatchPlayers,
  match,
}) {
  const [player1, setPlayer1] = useState(players[0]);
  const [player2, setPlayer2] = useState(players[1]);
  const [allAvailablePlayers, setAllAvailablePlayers] = useState([]);

  const handleAutocompleteChange = (value, player) => {
    player === "player1" ? setPlayer1(value) : setPlayer2(value);
  };

  useEffect(() => {
    const fetchAllAvailablePlayers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user?fields=username,_id"
        );
        setAllAvailablePlayers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAvailablePlayers();
  }, []);

  const defaultProps = {
    options: allAvailablePlayers,
    getOptionLabel: (option) => option.username,
  };

  const handleUpdateButton = () => {
    const newPlayers = [
      { id: player1._id, username: player1.username },
      { id: player2._id, username: player2.username },
    ];

    axios
      .put(
        `http://localhost:3000/api/match/${match._id}/updatePlayers`,
        {
          players: [player1._id, player2._id],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    changeMatchPlayers(newPlayers);
  };

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      PaperProps={{ style: { overflow: "hidden" } }}
    >
      <DialogTitle id="alert-dialog-title" align="center">
        {"Match Settings"}
      </DialogTitle>
      <DialogContent>
        <Divider style={{ marginTop: 0, marginBottom: 20 }} />

        <Typography id="delete-modal-title" variant="h6" paddingBottom={"15px"}>
          Players in Match
        </Typography>

        <Autocomplete
          disablePortal
          {...defaultProps}
          value={player1}
          id="player1"
          renderInput={(params) => <TextField {...params} label="Player 1" />}
          fullWidth
          onChange={(event, value) =>
            handleAutocompleteChange(value, "player1")
          }
          isOptionEqualToValue={(option, value) => option._id === value._id}
          style={{ marginBottom: 15 }}
        />
        <Autocomplete
          disablePortal
          {...defaultProps}
          value={player2}
          id="player2"
          renderInput={(params) => <TextField {...params} label="Player 2" />}
          fullWidth
          onChange={(event, value) =>
            handleAutocompleteChange(value, "player2")
          }
          isOptionEqualToValue={(option, value) => option._id === value._id}
        />

        <Divider style={{ marginTop: 20, marginBottom: 20 }} />

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{ width: "60%" }}>
                  <Typography id="delete-modal-title" variant="h6">
                    Wins Needed
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    id="winsNeeded"
                    label=""
                    value={5}
                    inputProps={{ inputMode: "numeric" }}
                    autoFocus
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button onClick={handleUpdateButton}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
