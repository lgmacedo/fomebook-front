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
    navigate("/home");
  }

  function loginFailed(err) {
    alert(err.response.data);
  }

  return (
    <SignInContainer>
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