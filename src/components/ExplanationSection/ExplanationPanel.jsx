import styled from 'styled-components';
import Button from '../common/Button';

const ExplanationContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ExplanationHeader = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const CorrectIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #28a745;
  color: white;
  margin-right: 0.5rem;
  font-size: 0.875rem;
`;

const IncorrectIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #dc3545;
  color: white;
  margin-right: 0.5rem;
  font-size: 0.875rem;
`;

const AnswerStatus = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  background-color: ${props => props.isCorrect ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)'};
`;

const AnswerText = styled.p`
  margin: 0;
  color: ${props => props.isCorrect ? '#28a745' : '#dc3545'};
  font-weight: 500;
`;

const ExplanationText = styled.div`
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const ExplanationPanel = ({ 
  question, 
  selectedAnswer, 
  onNextQuestion, 
  currentIndex,
  totalQuestions,
  onFinish,
  onReview
}) => {
  const isCorrect = selectedAnswer === question.correctAnswer;
  const correctOption = question.options.find(option => option.id === question.correctAnswer);
  
  return (
    <ExplanationContainer>
      <ExplanationHeader>
        {isCorrect ? (
          <CorrectIcon>✓</CorrectIcon>
        ) : (
          <IncorrectIcon>✗</IncorrectIcon>
        )}
        Question {currentIndex + 1} Explanation
      </ExplanationHeader>
      
      <AnswerStatus isCorrect={isCorrect}>
        <AnswerText isCorrect={isCorrect}>
          {isCorrect 
            ? 'Correct! You selected the right answer.' 
            : `Incorrect. The correct answer is: ${question.correctAnswer}. ${correctOption.text}`}
        </AnswerText>
      </AnswerStatus>
      
      <ExplanationText>
        <h4>Explanation:</h4>
        <p>{question.explanation}</p>
      </ExplanationText>
      
      <NavigationButtons>
        <Button className="secondary" onClick={onReview}>
          Review All Questions
        </Button>
        
        {currentIndex < totalQuestions - 1 ? (
          <Button onClick={onNextQuestion}>
            Next Question
          </Button>
        ) : (
          <Button onClick={onFinish}>
            Finish Exam
          </Button>
        )}
      </NavigationButtons>
    </ExplanationContainer>
  );
};

export default ExplanationPanel;
