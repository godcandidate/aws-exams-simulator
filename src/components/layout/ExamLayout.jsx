import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const ContentWrapper = styled.main`
  flex: 1;
  padding: 0;
  position: relative;
`;

const ExitButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #f8f9fa;
  color: #333;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 100;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    content: '\2190'; /* Left arrow */
    margin-right: 8px;
    font-size: 1.2rem;
  }
`;

const ExamLayout = ({ children }) => {
  const navigate = useNavigate();
  
  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will not be saved.')) {
      navigate('/dashboard');
    }
  };
  
  return (
    <LayoutContainer>
      <ContentWrapper>
        <ExitButton onClick={handleExit}>Exit to Dashboard</ExitButton>
        {children}
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default ExamLayout;
