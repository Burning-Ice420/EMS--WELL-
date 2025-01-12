import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";
import styled from "styled-components";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1; // Initialize sno
        const data = response.data.leaves.map((leave) => {
          return {
            _id: leave._id,
            sno: sno++, // Increment sno for each leave
            employeeId: leave.employeeId.employeeId,
            name: leave.employeeId.userId.name,
            leaveType: leave.leaveType,
            department: leave.employeeId.department.dep_name,
            days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
            status: leave.status,
            action: <LeaveButtons Id={leave._id} />,
          };
        });
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()) // Corrected filter condition
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  return (
    <>
      {filteredLeaves ? (
        <Container>
          <Title>Manage Leaves</Title>

          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search By Emp Id"
              onChange={filterByInput}
            />

            <ButtonGroup>
              <FilterButton onClick={() => filterByButton("Pending")}>
                Pending
              </FilterButton>
              <FilterButton onClick={() => filterByButton("Approved")}>
                Approved
              </FilterButton>
              <FilterButton onClick={() => filterByButton("Rejected")}>
                Rejected
              </FilterButton>
            </ButtonGroup>
          </SearchContainer>

          <TableContainer>
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </TableContainer>
        </Container>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

const Container = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  padding: 0.25rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const FilterButton = styled.button`
  padding: 0.25rem 1rem;
  background-color: rgb(29, 62, 154);
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgb(20, 45, 122);
  }
`;

const TableContainer = styled.div`
  margin-top: 1.5rem;
`;

export default Table;

