import {
  Container,
  Grid,
} from "@mui/material";
import MatchCard from "./components/MatchCard";

function App() {

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <MatchCard />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
