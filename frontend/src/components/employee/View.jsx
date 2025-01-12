import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";



const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

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
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <>
      {employee ? (
        <Container>
          <Title>Employee Details</Title>
          <DetailsGrid>
            <ProfileImageWrapper>
              <ProfileImage
                src={`http://localhost:5000/${employee.userId.profileImage}`}
                alt="Profile"
              />
            </ProfileImageWrapper>
            <InfoSection>
              <InfoRow>
                <InfoLabel>Name:</InfoLabel>
                <InfoValue>{employee.userId.name}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Employee ID:</InfoLabel>
                <InfoValue>{employee.employeeId}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Date of Birth:</InfoLabel>
                <InfoValue>
                  {new Date(employee.dob).toLocaleDateString()}
                </InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Gender:</InfoLabel>
                <InfoValue>{employee.gender}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Department:</InfoLabel>
                <InfoValue>{employee.department.dep_name}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Marital Status:</InfoLabel>
                <InfoValue>{employee.maritalStatus}</InfoValue>
              </InfoRow>
            </InfoSection>
          </DetailsGrid>
        </Container>
      ) : (
        <div>Loading ....</div>
      )}
    </>
  );
};


const Container = styled.div`
  max-width: 768px;
  margin: 2.5rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

const InfoLabel = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
`;

const InfoValue = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
`;
export default View;
