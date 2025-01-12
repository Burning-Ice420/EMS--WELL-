import React from "react";
import Sidebar from "../components/EmployeeDashboard/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import styled from "styled-components";

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
`;

const ContentArea = styled.div`
  flex: 1;
  margin-left: 16rem;
  background-color: #f7fafc;
  height: 100vh;
`;

const EmployeeDashboard = () => {
  return (
    <DashboardContainer>
      <Sidebar />
      <ContentArea>
        <Navbar />
        <Outlet />
      </ContentArea>
    </DashboardContainer>
  );
};

export default EmployeeDashboard;
