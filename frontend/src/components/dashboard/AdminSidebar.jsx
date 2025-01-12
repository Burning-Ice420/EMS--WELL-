import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
  FaCalendar,
} from "react-icons/fa";
import styled from "styled-components";

const AdminSidebar = () => {
  return (
    <SidebarContainer>
      <Header>
        <Title>Employee MS</Title>
      </Header>
      <div>
        <NavLinkStyled to="/admin-dashboard" end>
          <FaTachometerAlt />
          <span style={{ marginLeft: "1rem" }}>Dashboard</span>
        </NavLinkStyled>

        <NavLinkStyled to="/admin/calendar">
          <FaCalendar />
          <span style={{ marginLeft: "1rem" }}>Calendar</span>
        </NavLinkStyled>

        <NavLinkStyled to="/admin-dashboard/employees">
          <FaUsers />
          <span style={{ marginLeft: "1rem" }}>Employee</span>
        </NavLinkStyled>
        <NavLinkStyled to="/admin-dashboard/departments">
          <FaBuilding />
          <span style={{ marginLeft: "1rem" }}>Department</span>
        </NavLinkStyled>
        <NavLinkStyled to="/admin-dashboard/leaves">
          <FaCalendarAlt />
          <span style={{ marginLeft: "1rem" }}>Leave</span>
        </NavLinkStyled>
        <NavLinkStyled to="/admin-dashboard/salary/add">
          <FaMoneyBillWave />
          <span style={{ marginLeft: "1rem" }}>Salary</span>
        </NavLinkStyled>
        <NavLinkStyled to="/admin-dashboard/setting">
          <FaCogs />
          <span style={{ marginLeft: "1rem" }}>Settings</span>
        </NavLinkStyled>
      </div>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  background-color: #1f2937;
  color: white;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 16rem;
`;

const Header = styled.div`
  background-color: rgb(25, 42, 222);
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-family: "Pacifico", cursive;
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.625rem 1rem;
  border-radius: 0.375rem;
  margin: 0.5rem;
  text-decoration: none;
  color: white;

  &.active {
    background-color: rgb(20, 34, 184);
  }

  &:hover {
    background-color: rgb(108, 76, 214);
  }
`;

export default AdminSidebar;
