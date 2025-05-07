import styled from 'styled-components';

const Button = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0055aa;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  &.secondary {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
    
    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

export default Button;
