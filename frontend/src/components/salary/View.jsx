import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import styled from "styled-components";



const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;
  const { user } = useAuth();

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (q) => {
    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading ...</div>
      ) : (
        <Container>
          <Title>Salary History</Title>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search By Emp ID"
              onChange={(e) => filterSalaries(e.target.value)}
            />
          </SearchContainer>

          {filteredSalaries.length > 0 ? (
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>SNO</TableCell>
                  <TableCell>Emp ID</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Allowance</TableCell>
                  <TableCell>Deduction</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Pay Date</TableCell>
                </tr>
              </TableHeader>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <TableRow key={salary.id}>
                    <TableCell>{sno++}</TableCell>
                    <TableCell>{salary.employeeId.employeeId}</TableCell>
                    <TableCell>{salary.basicSalary}</TableCell>
                    <TableCell>{salary.allowances}</TableCell>
                    <TableCell>{salary.deductions}</TableCell>
                    <TableCell>{salary.netSalary}</TableCell>
                    <TableCell>
                      {new Date(salary.payDate).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          ) : (
            <NoRecords>No Records</NoRecords>
          )}
        </Container>
      )}
    </>
  );
};


const Container = styled.div`
  padding: 1.25rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
`;

const Table = styled.table`
  width: 100%;
  text-sm: true;
  text-align: left;
  color: #4b5563;
`;

const TableHeader = styled.thead`
  text-xs;
  color: #4b5563;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
`;

const TableRow = styled.tr`
  background-color: white;
  border-bottom: 1px solid #d1d5db;
  &:nth-child(even) {
    background-color: #f9fafb;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
`;

const NoRecords = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #9ca3af;
`;
export default View;
