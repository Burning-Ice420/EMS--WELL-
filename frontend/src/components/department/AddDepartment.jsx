import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: '',
    description: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/department/add', department, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <Container>
      <Title>Add New Department</Title>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Label htmlFor="dep_name">Department Name</Label>
          <Input
            type="text"
            name="dep_name"
            onChange={handleChange}
            placeholder="Department Name"
            required
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="description">Description</Label>
          <TextArea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            rows="4"
          />
        </InputWrapper>

        <SubmitButton type="submit">
          Add Department
        </SubmitButton>
      </Form>
    </Container>
  );
};



const Container = styled.div`
  max-width: 40rem;
  margin: 0 auto;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 24rem;
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
`;


const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Form = styled.form``;

const InputWrapper = styled.div`
  margin-top: 1rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a4a4a;
`;

const Input = styled.input`
  margin-top: 0.25rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
`;

const TextArea = styled.textarea`
  margin-top: 0.25rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  background-color:rgb(19, 63, 222);
  color: white;
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 0.375rem;
  &:hover {
    background-color:rgba(18, 46, 208, 0.44);
  }
`;

export default AddDepartment;
