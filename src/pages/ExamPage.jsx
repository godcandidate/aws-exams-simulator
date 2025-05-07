import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';

const ExamLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

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
  padding: 1rem;
  
  @media (max-width: 576px) {
    padding: 0.5rem;
  }
`;

const ExamHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
`;

const ExamTitle = styled.h1`
  font-size: 1.8rem;
  color: #333;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #0066cc;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const QuestionCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  
  @media (max-width: 992px) {
    flex-direction: column;
    padding: 1.5rem;
  }
  
  @media (max-width: 576px) {
    padding: 1rem;
    border-radius: 8px;
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const QuestionNumber = styled.span`
  font-size: 1.1rem;
  color: #495057;
  font-weight: 500;
  
  @media (max-width: 576px) {
    font-size: 0.9rem;
  }
`;

const QuestionText = styled.h2`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const QuestionContainer = styled.div`
  flex: 1;
  padding-right: 2rem;
  border-right: 1px solid #e9ecef;
  
  @media (max-width: 992px) {
    padding-right: 0;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-right: none;
    border-bottom: 1px solid #e9ecef;
  }
`;

const OptionsContainer = styled.div`
  flex: 1;
  padding-left: 2rem;
  
  @media (max-width: 992px) {
    padding-left: 0;
  }
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1.2rem;
  border: 1px solid ${props => {
    if (props.isSelected && props.isCorrect) return '#28a745';
    if (props.isSelected && !props.isCorrect) return '#dc3545';
    if (props.isCorrect && props.showAnswer) return '#28a745';
    return '#dee2e6';
  }};
  background-color: ${props => {
    if (props.isSelected && props.isCorrect) return 'rgba(40, 167, 69, 0.1)';
    if (props.isSelected && !props.isCorrect) return 'rgba(220, 53, 69, 0.1)';
    if (props.isCorrect && props.showAnswer) return 'rgba(40, 167, 69, 0.1)';
    return 'white';
  }};
  border-radius: 8px;
  cursor: ${props => props.showAnswer ? 'default' : 'pointer'};
  transition: all 0.2s ease;
  margin-bottom: 1rem;
  width: 100%;
  
  &:hover {
    background-color: ${props => props.showAnswer ? '' : '#f8f9fa'};
    transform: ${props => props.showAnswer ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.showAnswer ? 'none' : '0 4px 8px rgba(0, 0, 0, 0.05)'};
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: flex-start;
  width: 100%;
  cursor: ${props => props.showAnswer ? 'default' : 'pointer'};
`;

const OptionText = styled.span`
  font-size: 1.1rem;
  margin-left: 1rem;
  line-height: 1.6;
  display: block;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ExplanationSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border-left: 4px solid ${props => props.isCorrect ? '#28a745' : '#dc3545'};
`;

const ExplanationTitle = styled.h3`
  font-size: 1.2rem;
  color: ${props => props.isCorrect ? '#28a745' : '#dc3545'};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const ExplanationText = styled.p`
  color: #495057;
  line-height: 1.6;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
  
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

import { questions } from '../data/questions';

// Define exams using the imported questions from data directory
const exams = [
  {
    id: 1,
    title: 'AWS Core Services',
    description: 'Practice questions covering fundamental AWS services like EC2, S3, RDS, and more.',
    questions: questions.slice(0, 10) // First 10 questions
  },
  {
    id: 2,
    title: 'AWS Security',
    description: 'Security-focused questions about IAM, encryption, compliance, and best practices.',
    questions: questions.slice(10, 20) // Next 10 questions
  },
  {
    id: 3,
    title: 'AWS Networking',
    description: 'Test your knowledge of VPC, subnets, security groups, and other networking concepts.',
    questions: questions.slice(20) // Remaining questions
  }
];

const ExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    // Find the exam by ID
    const foundExam = exams.find(e => e.id === parseInt(examId));
    
    if (foundExam) {
      setExam(foundExam);
      setUserAnswers(new Array(foundExam.questions.length).fill(undefined));
    } else {
      // Redirect if exam not found
      navigate('/dashboard');
    }
    
    setLoading(false);
  }, [examId, navigate]);
  
  if (loading || !exam) {
    return <div>Loading...</div>;
  }
  
  const currentQuestion = exam.questions[currentQuestionIndex];
  const totalQuestions = exam.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const handleSelectOption = (optionId) => {
    if (showAnswer) return;
    
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionId;
    setUserAnswers(newAnswers);
    
    // Show the answer immediately
    setShowAnswer(true);
    
    // Update score if answer is correct
    if (optionId === currentQuestion.correctAnswer) {
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

  return (
    <Layout>
      <ExamLayout>
        <ExamContainer>
          <ExamHeader>
            <QuestionNumber>Question {currentQuestionIndex + 1} of {totalQuestions}</QuestionNumber>
          </ExamHeader>
          
          <ProgressBar>
            <ProgressFill progress={progress} />
          </ProgressBar>
          
          <QuestionCard>
            <QuestionContainer>
              <QuestionText>{currentQuestion.question}</QuestionText>
            </QuestionContainer>
            
            <OptionsContainer>
              <OptionsList>
                {currentQuestion.options.map((option) => {
                  const isSelected = userAnswers[currentQuestionIndex] === option.id;
                  const isCorrect = option.id === currentQuestion.correctAnswer;
                  
                  return (
                    <OptionItem 
                      key={option.id}
                      isSelected={isSelected}
                      isCorrect={isCorrect}
                      showAnswer={showAnswer}
                      onClick={() => handleSelectOption(option.id)}
                    >
                      <OptionLabel showAnswer={showAnswer}>
                        <OptionText>
                          {option.id.toUpperCase()}. {option.text}
                        </OptionText>
                      </OptionLabel>
                    </OptionItem>
                  );
                })}
              </OptionsList>
              
              {showAnswer && (
                <ExplanationSection isCorrect={userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer}>
                  <ExplanationTitle isCorrect={userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer}>
                    {userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer 
                      ? '✓ Correct!' 
                      : '✗ Incorrect!'}
                  </ExplanationTitle>
                  <ExplanationText>{currentQuestion.explanation}</ExplanationText>
                </ExplanationSection>
              )}
            </OptionsContainer>
            

          </QuestionCard>
          
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
    </Layout>
  );
};

export default ExamPage;
