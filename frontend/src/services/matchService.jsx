import axios from "axios";

const environmentVariable = import.meta.env;
const API_URL =
  environmentVariable.VITE_REACT_APP_API_URL || "http://localhost:3000";

export const addGame = async (matchid, player1Score, player2Score) => {
  try {
     return axios.post(
      `${API_URL}/api/match/${matchid}/addGame`,
      {
        player1Score: player1Score,
        player2Score: player2Score,
      },
      {
        withCredentials: true,
        headers: {
          //   'Authorization': `Bearer ${cookies.token}`,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDViYmE1N2M3OTk3ZmI3NTZkZjRiNSIsImlhdCI6MTcxMTY1MjM1NSwiZXhwIjoxNzExOTExNTU1fQ.DmX6CBBca`,
          "Content-Type": "application/json", // Adjust content type if needed
        },
      }
    )
  } catch (error) {
    throw new Error("Error adding game to match");
  }
};

export const deleteGame = (matchid, gameid) => {
  return axios.delete(`${API_URL}/api/match/${matchid}/${gameid}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDViYmE1N2M3OTk3ZmI3NTZkZjRiNSIsImlhdCI6MTcxMTY1MjM1NSwiZXhwIjoxNzExOTExNTU1fQ.DmX6CBBca`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return true; // Resolve with true if successful
  }).catch((error) => {
    return false; // Reject with false if there's an error
  });
};

