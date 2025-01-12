import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import styled from 'styled-components';


const SummaryCard = () => {
  const { user } = useAuth();

  return (
    <CardContainer>
      <Card>
        <IconWrapper>
          <FaUser />
        </IconWrapper>
        <TextContainer>
          <WelcomeText>Welcome Back</WelcomeText>
          <NameText>{user.name}</NameText>
        </TextContainer>
      </Card>
    </CardContainer>
  );
};
const CardContainer = styled.div`
  padding: 1.5rem;
  background: url("../images/employee.jpg");
  background-size: cover;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Card = styled.div`
  display: flex;
  background-color: white;
  border-radius: 0.375rem;
  overflow: hidden;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:rgb(49, 71, 151);
  color: white;
  font-size: 1.875rem;
  padding: 1rem;
`;

const TextContainer = styled.div`
  padding-left: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

const WelcomeText = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
`;

const NameText = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
`;

export default SummaryCard;
