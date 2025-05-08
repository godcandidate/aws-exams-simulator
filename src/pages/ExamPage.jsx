import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/Button';

const QuestionSidebar = styled.div`
  width: 280px;
  background-color: #f8f9fa;
  padding: 2rem 1rem;
  border-right: 1px solid #e9ecef;
  
  @media (max-width: 992px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e9ecef;
    padding: 1rem;
  }
`;

const ExamContainer = styled.div`
  flex: 1;
  width: 100%;
  max-width: 100%;
  padding: 0;
  scroll-behavior: smooth;
  
  @media (max-width: 576px) {
    padding: 0;
  }
`;

const ExamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

// Exit button in the top-right corner
const ExitButton = styled.button`
  background-color: transparent;
  color: #333;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f0f0f0;
  }
  
  &::before {
    content: '\2190'; /* Left arrow */
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`;

const ExamTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  font-weight: 700;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: #e9ecef;
  margin-bottom: 1.5rem;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #0066cc 0%, #0088ff 100%);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const QuestionCard = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  padding: 3rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 400px;
  
  @media (max-width: 992px) {
    flex-direction: column;
    padding: 2rem;
    min-height: auto;
  }
  
  @media (max-width: 576px) {
    padding: 1.5rem;
    border-radius: 12px;
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const QuestionText = styled.h2`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 2rem;
  line-height: 1.7;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
`;

const QuestionContainer = styled.div`
  flex: 1;
  padding-right: 3rem;
  border-right: 1px solid #e9ecef;
  
  @media (max-width: 992px) {
    padding-right: 0;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-right: none;
    border-bottom: 1px solid #e9ecef;
  }
`;

const OptionsContainer = styled.div`
  flex: 1;
  padding-left: 3rem;
  
  @media (max-width: 992px) {
    padding-left: 0;
  }
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2.5rem;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1.5rem;
  border: 2px solid ${props => {
    // Only show correct/incorrect colors when showing the answer
    if (props.showAnswer) {
      if (props.isSelected && props.isCorrect) return '#28a745';
      if (props.isSelected && !props.isCorrect) return '#dc3545';
      if (props.isCorrect) return '#28a745';
      return '#e9ecef';
    }
    // When not showing answer, just highlight selected items
    return props.isSelected ? '#0066cc' : '#e9ecef';
  }};
  background-color: ${props => {
    // Only show correct/incorrect colors when showing the answer
    if (props.showAnswer) {
      if (props.isSelected && props.isCorrect) return 'rgba(40, 167, 69, 0.1)';
      if (props.isSelected && !props.isCorrect) return 'rgba(220, 53, 69, 0.1)';
      if (props.isCorrect) return 'rgba(40, 167, 69, 0.1)';
      return 'white';
    }
    // When not showing answer, just highlight selected items
    return props.isSelected ? 'rgba(0, 102, 204, 0.1)' : 'white';
  }};
  border-radius: 12px;
  cursor: ${props => props.showAnswer ? 'default' : 'pointer'};
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  width: 100%;
  box-shadow: ${props => {
    if (props.isSelected) return '0 5px 15px rgba(0, 0, 0, 0.05)';
    return 'none';
  }};
  
  &:hover {
    background-color: ${props => props.showAnswer ? '' : '#f8f9fa'};
    transform: ${props => props.showAnswer ? 'none' : 'translateY(-3px)'};
    box-shadow: ${props => props.showAnswer ? 'none' : '0 8px 15px rgba(0, 0, 0, 0.1)'};
  }
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: flex-start;
  width: 100%;
  cursor: ${props => props.showAnswer ? 'default' : 'pointer'};
`;

const OptionText = styled.span`
  font-size: 1.2rem;
  margin-left: 1rem;
  line-height: 1.6;
  display: block;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ExplanationSection = styled.div`
  background-color: ${props => props.isCorrect ? 'rgba(40, 167, 69, 0.05)' : 'rgba(220, 53, 69, 0.05)'};
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
  border-left: 5px solid ${props => props.isCorrect ? '#28a745' : '#dc3545'};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
`;

const ExplanationTitle = styled.h3`
  font-size: 1.4rem;
  color: ${props => props.isCorrect ? '#28a745' : '#dc3545'};
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '${props => props.isCorrect ? '✓' : '✗'}';
    margin-right: 0.8rem;
    font-size: 1.5rem;
  }
