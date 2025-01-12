import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";



const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {departments ? (
        <Container>
          <Title>Add Salary</Title>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              {/* Department */}
              <div>
                <Label>Department</Label>
                <Select name="department" onChange={handleDepartment} required>
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Employee */}
              <div>
                <Label>Employee</Label>
                <Select
                  name="employeeId"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Basic Salary */}
              <div>
                <Label>Basic Salary</Label>
                <Input
                  type="number"
                  name="basicSalary"
                  onChange={handleChange}
                  placeholder="Basic salary"
                  required
                />
              </div>

              {/* Allowances */}
              <div>
                <Label>Allowances</Label>
                <Input
                  type="number"
                  name="allowances"
                  onChange={handleChange}
                  placeholder="Allowances"
                  required
                />
              </div>

              {/* Deductions */}
              <div>
                <Label>Deductions</Label>
                <Input
                  type="number"
                  name="deductions"
                  onChange={handleChange}
                  placeholder="Deductions"
                  required
                />
              </div>

              {/* Pay Date */}
              <div>
                <Label>Pay Date</Label>
                <Input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                  required
                />
              </div>
            </InputGroup>

            <Button type="submit">Add Salary</Button>
          </form>
        </Container>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};


const Container = styled.div`
  max-width: 40rem;
  margin: 2rem auto;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: medium;
  color: #4b5563;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  width: 100%;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color:rgb(29, 46, 154);
  color: white;
  font-weight: bold;
  border-radius: 0.375rem;
  cursor: pointer;
  margin-top: 1.5rem;

  &:hover {
    background-color:rgb(20, 30, 122);
  }
`;
export default Add;
