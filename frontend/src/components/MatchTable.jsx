import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
} from "@mui/material";
import { useState } from "react";
import MatchTableGameRow from "./MatchTableGameRow";
import AddGameModal from "./AddGameModal";
import axios from "axios";

export default function MatchTable({players, match, changeMatchPlayers}) {

  const [isOpenAddGameModal, setIsOpenAddGameModal] = useState(false)
  const [gamesData, setGamesData] = useState(match.games);

  const updateTableOnDelete = (id) => {
    axios
      .delete(
        `http://localhost:3000/api/match/6605b93d9f98196eb21a9278/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            //   'Authorization': `Bearer ${cookies.token}`,
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDViYmE1N2M3OTk3ZmI3NTZkZjRiNSIsImlhdCI6MTcxMTY1MjM1NSwiZXhwIjoxNzExOTExNTU1fQ.DmX6CBBca`,
            "Content-Type": "application/json", // Adjust content type if needed
          },
        }
      ).then((response) => {
        // console.log(response.data)
        setGamesData(gamesData.filter((game) => game._id !== id));
      }).catch((error) => {
        console.log(error);
      });

  }

  const addGameToMatch = (data) => {
    setGamesData(prevGamesData => [...prevGamesData, data]);
  }

  const handleModalOpen = () => {
    setIsOpenAddGameModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenAddGameModal(false)
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Winner</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1">Score</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1">Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gamesData.map((game) => (
            <MatchTableGameRow
              key={game._id}
              rowData={{
                id: game._id,
                winner: game.player1Score > game.player2Score ? 'player 1' : 'player 2',
                winnerScore: game.player1Score > game.player2Score ? game.player1Score : game.player2Score,
                loserScore: game.player1Score < game.player2Score ? game.player1Score : game.player2Score
              }}
              updateTableOnDelete={() => updateTableOnDelete(game._id)}
            />
          ))}
        </TableBody>
      </Table>
      <Button
        variant="outlined"
        fullWidth
        style={{ marginTop: "5px" }}
        onClick={handleModalOpen}
      >
        Add Game
      </Button>

      <AddGameModal isOpen={isOpenAddGameModal} handleCloseModal={handleCloseModal} addGameToMatch={addGameToMatch} players={players} changeMatchPlayers={changeMatchPlayers} />
    </>
  );

}
