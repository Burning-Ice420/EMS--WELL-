import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import styled from "styled-components";


const List = () => {
  const [leaves, setLeaves] = useState(null);
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (!leaves) {
    return <div>Loading</div>;
  }

  return (
    <Container>
      <Title>Manage Leaves</Title>
      <Header>
        <SearchInput type="text" placeholder="Search By Dep Name" />
        {user.role === "employee" && (
          <AddButton to="/employee-dashboard/add-leave">Add New Leave</AddButton>
        )}
      </Header>

      <Table>
        <TableHead>
          <tr>
            <th className="px-6 py-3">SNO</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </TableHead>
        <tbody>
          {leaves.map((leave) => (
            <TableRow key={leave._id}>
              <TableCell>{sno++}</TableCell>
              <TableCell>{leave.leaveType}</TableCell>
              <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>{leave.status}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.25rem 1rem;
  border: 1px solid #ccc;
`;

const AddButton = styled(Link)`
  padding: 0.25rem 1rem;
  background-color:rgb(56, 62, 178);
  border-radius: 0.25rem;
  color: white;
  text-decoration: none;

  &:hover {
    background-color:rgb(52, 49, 151);
  }
`;

const Table = styled.table`
  width: 100%;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  text-align: left;
  color: #4a5568;
`;

const TableHead = styled.thead`
  font-size: 0.75rem;
  text-transform: uppercase;
  background-color: #f9fafb;
  border: 1px solid #e2e8f0;
  color: #4a5568;
`;

const TableRow = styled.tr`
  background-color: ${({ isDark }) => (isDark ? "#2d3748" : "#fff")};
  border-bottom: 1px solid ${({ isDark }) => (isDark ? "#4a5568" : "#e2e8f0")};
`;

const TableCell = styled.td`
  padding: 0.75rem;
`;


export default List;
