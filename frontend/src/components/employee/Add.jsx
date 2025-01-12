import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";



const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        formDataObj,
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
    <Container>
      <Title>Add New Employee</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Insert Name"
            required
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Insert Email"
            required
          />
        </div>

        <div>
          <Label>Employee ID</Label>
          <Input
            type="text"
            name="employeeId"
            onChange={handleChange}
            placeholder="Employee ID"
            required
          />
        </div>

        <div>
          <Label>Date of Birth</Label>
          <Input
            type="date"
            name="dob"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Gender</Label>
          <Select
            name="gender"
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </div>

        <div>
          <Label>Marital Status</Label>
          <Select
            name="maritalStatus"
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </Select>
        </div>

        <div>
          <Label>Designation</Label>
          <Input
            type="text"
            name="designation"
            onChange={handleChange}
            placeholder="Designation"
            required
          />
        </div>

        <div>
          <Label>Department</Label>
          <Select
            name="department"
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.dep_name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label>Salary</Label>
          <Input
            type="number"
            name="salary"
            onChange={handleChange}
            placeholder="Salary"
            required
          />
        </div>

        <div>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="******"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Role</Label>
          <Select
            name="role"
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </Select>
        </div>

        <div>
          <Label>Upload Image</Label>
          <Input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
          />
        </div>

        <Button type="submit">Add Employee</Button>
      </Form>
    </Container>
  );
};
const Container = styled.div`
  max-width: 4xl;
  margin-top: 40px;
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
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #4a4a4a;
`;

const Input = styled.input`
  margin-top: 8px;
  padding: 8px;
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

const Select = styled.select`
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
  background-color:rgb(20, 67, 184);
  color: white;
  font-weight: 700;
  border-radius: 8px;

  &:hover {
    background-color:rgb(39, 15, 159);
  }
`;
export default Add;
