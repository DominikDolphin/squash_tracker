import axios from "axios";

const environmentVariable = import.meta.env;
const API_URL =
  environmentVariable.VITE_REACT_APP_API_URL || "http://localhost:3000";

export const getUsernameFromId = async(id) => {
    const username = await axios.get(`http://localhost:3000/api/user/${id}`);
    if (!username.data.username) {
        throw new Error("Error getting username from id");
    }
    return username.data.username;
}
