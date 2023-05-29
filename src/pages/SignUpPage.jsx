import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";

export default function SignUpPage() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
      navigate("/feed");
    }
  }, []);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    userPicture: "",
    bio: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function signup(e) {
    e.preventDefault();
    const signup = {
      name: form.name,
      email: form.email,
      userPicture: form.userPicture,
      bio: form.bio,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };
    const promise = api.post("/signup", signup);
    promise.then(signUpSuccess);
    promise.catch(signUpFailed);
  }

  function signUpSuccess() {
    navigate("/");
  }

  function signUpFailed(err) {
    if (err.response.status === 409) {
      alert("Email já cadastrado.");
    } else {
      alert(err.response.data);
    }
  }

  return (
    <SignUpContainer>
      <h1>fomebook</h1>
      <form onSubmit={signup}>
        <input
          required
          name="name"
          value={form.name}
          onChange={(e) => handleChange(e)}
          placeholder="Nome"
          type="text"
        />
        <input
          required
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => handleChange(e)}
          placeholder="E-mail"
        />
        <input
          required
          type="text"
          name="userPicture"
          value={form.userPicture}
          onChange={(e) => handleChange(e)}
          placeholder="Foto de perfil"
        />
        <textarea
          required
          type="text"
          name="bio"
          value={form.bio}
          onChange={(e) => handleChange(e)}
          placeholder="Biografia (até 200 caracteres)"
          maxLength="200"
        />
        <input
          placeholder="Senha"
          type="password"
          required
          name="password"
          value={form.password}
          onChange={(e) => handleChange(e)}
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          required
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;
  h1 {
    font-family: "Cherry Bomb One", cursive;
    color: white;
    font-size: 50px;
    margin-top: 30px;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }
  input {
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
    height: 100px;
    font-size: 20px;
    padding-left: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    outline-style: none;
    border: none;
    padding-top: 10px;
  }
  a {
    margin-top: 20px;
    text-decoration: none;
    color: white;
    font-family: "Quicksand", sans-serif;
  }
  button {
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
  @media (max-width: 420px) {
    padding-top: 0px;
    h1{
      font-size: 40px;
    }
    form{
      margin-top: 20px;
    }
    input, button, textarea{
      width: 93vw;
      font-size: 15px;
    }
  }
`;
