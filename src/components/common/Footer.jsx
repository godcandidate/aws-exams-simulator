import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background-color: #f8f9fa;
  color: #6c757d;
  font-size: 0.9rem;
  margin-top: auto;
  width: 100%;
  text-align: center;
  
  @media (max-width: 576px) {
    padding: 1rem;
    font-size: 0.8rem;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <p>© {currentYear} AWS Exams Simulator. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
