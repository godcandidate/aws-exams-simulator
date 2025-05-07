import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ResultsContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
`;

const ResultsHeader = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ScoreCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const ScoreText = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const ScoreValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => {
    if (props.percentage >= 80) return '#28a745';
    if (props.percentage >= 60) return '#ffc107';
    return '#dc3545';
  }};
  margin-bottom: 1rem;
`;

const ScoreDetails = styled.p`
  font-size: 1.1rem;
  color: #6c757d;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Redirect to home if no state is passed
  if (!location.state) {
    navigate('/');
    return null;
  }
  
  const { userAnswers, questions } = location.state;
  
  // Calculate score
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;
  
  const totalQuestions = questions.length;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  const handleReviewAnswers = () => {
    navigate('/review', { state: { userAnswers, questions } });
  };
  
  const handleRetakeExam = () => {
    navigate('/test');
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  return (
    <PageContainer>
      <Header />
      <ResultsContainer>
        <ResultsHeader>Exam Results</ResultsHeader>
        
        <ScoreCard>
          <ScoreText>Your Score</ScoreText>
          <ScoreValue percentage={scorePercentage}>{scorePercentage}%</ScoreValue>
          <ScoreDetails>
            You answered {correctAnswers} out of {totalQuestions} questions correctly.
          </ScoreDetails>
          
          {scorePercentage >= 80 ? (
            <p>Excellent work! You're well-prepared for the AWS certification exam.</p>
          ) : scorePercentage >= 60 ? (
            <p>Good effort! With a bit more study, you'll be ready for the certification exam.</p>
          ) : (
            <p>Keep studying! Review the explanations to improve your understanding.</p>
          )}
        </ScoreCard>
        
        <ButtonGroup>
          <Button onClick={handleReviewAnswers}>Review Answers</Button>
          <Button className="secondary" onClick={handleRetakeExam}>Retake Exam</Button>
          <Button className="secondary" onClick={handleBackToHome}>Back to Home</Button>
        </ButtonGroup>
      </ResultsContainer>
      <Footer />
    </PageContainer>
  );
};

export default ResultsPage;
