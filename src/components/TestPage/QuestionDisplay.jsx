import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const QuestionContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const QuestionNumber = styled.span`
  font-size: 1rem;
  color: #6c757d;
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &.selected {
    border-color: #0066cc;
    background-color: rgba(0, 102, 204, 0.05);
  }
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const OptionInput = styled.input`
  margin-right: 1rem;
`;

const OptionText = styled.span`
  font-size: 1rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const QuestionDisplay = ({ 
  question, 
  currentIndex, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onAnswerSelect, 
  selectedAnswer,
  onSubmit,
  isLastQuestion
}) => {
  return (
    <QuestionContainer>
      <QuestionHeader>
        <QuestionNumber>Question {currentIndex + 1} of {totalQuestions}</QuestionNumber>
      </QuestionHeader>
      
      <QuestionText>{question.question}</QuestionText>
      
      <OptionsList>
        {question.options.map((option) => (
          <OptionItem 
            key={option.id} 
            className={selectedAnswer === option.id ? 'selected' : ''}
          >
            <OptionLabel>
              <OptionInput 
                type="radio" 
                name={`question-${question.id}`} 
                value={option.id}
                checked={selectedAnswer === option.id}
                onChange={() => onAnswerSelect(option.id)}
              />
              <OptionText>{option.id}. {option.text}</OptionText>
            </OptionLabel>
          </OptionItem>
        ))}
      </OptionsList>
      
      <NavigationButtons>
        <Button 
          className="secondary" 
          onClick={onPrevious} 
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        
        {isLastQuestion ? (
          <Button 
            onClick={onSubmit} 
            disabled={!selectedAnswer}
          >
            Submit Exam
          </Button>
        ) : (
          <Button 
            onClick={onNext} 
            disabled={!selectedAnswer}
          >
            Next
          </Button>
        )}
      </NavigationButtons>
    </QuestionContainer>
  );
};

export default QuestionDisplay;
