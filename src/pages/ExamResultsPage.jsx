import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const ResultsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 3rem auto;
  padding: 0 1.5rem;
  flex: 1;
`;

const ResultsCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 3rem 2rem;
  text-align: center;
`;

const ResultsTitle = styled.h1`
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const ExamTitle = styled.h2`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 3rem;
`;

const ScoreCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: ${props => {
    if (props.percentage >= 80) return '#28a745';
    if (props.percentage >= 60) return '#ffc107';
    return '#dc3545';
  }};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ScorePercentage = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
`;

const ScoreText = styled.div`
  font-size: 1.2rem;
  margin-top: 0.5rem;
  opacity: 0.9;
`;

const ResultsSummary = styled.div`
  margin-bottom: 3rem;
`;

const SummaryText = styled.p`
  font-size: 1.3rem;
  color: #555;
  margin-bottom: 1rem;
`;

const PerformanceMessage = styled.p`
  font-size: 1.2rem;
  color: ${props => {
    if (props.percentage >= 80) return '#28a745';
    if (props.percentage >= 60) return '#ffc107';
    return '#dc3545';
  }};
  font-weight: 500;
  margin-top: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
    width: 80%;
    margin: 2rem auto 0;
  }
`;

const ExamResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Redirect to dashboard if no state is passed
  if (!location.state) {
    navigate('/dashboard');
    return null;
  }
  
  const { examId, examTitle, score, totalQuestions } = location.state;
  
  const scorePercentage = Math.round((score / totalQuestions) * 100);
  
  const getPerformanceMessage = () => {
    if (scorePercentage >= 80) {
      return "Excellent work! You're well-prepared for the AWS certification exam.";
    } else if (scorePercentage >= 60) {
      return "Good effort! With a bit more study, you'll be ready for the certification exam.";
    } else {
      return "Keep studying to improve your understanding of AWS concepts.";
    }
  };
  
  const handleRetakeExam = () => {
    navigate(`/exam/${examId}`);
  };
  
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  return (
    <PageContainer className="page-container">
      <Header />
      <ResultsContainer>
        <ResultsCard>
          <ResultsTitle>Exam Results</ResultsTitle>
          <ExamTitle>{examTitle}</ExamTitle>
          
          <ScoreCircle percentage={scorePercentage}>
            <ScorePercentage>{scorePercentage}%</ScorePercentage>
            <ScoreText>Your Score</ScoreText>
          </ScoreCircle>
          
          <ResultsSummary>
            <SummaryText>
              You answered {score} out of {totalQuestions} questions correctly.
            </SummaryText>
            <PerformanceMessage percentage={scorePercentage}>
              {getPerformanceMessage()}
            </PerformanceMessage>
          </ResultsSummary>
          
          <ButtonGroup>
            <Button onClick={handleRetakeExam}>Retake Exam</Button>
            <Button className="secondary" onClick={handleBackToDashboard}>Back to Dashboard</Button>
          </ButtonGroup>
        </ResultsCard>
      </ResultsContainer>
      <Footer />
    </PageContainer>
  );
};

export default ExamResultsPage;
