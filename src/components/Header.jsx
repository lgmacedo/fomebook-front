import styled from "styled-components";
import { Link } from "react-router-dom";
import { GoDiffAdded } from "react-icons/go";
import { BiSearchAlt } from "react-icons/bi";

export default function Header() {
  return (
    <HeaderContainer>
      <h1>fomebook</h1>
      <Buttons>
        <Link to="/novo">
          <GoDiffAdded />
        </Link>
        <Link to="/buscar">
          <BiSearchAlt />
        </Link>
      </Buttons>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
  width: 50vw;
  height: 70px;
  background-color: #d46416;
  font-family: "Cherry Bomb One", cursive;
  h1 {
    font-size: 40px;
  }
  svg {
    font-size: 40px;
    color: white;
    margin-left: 20px;
  }
`;

const Buttons = styled.div``;
