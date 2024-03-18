import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { Settings } from "@mui/icons-material";
import MatchTable from "./MatchTable";
import { useState } from "react";
import MatchSettingsModal from "./MatchSettingsModal";

export default function MatchCard() {

  const [players, setPlayers] = useState([
    { id: 1, name: "Michael" },
    { id: 2, name: "Dominik" },
  ]);

  const [matchSettingsModalOpen, setMatchSettingsModalOpen] = useState(true);

  const openSettingsModal = () => {
    console.log('Settings modal opened');
    setMatchSettingsModalOpen(true);
  }

  const closeSettingsModal = () => {
    setMatchSettingsModalOpen(false)
  }


  return (
    <>
      <Card>
        <CardHeader
          title="🏆 Winner - Michael 🏆"
          subheader="Best out of 3"
          style={{ paddingBottom: "0px", textAlign: "center" }}
          action={
            <IconButton aria-label="settings" onClick={openSettingsModal}>
              <Settings />
            </IconButton>
          }
        />
        <CardContent style={{ PaddingTop: "0px" }}>
          <MatchTable players={players} />
        </CardContent>
      </Card>

      <MatchSettingsModal isOpen={matchSettingsModalOpen} players={players} handleCloseModal={closeSettingsModal} />
    </>
  );
}
