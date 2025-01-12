import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/authContext";



const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <NavbarContainer>
      <WelcomeText>Welcome {user.name}</WelcomeText>
      <LogoutButton onClick={logout}>Logout</LogoutButton>
    </NavbarContainer>
  );
};
const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  background-color: rgb(25, 42, 222);
  padding: 0 1.25rem;
  color: white;
`;

const WelcomeText = styled.p`
  font-size: 1rem;
`;

const LogoutButton = styled.button`
  padding: 0.25rem 1rem;
  background-color:rgb(29, 45, 167);
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background-color:rgb(10, 50, 180);
  }
`;

export default Navbar;
