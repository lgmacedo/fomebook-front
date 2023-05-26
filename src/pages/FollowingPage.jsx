import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

export default function HomePage() {
  const [user, setUser] = useContext(UserContext);

  const [following, setFollowing] = useState([]);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    if (userToken === null) {
      navigate("/");
    } else {
      setUser(JSON.parse(userToken));
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(userToken).token}`,
        },
      };
      const promise = api.get("/following", config);
      promise.then(followingSuccess);
    }
  }, []);

  function followingSuccess(res) {
    setFollowing(res.data);
  }

  return (
    <>
      <p>você segue::!</p>
      <FollowingContainer>
      {following.map(f=>(
            <Following>
                <img src={f.userPicture}/>
                <p>{f.name}</p>
                <p>{f.bio}</p>
            </Following>
        ))}
      </FollowingContainer>
    </>
  );
}

const FollowingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;

const Following = styled.div`

`;
