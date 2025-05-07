import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin-top: 80px; /* Add specific margin to account for the fixed header */
  
  &.page-container {
    padding-top: 0; /* Override the global style since we have padding in the hero section */
  }
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #0066cc 0%, #004080 100%);
  color: white;
  padding: 3rem 2rem 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem 4rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  max-width: 600px;
  margin-bottom: 3rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const GetStartedButton = styled(Link)`
  background-color: white;
  color: #0066cc;
  padding: 0.9rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
  }
`;

const LoginButton = styled(Link)`
  background-color: transparent;
  color: white;
  padding: 0.9rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  border: 2px solid white;
  transition: all 0.3s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const FeaturesSection = styled.div`
  padding: 4rem 2rem;
  background-color: white;
  width: 100%;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
`;

const FeatureCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #0066cc;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const LandingPage = () => {
  const { currentUser } = useAuth();
  
  return (
    <Layout>
      <HeroSection>
        <HeroTitle>Master AWS Certification Exams</HeroTitle>
        <HeroSubtitle>
          Practice with realistic questions and get instant feedback
        </HeroSubtitle>
        
        <ButtonGroup>
          {currentUser ? (
            <GetStartedButton to="/dashboard">Go to Dashboard</GetStartedButton>
          ) : (
            <>
              <GetStartedButton to="/signup">Sign Up Free</GetStartedButton>
              <LoginButton to="/login">Log In</LoginButton>
            </>
          )}
        </ButtonGroup>
      </HeroSection>
      
      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>Key Features</SectionTitle>
          
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>📚</FeatureIcon>
              <FeatureTitle>Comprehensive Questions</FeatureTitle>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🔍</FeatureIcon>
              <FeatureTitle>Detailed Explanations</FeatureTitle>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>⏱️</FeatureIcon>
              <FeatureTitle>Realistic Exam Experience</FeatureTitle>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>
    </Layout>
  );
};

export default LandingPage;