`;

const ExplanationText = styled.p`
  color: #555;
  line-height: 1.8;
  font-size: 1.1rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  gap: 1.5rem;
`;

const SidebarTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 600;
  
  @media (max-width: 992px) {
    margin-bottom: 1rem;
  }
`;

const QuestionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const QuestionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => {
    if (props.active) return '#0066cc';
    if (props.answered && props.correct) return '#28a745';
    if (props.answered && !props.correct) return '#dc3545';
    return '#f8f9fa';
  }};
  color: ${props => props.active || props.answered ? 'white' : '#333'};
  border: 1px solid ${props => {
    if (props.active) return '#0066cc';
    if (props.answered && props.correct) return '#28a745';
    if (props.answered && !props.correct) return '#dc3545';
    return '#dee2e6';
  }};
  
  &:hover {
    transform: ${props => props.active ? 'none' : 'scale(1.05)'};
    box-shadow: ${props => props.active ? 'none' : '0 2px 5px rgba(0, 0, 0, 0.1)'};
  }
`;

const ExamInfo = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const ExamInfoItem = styled.div`
  margin-bottom: 1rem;
  
  h4 {
    font-size: 0.9rem;
    color: #6c757d;
    margin-bottom: 0.3rem;
  }
  
  p {
    font-size: 1rem;
    color: #333;
  }
`;

const SidebarItem = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e9ecef;
  }
  
  &.active {
    background-color: #0066cc;
    color: white;
  }
  
  p {
    font-size: 1rem;
    color: #333;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Checkbox = styled.input`
  margin-right: 1rem;
  width: 20px;
  height: 20px;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`;

const RadioButton = styled.input`
  margin-right: 1rem;
  width: 20px;
  height: 20px;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`;

const MultipleChoiceNotice = styled.div`
  background-color: rgba(0, 102, 204, 0.1);
  color: #0066cc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  
  &::before {
    content: '\2139';  /* Info icon */
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const CorrectAnswersDisplay = styled.div`
  background-color: rgba(40, 167, 69, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0 1.5rem;
`;

const CorrectAnswersTitle = styled.h4`
  font-size: 1.1rem;
  color: #28a745;
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const CorrectAnswersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CorrectAnswerItem = styled.span`
  background-color: #28a745;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.9rem;
`;

// Modal components for exit confirmation
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  text-align: center;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ModalText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #555;
  line-height: 1.5;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const CancelButton = styled.button`
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #dee2e6;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const ConfirmButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #c82333;
  }
