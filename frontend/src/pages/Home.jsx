import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [username, setUsername] = useState("");
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }
      
    //   console.log(cookies.token)
      try {
        const response = await axios.get(
          "http://localhost:3000/api/match",
          {},
          {
            withCredentials: true,
            headers: {
            //   'Authorization': `Bearer ${cookies.token}`,
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDViYmE1N2M3OTk3ZmI3NTZkZjRiNSIsImlhdCI6MTcxMTY1MjM1NSwiZXhwIjoxNzExOTExNTU1fQ.DmX6CBBca`,
              'Content-Type': 'application/json' // Adjust content type if needed
            }
          }
        );
        // console.log(response.data)
        // const { status, user } = response.data;
        setMatches(response.data);
        // setUsername(user);
      } catch (err) {
        console.log(err)
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
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
    </>
  );
};

export default Home;