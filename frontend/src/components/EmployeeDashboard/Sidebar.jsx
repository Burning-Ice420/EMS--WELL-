import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const SidebarContainer = styled.div`
  background-color: #2d3748;
  color: white;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 16rem;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: rgb(41, 96, 192);
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 10px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  font-family: "Pacifico", sans-serif;
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.625rem 1rem;
  border-radius: 0.375rem;
  color: white;
  text-decoration: none;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: rgb(43, 48, 189);
  }

  &.active {
    background-color: rgb(56, 60, 178);
  }

  span {
    margin-left: 0.5rem;
  }
`;

const LinkContainer = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <SidebarContainer>
      <Header>
        <Title>Employee MS</Title>
      </Header>
      <LinkContainer>
        <NavLinkStyled to="/employee-dashboard" end>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLinkStyled>
        <NavLinkStyled to={`/employee-dashboard/profile/${user._id}`}>
          <FaUsers />
          <span>My Profile</span>
        </NavLinkStyled>
        <NavLinkStyled to={`/employee-dashboard/leaves/${user._id}`}>
          <FaBuilding />
          <span>Leaves</span>
        </NavLinkStyled>
        <NavLinkStyled to={`/employee-dashboard/salary/${user._id}`}>
          <FaCalendarAlt />
          <span>Salary</span>
        </NavLinkStyled>
        <NavLinkStyled to="/employee-dashboard/setting">
          <FaCogs />
          <span>Settings</span>
        </NavLinkStyled>
      </LinkContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
