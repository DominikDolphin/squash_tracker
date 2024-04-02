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
export default function MatchTable({players, match, changeMatchPlayers, gamesData, setGamesData}) {

  const [isOpenAddGameModal, setIsOpenAddGameModal] = useState(false)
  const updateTableOnDelete =  async (id) => {
    setGamesData(gamesData.filter((game) => game._id !== id));
  }

  const addGameToMatch = (data) => {
    console.log("data is ", data)
    setGamesData(prevGamesData => [...prevGamesData, data]);
    console.log("added games to match", gamesData);
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
              match={match}
              key={game._id}
              rowData={{
                id: game._id,
                winner: game.player1Score > game.player2Score ? players[0].username : players[1].username,
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

      <AddGameModal isOpen={isOpenAddGameModal} handleCloseModal={handleCloseModal} addGameToMatch={addGameToMatch} players={players} match={match} changeMatchPlayers={changeMatchPlayers} />
    </>
  );

}
