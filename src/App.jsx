import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from "react";

import UserContext from "./contexts/UserContext";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

export default function App() {
  const [user, setUser] = useState({});

  return (
      <BrowserRouter>
        <UserContext.Provider value={[user, setUser]}>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  );
}