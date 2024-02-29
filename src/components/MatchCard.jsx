import { Card, CardContent, CardHeader } from "@mui/material";
import MatchTable from "./MatchTable";
import { useState } from "react";
export default function MatchCard() {

  const [players, setPlayers] = useState([
    { id: 1, name: "Michael" },
    { id: 2, name: "Dominik" },
  ]);

  return (
    <Card>
      <CardHeader
        title="🏆 Winner - Michael 🏆"
        subheader="Best out of 3"
        style={{ paddingBottom: "0px", textAlign: "center" }}
      />
      <CardContent style={{ PaddingTop: "0px" }}>
        <MatchTable players={players}/>
      </CardContent>
    </Card>
  );
}
