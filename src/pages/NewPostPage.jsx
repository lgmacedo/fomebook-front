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
      <h1>Novo Post</h1>
      <form onSubmit={post}>
        <input
          required
          placeholder="Foto"
          type="text"
          name="picture"
          value={form.picture}
          onChange={(e) => handleChange(e)}
        />
        <textarea
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
  justify-content: space-between;
  align-items: center;
  padding-top: 100px;
  h1{
    font-family: 'Quicksand', sans-serif;
    color: white;
    font-size: 30px;
    font-weight: 500;
    margin-top: 30px;
  }
  form{
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }
  input{
    width: 400px;
    height: 40px;
    font-size: 20px;
    padding-left: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    outline-style: none;
    border: none;
  }
  textarea{
    width: 400px;
    height: 140px;
    font-size: 20px;
    padding-left: 10px;
    padding-top: 5px;
    margin-bottom: 15px;
    border-radius: 5px;
    outline-style: none;
    border: none;
  }
  a{
    margin-top: 20px;
    text-decoration: none;
    color: white;
    font-family: 'Quicksand', sans-serif;
  }
  button{
    width: 400px;
    height: 40px;
    font-size: 20px;
    outline-style: none;
    text-decoration: none;
    cursor: pointer;
    background-color: white;
    border: none;
    border-radius: 5px;
    color: grey;
  }
`;
