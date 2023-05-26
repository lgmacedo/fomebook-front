import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

export default function HomePage() {
  const [user, setUser] = useContext(UserContext);

  const [followers, setFollowers] = useState([]);

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
      const promise = api.get("/followers", config);
      promise.then(followersSuccess);
    }
  }, []);

  function followersSuccess(res) {
    setFollowers(res.data);
  }

  return (
    <>
      <p>MEUS SEGUIDORES!</p>
      <FollowersContainer>
      {followers.map(f=>(
            <Follower>
                <img src={f.userPicture}/>
                <p>{f.name}</p>
                <p>{f.bio}</p>
            </Follower>
        ))}
      </FollowersContainer>
    </>
  );
}

const FollowersContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;

const Follower = styled.div`

`;
