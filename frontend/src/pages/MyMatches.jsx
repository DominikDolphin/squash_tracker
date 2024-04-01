import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button } from "@mui/material";
import axios from "axios";
import MatchCard from "../components/MatchCard";

const MyMatches = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      //   console.log(cookies.token)
      try {
        const getAllMatches = await axios.get(
          "http://localhost:3000/api/match",
          {},
          {
            withCredentials: true,
            headers: {
              //   'Authorization': `Bearer ${cookies.token}`,
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDViYmE1N2M3OTk3ZmI3NTZkZjRiNSIsImlhdCI6MTcxMTY1MjM1NSwiZXhwIjoxNzExOTExNTU1fQ.DmX6CBBca`,
              "Content-Type": "application/json", // Adjust content type if needed
            },
          }
        );
        // console.log(response.data)
        // const { status, user } = response.data;
        console.log(getAllMatches.data)
        setMatches(getAllMatches.data);
        // setUsername(user);
      } catch (err) {
        console.log(err);
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <>
      {/* For every match, create a MatchCard component */}

      {matches.map((match, index) => (
        <MatchCard key={index} match={match}/>
      ))}

    <footer style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#f0f0f0", padding: "10px", textAlign: "center", background: "rgba(240, 240, 240, 0.8)", backdropFilter: "blur(10px)"}}>
      <Button variant="contained" color="success">
        Create Match
      </Button>
    </footer>
    </>
  );
};

export default MyMatches;
