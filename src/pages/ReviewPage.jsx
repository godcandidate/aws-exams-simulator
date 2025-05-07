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

const ReviewContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
`;

const ReviewHeader = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const QuestionItem = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #f8f9fa;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const QuestionNumber = styled.span`
  font-weight: 500;
  color: #6c757d;
`;

const QuestionStatus = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => props.isCorrect ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)'};
  color: ${props => props.isCorrect ? '#28a745' : '#dc3545'};
`;

const QuestionText = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1rem;
`;

const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const AnswerItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 4px;
  background-color: ${props => {
    if (props.isCorrect) return 'rgba(40, 167, 69, 0.1)';
    if (props.isSelected && !props.isCorrect) return 'rgba(220, 53, 69, 0.1)';
    return 'white';
  }};
  border: 1px solid ${props => {
    if (props.isCorrect) return '#28a745';
    if (props.isSelected && !props.isCorrect) return '#dc3545';
    return '#dee2e6';
  }};
`;

const AnswerText = styled.span`
  margin-left: 0.5rem;
`;

const ExplanationSection = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
`;

const ExplanationTitle = styled.h4`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const ReviewPage = () => {
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
  
  const handleRetakeExam = () => {
    navigate('/test');
  };
  
  const handleBackToResults = () => {
    navigate('/results', { state: { userAnswers, questions } });
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  return (
    <PageContainer>
      <Header />
      <ReviewContainer>
        <ReviewHeader>Review Answers</ReviewHeader>
        
        <QuestionList>
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <QuestionItem key={question.id}>
                <QuestionHeader>
                  <QuestionNumber>Question {index + 1}</QuestionNumber>
                  <QuestionStatus isCorrect={isCorrect}>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </QuestionStatus>
                </QuestionHeader>
                
                <QuestionText>{question.question}</QuestionText>
                
                <AnswerList>
                  {question.options.map(option => {
                    const isCorrectOption = option.id === question.correctAnswer;
                    const isSelectedOption = option.id === userAnswer;
                    
                    return (
                      <AnswerItem 
                        key={option.id}
                        isCorrect={isCorrectOption}
                        isSelected={isSelectedOption}
                      >
                        <AnswerText>
                          {option.id}. {option.text}
                          {isCorrectOption && ' (Correct Answer)'}
                          {isSelectedOption && !isCorrectOption && ' (Your Answer)'}
                        </AnswerText>
                      </AnswerItem>
                    );
                  })}
                </AnswerList>
                
                <ExplanationSection>
                  <ExplanationTitle>Explanation:</ExplanationTitle>
                  <p>{question.explanation}</p>
                </ExplanationSection>
              </QuestionItem>
            );
          })}
        </QuestionList>
        
        <ButtonGroup>
          <Button onClick={handleRetakeExam}>Retake Exam</Button>
          <Button className="secondary" onClick={handleBackToResults}>Back to Results</Button>
          <Button className="secondary" onClick={handleBackToHome}>Back to Home</Button>
        </ButtonGroup>
      </ReviewContainer>
      <Footer />
    </PageContainer>
  );
};

export default ReviewPage;
