import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <Container>
      <Title>Employee Management System</Title>
      <FormWrapper>
        <FormTitle>Login</FormTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="*****"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormField>
          <FormField
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <CheckboxLabel>
              <Checkbox type="checkbox" />
              Remember me
            </CheckboxLabel>
            <ForgotPassword href="#">Forgot password?</ForgotPassword>
          </FormField>
          <SubmitButton type="submit">Login</SubmitButton>
        </form>
      </FormWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, blue 50%, #f3f4f6 50%);
  space-y: 6rem;
  background-image: url("../images/bg.webp");
`;

const Title = styled.h2`
  font-family: "Pacifico", cursive;
  font-size: 2rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); 
`;

const FormWrapper = styled.div`
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 20rem;
  background: white;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const FormField = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: #4b5563;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  color: #4b5563;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const ForgotPassword = styled.a`
  color: teal;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: blue;
  color: white;
  padding: 0.5rem;
  transition: background-color 0.3s ease; 

  &:hover {
    background-color: lightgreen; 
  }
`;

export default Login;
