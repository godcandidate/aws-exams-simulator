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
