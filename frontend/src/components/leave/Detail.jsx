import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        console.log("Error: " + error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : leave ? (
        <Container>
          <Title>Leave Details</Title>
          <DetailsGrid>
            <ProfileImageWrapper>
              <ProfileImage
                src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
                alt="Profile"
              />
            </ProfileImageWrapper>
            <InfoSection>
              <InfoRow>
                <InfoLabel>Name:</InfoLabel>
                <InfoValue>{leave.employeeId.userId.name}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Employee ID:</InfoLabel>
                <InfoValue>{leave.employeeId.employeeId}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Leave Type:</InfoLabel>
                <InfoValue>{leave.leaveType}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Reason:</InfoLabel>
                <InfoValue>{leave.reason}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Department:</InfoLabel>
                <InfoValue>{leave.employeeId.department.dep_name}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Start Date:</InfoLabel>
                <InfoValue>
                  {new Date(leave.startDate).toLocaleDateString()}
                </InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>End Date:</InfoLabel>
                <InfoValue>
                  {new Date(leave.endDate).toLocaleDateString()}
                </InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>
                  {leave.status === "Pending" ? "Action:" : "Status:"}
                </InfoLabel>
                {leave.status === "Pending" ? (
                  <ActionButtons>
                    <Button
                      className="approve"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      className="reject"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </ActionButtons>
                ) : (
                  <InfoValue>{leave.status}</InfoValue>
                )}
              </InfoRow>
            </InfoSection>
          </DetailsGrid>
        </Container>
      ) : (
        <div>No leave data found.</div>
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

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  &.approve {
    background-color: rgb(76, 116, 175);
    color: white;
    &:hover {
      background-color: rgb(44, 71, 154);
    }
  }
  &.reject {
    background-color: #f44336;
    color: white;
    &:hover {
      background-color: #e53935;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #777;
`;

export default Detail;
