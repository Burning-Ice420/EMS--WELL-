import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';


const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardContainer>
      <AdminSidebar />
      <MainContent>
        <Navbar />
        <Outlet />
      </MainContent>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 16rem; 
  background-color: #f3f4f6;
  height: 100vh;
`;

export default AdminDashboard;
