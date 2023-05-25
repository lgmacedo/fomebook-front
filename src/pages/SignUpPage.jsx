import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

export default function SignUpPage() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

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
    if(err.response.status === 409){
      alert("Email já cadastrado.");
    }else{
      alert(err.response.data);
    }
  }

  return (
    <SignUpContainer>
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
        <input
          required
          type="text"
          name="bio"
          value={form.bio}
          onChange={(e) => handleChange(e)}
          placeholder="Biografia"
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
  justify-content: center;
  align-items: center;
  form{
    margin-top: 30px;
  }
  a{
    margin-top: 30px;
    font-weight: 700;
  }
`;