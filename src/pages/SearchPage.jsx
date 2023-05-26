import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

export default function SearchPage() {
  const [user, setUser] = useContext(UserContext);

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
      <input type="text" onChange={(e) => handleChange(e)} />
      {search.map((u) => (
        <User>
          <img src={u.userPicture} />
          <p>{u.name}</p>
          <p>{u.bio}</p>
        </User>
      ))}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;

const User = styled.div`

`;