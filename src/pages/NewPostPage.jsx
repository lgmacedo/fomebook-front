import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

export default function NewPostPage() {
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/feed");
    } else {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const [user, setUser] = useContext(UserContext);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  const navigate = useNavigate();

  const [form, setForm] = useState({
    picture: "",
    description: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function post(e) {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const promise = api.post("/new", form, config);
    promise.then(postSuccess);
    promise.catch(postFailed);
  }

  function postSuccess(res) {
    navigate("/feed");
  }

  function postFailed(err) {
    alert(err.response.data);
  }

  return (
    <NewPostContainer>
      <form onSubmit={post}>
        <input
          required
          placeholder="Foto"
          type="text"
          name="picture"
          value={form.picture}
          onChange={(e) => handleChange(e)}
        />
        <input
          placeholder="Descrição"
          type="text"
          required
          name="description"
          value={form.description}
          onChange={(e) => handleChange(e)}
        />
        <button type="Submit">Criar Post</button>
      </form>
    </NewPostContainer>
  );
}

const NewPostContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    margin-top: 30px;
  }
  a {
    margin-top: 30px;
    font-weight: 700;
  }
`;
