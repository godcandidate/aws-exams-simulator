import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import testsData from '../data/intro';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 2rem;
  flex: 1;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #0066cc 0%, #004080 100%);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  margin-bottom: 3rem;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    transform: translate(30%, -30%);
  }
`;

const WelcomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  color: white;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const WelcomeText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  font-size: 1.1rem;
  max-width: 800px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 4px;
    background-color: #0066cc;
    border-radius: 2px;
  }
`;

const ExamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;
`;

const ExamCard = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ExamCardHeader = styled.div`
  background-color: #0066cc;
  color: white;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
  }
`;

const ExamTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ExamCardBody = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ExamStats = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  background-color: #f8f9fa;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  min-width: 120px;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #0066cc;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #555;
  font-weight: 500;
`;

const StartButton = styled(Link)`
  display: block;
  background-color: #0066cc;
  color: white;
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 102, 204, 0.2);
  
  &:hover {
    background-color: #0055aa;
    box-shadow: 0 6px 15px rgba(0, 102, 204, 0.3);
    transform: translateY(-2px);
  }
`;

const UserDashboard = () => {
  const [exams, setExams] = useState([]);
  const [introData, setIntroData] = useState(null);
  
  useEffect(() => {
    // Set the intro data (first item in testsData)
    const intro = testsData.find(test => test.id === 0);
    setIntroData(intro);
    
    // Filter out the intro and set the actual exams
    const examsList = testsData.filter(test => test.id !== 0);
    setExams(examsList);
  }, []);
  
  return (
    <PageContainer className="page-container">
      <Header />
      <DashboardContainer>
        <WelcomeSection>
          <WelcomeHeader>
            <WelcomeTitle>{introData ? introData.title : 'Welcome to AWS Exams Simulator!'}</WelcomeTitle>
          </WelcomeHeader>
          <WelcomeText>
            {introData ? introData.description : 'Choose from the practice exams below to test your AWS knowledge.'}
          </WelcomeText>
        </WelcomeSection>
        
        <SectionTitle>Practice Exams</SectionTitle>
        <ExamGrid>
          {exams.map((exam) => (
            <ExamCard key={exam.id}>
              <ExamCardHeader>
                <ExamTitle>{exam.title}</ExamTitle>
              </ExamCardHeader>
              <ExamCardBody>
                <ExamStats>
                  <StatItem>
                    <StatValue>{exam.numberOfTests}</StatValue>
                    <StatLabel>Questions</StatLabel>
                  </StatItem>
                </ExamStats>
                <StartButton to={`/exam/${exam.id}`}>Start Practice</StartButton>
              </ExamCardBody>
            </ExamCard>
          ))}
        </ExamGrid>
      </DashboardContainer>
      <Footer />
    </PageContainer>
  );
};

export default UserDashboard;
