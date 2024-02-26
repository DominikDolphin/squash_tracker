import { Button, Card, CardContent, CardHeader } from "@mui/material";
import MatchTable from "./MatchTable";

export default function MatchCard() {
  return (
    <Card>
      <CardHeader
        title="Winner - Michael"
        subheader="Best out of 3"
        style={{ paddingBottom: "0px", textAlign: "center" }}
      />
      <CardContent style={{ PaddingTop: "0px" }}>
        <MatchTable />
        <Button variant="outlined" fullWidth style={{ marginTop: "5px" }}>
          Add Game
        </Button>
      </CardContent>
    </Card>
  );
}
