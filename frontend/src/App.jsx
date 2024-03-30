import { Container, Grid } from "@mui/material";
import MatchCard from "./components/MatchCard";
import {Login, Signup, Home, MyMatches} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyMatches />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Container>
      {/* <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <MatchCard />
            <MatchCard />
          </Grid>
        </Grid>
      </Container> */}
    </>
  );
}

export default App;
