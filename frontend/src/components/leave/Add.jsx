import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Add = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId: user?._id || "", 
    startDate: "",
    endDate: "",
    reason: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (new Date(leave.startDate) > new Date(leave.endDate)) {
      alert("Start date cannot be later than the end date.");
      return;
    }


    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token is missing. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      console.log("Submitting leave request:", leave);

      const response = await axios.post(
        `http://localhost:5000/api/leave/add`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);

      if (response.data.success) {
        alert("Leave request submitted successfully!");
        navigate(`/employee-dashboard/leaves/${user._id}`);
      } else {
        alert(response.data.error || "Error occurred while submitting the request.");
      }
    } catch (error) {
      console.error("Error during leave request:", error.response || error);
      alert(error.response?.data?.message || "An error occurred while submitting the form.");
    }
  };

  return (
    <Container>
      <Title>Request for Leave</Title>
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <FormGroup>
            <Label>Leave Type</Label>
            <Select
              name="leaveType"
              onChange={handleChange}
              value={leave.leaveType}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </Select>
          </FormGroup>
          <Grid>
            <FormGroup>
              <Label>From Date</Label>
              <Input
                type="date"
                name="startDate"
                onChange={handleChange}
                value={leave.startDate}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>To Date</Label>
              <Input
                type="date"
                name="endDate"
                onChange={handleChange}
                value={leave.endDate}
                required
              />
            </FormGroup>
          </Grid>
          <FormGroup>
            <Label>Description</Label>
            <TextArea
              name="reason"
              placeholder="Reason for Leave"
              onChange={handleChange}
              value={leave.reason}
              required
            />
          </FormGroup>
        </FormSection>
        <SubmitButton type="submit">Add Leave</SubmitButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  max-width: 40rem;
  margin-top: 2.5rem;
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

const Form = styled.form``;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a4a4a;
`;

const Select = styled.select`
  margin-top: 0.25rem;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
`;

const Input = styled.input`
  margin-top: 0.25rem;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
`;

const TextArea = styled.textarea`
  margin-top: 0.25rem;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  background-color: rgb(50, 20, 184);
  color: white;
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 0.375rem;
  &:hover {
    background-color: rgb(15, 15, 156);
  }
`;

export default Add;
