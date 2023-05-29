import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router";

export default function SearchPage() {
  const [user, setUser] = useContext(UserContext);

  const navigate = useNavigate();

  const [key, setKey] = useState("");
  const [search, setSearch] = useState([]);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

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
      const promise = api.post("/search", { key }, config);
      promise.then(searchSuccess);
    }
  }, [key]);

  function handleChange(e) {
    setKey(e.target.value);
  }

  function searchSuccess(res) {
    setSearch(res.data);
  }

  return (
    <SearchContainer>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => handleChange(e)}
      />
      {search.map((u) => (
        <User onClick={() => navigate(`/perfil/${u.id}`)}>
          <img src={u.userPicture} />
          <UserData>
            <p>{u.name}</p>
            <p>{u.bio}</p>
          </UserData>
        </User>
      ))}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Quicksand', sans-serif;
  input {
    width: 50vw;
    margin-top: 35px;
    margin-bottom: 35px;
    font-size: 20px;
    height: 50px;
    border-radius: 5px;
    border: none;
    padding-left: 10px;
  }
`;

const User = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 25px;
  align-items: center;
  background-color: white;
  height: 175px;
  width: 50vw;
  margin-bottom: 25px;
  img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
  }
  font-weight: 300;
  border-radius: 5px;
  cursor: pointer;
`;

const UserData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 25px;
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
