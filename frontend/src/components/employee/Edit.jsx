import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";



const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: 0,
    department: "",
  });
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const employee = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name: employee.userId.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department,
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/employee/${id}`,
        employee,
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
      {departments && employee ? (
        <Container>
          <Title>Edit Employee</Title>
          <Form onSubmit={handleSubmit}>
            <div>
              <InputLabel>Name</InputLabel>
              <InputField
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                placeholder="Insert Name"
                required
              />
            </div>

            <div>
              <InputLabel>Marital Status</InputLabel>
              <SelectField
                name="maritalStatus"
                onChange={handleChange}
                value={employee.maritalStatus}
                required
              >
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </SelectField>
            </div>

            <div>
              <InputLabel>Designation</InputLabel>
              <InputField
                type="text"
                name="designation"
                onChange={handleChange}
                value={employee.designation}
                placeholder="Designation"
                required
              />
            </div>

            <div>
              <InputLabel>Salary</InputLabel>
              <InputField
                type="number"
                name="salary"
                onChange={handleChange}
                value={employee.salary}
                placeholder="Salary"
                required
              />
            </div>

            <div>
              <InputLabel>Department</InputLabel>
              <SelectField
                name="department"
                onChange={handleChange}
                value={employee.department}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </SelectField>
            </div>

            <Button type="submit">Edit Employee</Button>
          </Form>
        </Container>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

const Container = styled.div`
  max-width: 4xl;
  margin: 10px auto;
  background-color: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #4a4a4a;
`;

const InputField = styled.input`
  margin-top: 8px;
  padding: 8px;
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

const SelectField = styled.select`
  margin-top: 8px;
  padding: 8px;
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  margin-top: 8px;
  padding: 8px;
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 12px;
  background-color:rgb(20, 23, 184);
  color: white;
  font-weight: 700;
  border-radius: 8px;

  &:hover {
    background-color:rgb(15, 44, 159);
  }
`;
export default Edit;
