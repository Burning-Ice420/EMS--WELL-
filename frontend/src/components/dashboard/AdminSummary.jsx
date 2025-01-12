import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import axios from 'axios';


const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('http://localhost:5000/api/dashboard/summary', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSummary(summary.data);
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching data");
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Dashboard Overview</Title>
      <Grid>
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployees} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartments} color="bg-yellow-600" />
        <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number={`$${summary.totalSalary}`} color="bg-red-600" />
      </Grid>

      <SectionTitle>Leave Details</SectionTitle>
      <LeaveGrid>
        <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={summary.leaveSummary.appliedFor} color="bg-teal-600" />
        <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={summary.leaveSummary.approved} color="bg-green-600" />
        <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={summary.leaveSummary.pending} color="bg-yellow-600" />
        <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={summary.leaveSummary.rejected} color="bg-red-600" />
      </LeaveGrid>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.5rem;
  background: url("../images/admin.avif") no-repeat center center fixed;
  background-size: cover;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;


const Title = styled.h3`
  font-size: 2rem;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h4`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 3rem;
`;

const LeaveGrid = styled(Grid)`
  grid-template-columns: repeat(2, 1fr);
`;
export default AdminSummary;
