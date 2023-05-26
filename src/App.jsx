import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from "react";

import UserContext from "./contexts/UserContext";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";

export default function App() {
  const [user, setUser] = useState({});

  return (
      <BrowserRouter>
        <UserContext.Provider value={[user, setUser]}>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/feed" element = {<HomePage />} />
            <Route path="/seguidores" element = {<FollowersPage />} />
            <Route path="/seguindo" element = {<FollowingPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  );
}