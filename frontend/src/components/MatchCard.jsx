import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { Settings } from "@mui/icons-material";
import MatchTable from "./MatchTable";
import { useEffect, useState } from "react";
import MatchSettingsModal from "./MatchSettingsModal";
import { checkWinner } from "../utils/matchUtils";
import { getUsernameFromId  } from '../services/userService'
export default function MatchCard({match}) {

  const [dataFetched, setDataFetched] = useState(false);

  const [players, setPlayers] = useState([
    { _id: match.players[0], username: '' },
    { _id: match.players[1], username: '' },
  ]);

  const [bestOf, setBestOf] = useState(match.bestOf);
  const [winnerTitle, setWinnerTitle] = useState('⏳ In Progress ⏳');
  const [gamesData, setGamesData] = useState(match.games);
  const [matchSettingsModalOpen, setMatchSettingsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {

        // Fetch usernames from user ids
        const usernames = await Promise.all(match.players.map(async (playerId) => {
          return await getUsernameFromId(playerId);
        }));

        setPlayers([
          { _id: match.players[0], username: usernames[0] },
          { _id: match.players[1], username: usernames[1] },
        ]);
        setDataFetched(true);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchUser();
  }, [match]);



  useEffect(() => {
    setWinnerTitle(checkWinner(gamesData, bestOf, players));
  }, [gamesData, bestOf, players, gamesData, match]);

  

  const changeMatchPlayers = (newPlayers) => {
    setPlayers(newPlayers);
  }

  const changeMatchBestOf = (newBestOf) => {
    setBestOf(newBestOf);
  }

  const openSettingsModal = () => {
    // console.log('Settings modal opened');
    setMatchSettingsModalOpen(true);
  }

  const closeSettingsModal = () => {
    setMatchSettingsModalOpen(false)
  }

  // Render only after data is fetched
  if (!dataFetched) {
    return null; // or a loading indicator
  }
  
  return (
    <>
      
      <Card>
        <CardHeader
          title={winnerTitle}
          subheader={`Best out of ${bestOf}`}
          style={{ paddingBottom: "0px", textAlign: "center" }}
          action={
            <IconButton aria-label="settings" onClick={openSettingsModal}>
              <Settings />
            </IconButton>
          }
        />
        <CardContent style={{ PaddingTop: "0px" }}>
          <MatchTable players={players} match={match} changeMatchPlayers={changeMatchPlayers} gamesData={gamesData} setGamesData={setGamesData}/>
        </CardContent>
      </Card>

      <MatchSettingsModal isOpen={matchSettingsModalOpen} players={players} handleCloseModal={closeSettingsModal} changeMatchBestOf={changeMatchBestOf} changeMatchPlayers={changeMatchPlayers} match={match}/>
    </>
  );
}
