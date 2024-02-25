import {
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import MatchTable from './components/MatchTable'

function App() {

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader
                title="Winner - Michael"
                subheader="Best out of 3"
                style={{ paddingBottom: "0px", textAlign: "center" }}
              />
              <CardContent style={{ PaddingTop: "0px" }}>
                <MatchTable />
                <Button
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: "5px" }}
                >
                  Add Game
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
