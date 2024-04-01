import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { Settings } from "@mui/icons-material";
import MatchTable from "./MatchTable";
import { useEffect, useRef, useState } from "react";
import MatchSettingsModal from "./MatchSettingsModal";
import axios from "axios";


export default function MatchCard({match}) {

  const [dataFetched, setDataFetched] = useState(false);
  
  const [players, setPlayers] = useState([
    { _id: match.players[0], username: '' }, // Initialize with an empty name
    { _id: match.players[1], username: '' }, // Initialize with an empty name
  ]);

  const [bestOf, setBestOf] = useState(match.bestOf);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch player names from the API
        // const user1NameResponse = await axios.get(`http://localhost:3000/api/user/66057249b4ca36c750b6b2bd`);
        const user1NameResponse = await axios.get(`http://localhost:3000/api/user/${match.players[0]}`);
        const user2NameResponse = await axios.get(`http://localhost:3000/api/user/${match.players[1]}`);

        // Check if the response data is not null
        const name1 = user1NameResponse.data && user1NameResponse.data.username ? user1NameResponse.data.username : "Player 1";
        const name2 = user2NameResponse.data && user2NameResponse.data.username ? user2NameResponse.data.username : "Player 2";
        
        // Update players' names in the state
        setPlayers([
          { _id: match.players[0], username: name1 },
          { _id: match.players[1], username: name2 },
        ]);
        setDataFetched(true);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchUser();
  }, [match]);

  const [matchSettingsModalOpen, setMatchSettingsModalOpen] = useState(false);

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
          title="🏆 Winner - Michael 🏆"
          subheader={`Best out of ${bestOf}`}
          style={{ paddingBottom: "0px", textAlign: "center" }}
          action={
            <IconButton aria-label="settings" onClick={openSettingsModal}>
              <Settings />
            </IconButton>
          }
        />
        <CardContent style={{ PaddingTop: "0px" }}>
          <MatchTable players={players} match={match} changeMatchPlayers={changeMatchPlayers}/>
        </CardContent>
      </Card>

      <MatchSettingsModal isOpen={matchSettingsModalOpen} players={players} handleCloseModal={closeSettingsModal} changeMatchBestOf={changeMatchBestOf} changeMatchPlayers={changeMatchPlayers} match={match}/>
    </>
  );
}
