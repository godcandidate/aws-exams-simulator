import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  flex: 1;
`;

const WelcomeSection = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const WelcomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const WelcomeTitle = styled.h1`
  font-size: 1.8rem;
  color: #333;
`;

const WelcomeText = styled.p`
  color: #666;
  line-height: 1.6;
`;

const ExamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ExamCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ExamCardHeader = styled.div`
  background-color: #0066cc;
  color: white;
  padding: 1.5rem;
`;

const ExamTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

const ExamMeta = styled.div`
  display: flex;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const ExamCardBody = styled.div`
  padding: 1.5rem;
`;

const ExamDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ExamStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: #666;
`;

const StartButton = styled(Link)`
  display: block;
  background-color: #0066cc;
  color: white;
  text-align: center;
  padding: 0.75rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0055aa;
  }
`;

// Mock exam data
const exams = [
  {
    id: 1,
    title: 'AWS Core Services',
    description: 'Practice questions covering fundamental AWS services like EC2, S3, RDS, and more.',
    questions: 20,
    timeLimit: 30,
    difficulty: 'Beginner'
  },
  {
    id: 2,
    title: 'AWS Networking',
    description: 'Test your knowledge of VPC, subnets, security groups, and other networking concepts.',
    questions: 15,
    timeLimit: 25,
    difficulty: 'Intermediate'
  },
  {
    id: 3,
    title: 'AWS Security',
    description: 'Security-focused questions about IAM, encryption, compliance, and best practices.',
    questions: 25,
    timeLimit: 40,
    difficulty: 'Advanced'
  },
  {
    id: 4,
    title: 'AWS Database Services',
    description: 'Questions about RDS, DynamoDB, Aurora, Redshift, and other database offerings.',
    questions: 18,
    timeLimit: 30,
    difficulty: 'Intermediate'
  }
];

const UserDashboard = () => {
  const { currentUser } = useAuth();
  
  return (
    <PageContainer className="page-container">
      <Header />
      <DashboardContainer>
        <WelcomeSection>
          <WelcomeHeader>
            <WelcomeTitle>Welcome, {currentUser?.name}!</WelcomeTitle>
          </WelcomeHeader>
          <WelcomeText>
            Choose from the practice exams below to test your AWS knowledge. Each exam focuses on different
            aspects of AWS services and concepts to help you prepare for certification.
          </WelcomeText>
        </WelcomeSection>
        
        <h2>Practice Exams</h2>
        <ExamGrid>
          {exams.map((exam) => (
            <ExamCard key={exam.id}>
              <ExamCardHeader>
                <ExamTitle>{exam.title}</ExamTitle>
                <ExamMeta>Difficulty: {exam.difficulty}</ExamMeta>
              </ExamCardHeader>
              <ExamCardBody>
                <ExamDescription>{exam.description}</ExamDescription>
                <ExamStats>
                  <StatItem>
                    <StatValue>{exam.questions}</StatValue>
                    <StatLabel>Questions</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatValue>{exam.timeLimit}</StatValue>
                    <StatLabel>Minutes</StatLabel>
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
