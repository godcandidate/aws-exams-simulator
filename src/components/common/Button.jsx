import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-block;
  background-color: ${props => props.className === 'secondary' ? 'white' : '#0066cc'};
  color: ${props => props.className === 'secondary' ? '#0066cc' : 'white'};
  border: ${props => props.className === 'secondary' ? '2px solid #0066cc' : 'none'};
  padding: 0.9rem 1.8rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  box-shadow: ${props => props.className === 'secondary' ? 'none' : '0 4px 10px rgba(0, 102, 204, 0.2)'};
  
  &:hover {
    background-color: ${props => props.className === 'secondary' ? 'rgba(0, 102, 204, 0.05)' : '#0055aa'};
    transform: translateY(-2px);
    box-shadow: ${props => props.className === 'secondary' ? '0 2px 8px rgba(0, 0, 0, 0.05)' : '0 6px 15px rgba(0, 102, 204, 0.3)'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Button = ({ children, className, ...rest }) => {
  return (
    <StyledButton className={className} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
