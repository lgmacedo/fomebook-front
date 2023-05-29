import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

export default function SignInPage() {
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
      navigate("/feed");
    }
  }, []);

  const [user, setUser] = useContext(UserContext);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function login(e) {
    e.preventDefault();
    const promise = api.post("/signin", form);
    promise.then(loginSuccess);
    promise.catch(loginFailed);
  }

  function loginSuccess(res) {
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/feed");
  }

  function loginFailed(err) {
    alert(err.response.data);
  }

  return (
    <SignInContainer>
      <h1>fomebook</h1>
      <form onSubmit={login}>
        <input
          required
          placeholder="E-mail"
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          placeholder="Senha"
          type="password"
          required
          name="password"
          value={form.senha}
          onChange={(e) => handleChange(e)}
        />
        <button type="Submit">Entrar</button>
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SignInContainer>
  );
}

const SignInContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 100px;
  h1{
    font-family: 'Cherry Bomb One', cursive;
    color: white;
    font-size: 50px;
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