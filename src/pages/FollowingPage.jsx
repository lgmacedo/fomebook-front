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
    <FollowingContainer>
      <h1>Seguindo</h1>
      {following.map((f) => (
        <Following onClick={()=>navigate(`/perfil/${f.id}`)}>
          <img src={f.userPicture} />
          <FollowingData>
            <p>{f.name}</p>
            <p>{f.bio}</p>
          </FollowingData>
        </Following>
      ))}
    </FollowingContainer>
  );
}

const FollowingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Quicksand", sans-serif;
  h1{
    color: white;
    font-size: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
    font-weight: 500;
  }
`;

const Following = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 25px;
  align-items: center;
  background-color: white;
  height: 175px;
  width: 50vw;
  margin-bottom: 25px;
  column-gap: 25px;
  img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
  }
  font-weight: 300;
  border-radius: 5px;
  cursor: pointer;
`;

const FollowingData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p:nth-child(1) {
    font-size: 25px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  p:nth-child(2) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

