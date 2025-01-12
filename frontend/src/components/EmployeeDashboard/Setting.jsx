import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import styled from "styled-components";



const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not matched");
    } else {
      try {
        const response = await axios.put(
          "http://localhost:5000/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          navigate("/admin-dashboard/employees");
          setError("");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <Container>
      <Title>Change Password</Title>
      <ErrorText>{error}</ErrorText>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Old Password</Label>
          <Input
            type="password"
            name="oldPassword"
            placeholder="Change Password"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>New Password</Label>
          <Input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit">Change Password</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  max-width: 768px;
  margin: 2.5rem auto;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 24rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const ErrorText = styled.p`
  color: #f56565;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const Input = styled.input`
  margin-top: 0.25rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  background-color:rgb(56, 78, 178);
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    background-color:rgb(49, 61, 151);
  }
`;

export default Setting;