`;

// No need for mock data as we'll load directly from JSON files

const ExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showExitModal, setShowExitModal] = useState(false);
  
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        // Fetch the exam data from the corresponding JSON file based on examId
        const response = await import(`../data/${examId}.json`);
        const examData = response.default || response;
        
        // Create an exam object with the fetched data
        const foundExam = {
          id: parseInt(examId),
          questions: examData
        };
        
        setExam(foundExam);
        setUserAnswers(new Array(examData.length).fill(undefined));
        
        // Initialize selectedOptions with empty arrays for each question
        const initialSelectedOptions = {};
        examData.forEach((_, index) => {
          initialSelectedOptions[index] = [];
        });
        setSelectedOptions(initialSelectedOptions);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exam data:', error);
        navigate('/dashboard');
      }
    };
    
    fetchExamData();
  }, [examId, navigate]);
  
  if (loading || !exam) {
    return <div>Loading...</div>;
  }
  
  const currentQuestion = exam.questions[currentQuestionIndex];
  const totalQuestions = exam.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const isMultipleChoice = (question) => {
    return Array.isArray(question.correctAnswer) && question.correctAnswer.length > 1;
  };

  const handleSelectOption = (optionId) => {
    if (showAnswer) return;
    
    const isMultipleChoiceQuestion = isMultipleChoice(currentQuestion);
    
    if (isMultipleChoiceQuestion) {
      // Handle multiple choice question (checkboxes)
      const currentSelected = [...selectedOptions[currentQuestionIndex]];
      
      // Toggle selection
      if (currentSelected.includes(optionId)) {
        // Remove if already selected
        const updatedSelection = currentSelected.filter(id => id !== optionId);
        setSelectedOptions({
          ...selectedOptions,
          [currentQuestionIndex]: updatedSelection
        });
      } else {
        // Add if not already selected
        const updatedSelection = [...currentSelected, optionId];
        setSelectedOptions({
          ...selectedOptions,
          [currentQuestionIndex]: updatedSelection
        });
      }
    } else {
      // Handle single choice question (radio buttons)
      // Set the selected option directly and show answer
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = optionId;
      setUserAnswers(newAnswers);
      
      // For single choice, we also update selectedOptions for consistency
      setSelectedOptions({
        ...selectedOptions,
        [currentQuestionIndex]: [optionId]
      });
      
      // Show the answer immediately for single choice questions
      setShowAnswer(true);
      
      // Update score if answer is correct for single choice
      const correctAnswer = currentQuestion.correctAnswer;
      const isCorrect = optionId === correctAnswer;
      
      if (isCorrect) {
        setScore(score + 1);
      }
    }
  };
  
  // Function to submit multiple choice answers
  const handleSubmitMultipleChoice = () => {
    if (showAnswer) return;
    
    const currentSelected = selectedOptions[currentQuestionIndex] || [];
    const correctAnswers = currentQuestion.correctAnswer;
    
    // Check if the selected options match the correct answers
    const isCorrect = 
      // Same number of selections as correct answers
      currentSelected.length === correctAnswers.length && 
      // All selected options are in the correct answers
      currentSelected.every(option => correctAnswers.includes(option)) &&
      // All correct answers are in the selected options
      correctAnswers.every(option => currentSelected.includes(option));
    
    // Store the answer
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = currentSelected;
    setUserAnswers(newAnswers);
    
    // Show the answer
    setShowAnswer(true);
    
    // Update score if all selections are correct
    if (isCorrect) {
      setScore(score + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    } else {
      // Navigate to results page when all questions are answered
      navigate('/exam-results', { 
        state: { 
          examId: exam.id,
          examTitle: exam.title,
          userAnswers, 
          questions: exam.questions,
          score,
          totalQuestions
        } 
      });
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswer(true); // Show answer for previously answered questions
    }
  };
  
  // Navigation functions for moving between questions

  // Add a custom exit handler to the component
  const handleExitExam = () => {
    setShowExitModal(true);
  };
  
  // Handle confirm exit
  const handleConfirmExit = () => {
    setShowExitModal(false);
    navigate('/dashboard');
  };
  
  // Handle cancel exit
  const handleCancelExit = () => {
    setShowExitModal(false);
  };
  
  // Define the missing styled components
  const ExamLayout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f8f9fa;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    overflow-y: auto;
  `;

  const TwoColumnLayout = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 1rem;
    padding: 0 2rem;
    
    @media (max-width: 992px) {
      flex-direction: column;
      padding: 0 1rem;
    }
  `;

  const QuestionColumn = styled.div`
    flex: 1;
    padding-right: 2rem;
    
    @media (max-width: 992px) {
      padding-right: 0;
      padding-bottom: 2rem;
      margin-bottom: 2rem;
      border-bottom: 1px solid #e9ecef;
    }
  `;

  const OptionsColumn = styled.div`
    flex: 1;
    
    @media (max-width: 992px) {
      width: 100%;
    }
  `;

  const QuestionNumber = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
  `;

  return (
    <ExamLayout>
      {showExitModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Exit Exam?</ModalTitle>
            <ModalText>
              Are you sure you want to exit this exam? Your progress will not be saved.
            </ModalText>
            <ModalButtons>
              <CancelButton onClick={handleCancelExit}>
                Continue Exam
              </CancelButton>
              <ConfirmButton onClick={handleConfirmExit}>
                Exit to Dashboard
              </ConfirmButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
      <ExamContainer>
        <ExamHeader>
          <QuestionNumber>Question {currentQuestionIndex + 1} of {totalQuestions}</QuestionNumber>
          <ExitButton onClick={handleExitExam}>Exit to Dashboard</ExitButton>
        </ExamHeader>
        
        <ProgressBar style={{ margin: 0 }}>
          <ProgressFill progress={progress} />
        </ProgressBar>
        
        <TwoColumnLayout>
          {/* Left Column - Question */}
          <QuestionColumn>
            <QuestionText>{currentQuestion.question}</QuestionText>
          </QuestionColumn>
          
          {/* Right Column - Options */}
          <OptionsColumn>
            {isMultipleChoice(currentQuestion) && !showAnswer && (
              <MultipleChoiceNotice>
                This question has multiple correct answers. Select all that apply.
              </MultipleChoiceNotice>
            )}
            
            <OptionsList>
              {currentQuestion.options.map((option) => {
                const optionId = option.id;
                const isMultipleChoiceQuestion = isMultipleChoice(currentQuestion);
                
                // For multiple choice, check if this option is in the selected options array
                const isSelected = isMultipleChoiceQuestion
                  ? (selectedOptions[currentQuestionIndex] || []).includes(optionId)
                  : userAnswers[currentQuestionIndex] === optionId;
                                 
                const isCorrect = Array.isArray(currentQuestion.correctAnswer)
                  ? currentQuestion.correctAnswer.includes(optionId)
                  : currentQuestion.correctAnswer === optionId;
                
                return (
                  <OptionItem 
                    key={optionId}
                    isSelected={isSelected}
                    isCorrect={isCorrect}
                    showAnswer={showAnswer}
                    onClick={() => handleSelectOption(optionId)}
                  >
                    <OptionLabel showAnswer={showAnswer}>
                      {isMultipleChoiceQuestion ? (
                        <CheckboxContainer>
                          <Checkbox 
                            type="checkbox" 
                            checked={isSelected}
                            disabled={showAnswer}
                            onChange={() => handleSelectOption(optionId)}
                          />
                          <OptionText>{option.text}</OptionText>
                        </CheckboxContainer>
                      ) : (
                        <RadioContainer>
                          <RadioButton 
                            type="radio" 
                            checked={isSelected}
                            disabled={showAnswer}
                            onChange={() => handleSelectOption(optionId)}
                          />
                          <OptionText>{option.text}</OptionText>
                        </RadioContainer>
                      )}
                    </OptionLabel>
                  </OptionItem>
                );
              })}
            </OptionsList>
            
            {/* Submit button for multiple choice questions */}
            {isMultipleChoice(currentQuestion) && !showAnswer && (
              <SubmitButtonContainer>
                <Button onClick={handleSubmitMultipleChoice}>
                  Submit Answers
                </Button>
              </SubmitButtonContainer>
            )}
            
            {showAnswer && (
              <ExplanationSection isCorrect={
                isMultipleChoice(currentQuestion)
                  ? // For multiple choice, check if arrays match exactly
                    JSON.stringify(userAnswers[currentQuestionIndex].sort()) === JSON.stringify(currentQuestion.correctAnswer.sort())
                  : // For single choice, simple equality check
                    userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer
              }>
                <ExplanationTitle isCorrect={
                  isMultipleChoice(currentQuestion)
                    ? // For multiple choice, check if arrays match exactly
                      JSON.stringify(userAnswers[currentQuestionIndex].sort()) === JSON.stringify(currentQuestion.correctAnswer.sort())
                    : // For single choice, simple equality check
                      userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer
                }>
                  {isMultipleChoice(currentQuestion)
                    ? (JSON.stringify(userAnswers[currentQuestionIndex].sort()) === JSON.stringify(currentQuestion.correctAnswer.sort())
                        ? '✓ Correct!' 
                        : '✗ Incorrect!')
                    : (userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer
                        ? '✓ Correct!' 
                        : '✗ Incorrect!')}
                </ExplanationTitle>
                
                {isMultipleChoice(currentQuestion) && (
                  <CorrectAnswersDisplay>
                    <CorrectAnswersTitle>Correct answers:</CorrectAnswersTitle>
                    <CorrectAnswersList>
                      {currentQuestion.correctAnswer.map(answer => (
                        <CorrectAnswerItem key={answer}>
                          {answer.toUpperCase()}
                        </CorrectAnswerItem>
                      ))}
                    </CorrectAnswersList>
                  </CorrectAnswersDisplay>
                )}
                
                <ExplanationText>{currentQuestion.explanation}</ExplanationText>
              </ExplanationSection>
            )}
          </OptionsColumn>
        </TwoColumnLayout>
        
        <NavigationButtons>
          <Button 
            className="secondary" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          {showAnswer && (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Exam'}
            </Button>
          )}
        </NavigationButtons>
        </ExamContainer>
    </ExamLayout>
  );
};

export default ExamPage;
