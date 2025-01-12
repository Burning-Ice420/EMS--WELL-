import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const responnse = await axios.get(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (responnse.data.success) {
          setDepartment(responnse.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
    <>
      {depLoading ? (
        <LoadingText>Loading ...</LoadingText>
      ) : (
        <Container>
          <Title>Edit Department</Title>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <Label htmlFor="dep_name">Department Name</Label>
              <Input
                type="text"
                name="dep_name"
                onChange={handleChange}
                value={department.dep_name}
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
                value={department.description}
                rows="4"
              />
            </InputWrapper>

            <SubmitButton type="submit">Edit Department</SubmitButton>
          </Form>
        </Container>
      )}
    </>
  );
};

// Styled Components

const Container = styled.div`
  max-width: 40rem;
  margin-top: 2.5rem;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 24rem;
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
  background-color:rgb(20, 56, 184);
  color: white;
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 0.375rem;
  &:hover {
    background-color:rgb(15, 34, 156);
  }
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
`;

export default EditDepartment;
