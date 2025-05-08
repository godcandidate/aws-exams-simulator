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
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ExamCard = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 1px solid #eaeaea;
  padding: 1.5rem;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const ExamInfo = styled.div`
  flex: 1;
`;

const ExamTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #333;
`;

const ExamDescription = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 0;
  line-height: 1.5;
`;

const ExamActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const QuestionCount = styled.div`
  text-align: right;
  margin-right: 1.5rem;
  
  span {
    display: block;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.25rem;
  }
  
  small {
    color: #666;
    font-size: 0.9rem;
  }
`;

const ModeButton = styled(Link)`
  display: inline-block;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  
  svg {
    margin-left: 0.5rem;
  }
`;

const PracticeButton = styled(ModeButton)`
  background-color: #e6f3ff;
  color: #0066cc;
  
  &:hover {
    background-color: #d6ebff;
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
              <ExamInfo>
                <ExamTitle>{exam.title}</ExamTitle>
                <ExamDescription>This test contains {exam.numberOfTests} questions to assess your knowledge.</ExamDescription>
              </ExamInfo>
              <ExamActions>
                <QuestionCount>
                  <span>{exam.numberOfTests}</span>
                  <small>Questions</small>
                </QuestionCount>
                <div>
                  <PracticeButton to={`/exam/${exam.id}`}>
                    Start Practice <span>&rsaquo;</span>
                  </PracticeButton>
                </div>
              </ExamActions>
            </ExamCard>
          ))}
        </ExamGrid>
      </DashboardContainer>
      <Footer />
    </PageContainer>
  );
};

export default UserDashboard;
