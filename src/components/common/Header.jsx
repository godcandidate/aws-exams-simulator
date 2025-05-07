import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 80px;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0066cc;
  text-decoration: none;
  white-space: nowrap;
  
  @media (max-width: 576px) {
    font-size: 1.3rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
  
  @media (max-width: 576px) {
    gap: 0.5rem;
  }
  
  @media (max-width: 768px) {
    display: ${props => (props.$isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: white;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    align-items: flex-start;
    z-index: 999;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem;
  
  &:hover {
    color: #0066cc;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.8rem 0;
    border-bottom: 1px solid #eee;
  }
  
  @media (max-width: 576px) {
    font-size: 0.9rem;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const LoginButton = styled(Link)`
  padding: 0.5rem 1rem;
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
  border: 1px solid #0066cc;
  border-radius: 4px;
  transition: all 0.3s;
  white-space: nowrap;
  
  &:hover {
    background-color: #0066cc;
    color: white;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 0.7rem;
  }
  
  @media (max-width: 576px) {
    font-size: 0.9rem;
  }
`;

const SignupButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #0066cc;
  color: white;
  text-decoration: none;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.3s;
  white-space: nowrap;
  
  &:hover {
    background-color: #0055aa;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 0.7rem;
  }
  
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #0066cc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.8rem;
  margin-right: 0.5rem;
`;

const UserName = styled.span`
  font-weight: 500;
  display: flex;
  align-items: center;
  
  @media (max-width: 576px) {
    font-size: 0.9rem;
  }
`;

const DashboardLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f0f0f0;
    color: #0066cc;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.8rem 0;
    border-bottom: 1px solid #eee;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    width: 100%;
  }
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  color: #dc3545;
  background: none;
  border: 1px solid #dc3545;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
  
  &:hover {
    background-color: #dc3545;
    color: white;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuContainer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <Logo to="/">AWS Exams Simulator</Logo>
      
      <MobileMenuContainer>
        <MenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? '✕' : '☰'}
        </MenuButton>
      </MobileMenuContainer>
      
      <Nav $isOpen={mobileMenuOpen}>
        <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
        <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
