import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import QuestionDisplay from '../components/TestPage/QuestionDisplay';
import ExplanationPanel from '../components/ExplanationSection/ExplanationPanel';
import { questions } from '../data/questions';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const TestContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  flex: 1;
`;

const TestPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [showExplanation, setShowExplanation] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);

  const handleAnswerSelect = (answerId) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerId;
    setUserAnswers(newAnswers);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      handleSubmitExam();
    }
  };

  const handleSubmitExam = () => {
    setExamSubmitted(true);
    setShowExplanation(true);
  };

  const handleFinishExam = () => {
    navigate('/results', { 
      state: { 
        userAnswers, 
        questions 
      } 
    });
  };

  const handleReviewAll = () => {
    navigate('/review', { 
      state: { 
        userAnswers, 
        questions 
      } 
    });
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <PageContainer>
      <Header />
      <TestContainer>
        {!showExplanation ? (
          <QuestionDisplay
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onPrevious={handlePreviousQuestion}
            onNext={handleNextQuestion}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={selectedAnswer}
            onSubmit={handleSubmitExam}
            isLastQuestion={isLastQuestion}
          />
        ) : (
          <ExplanationPanel
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onNextQuestion={handleNextQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onFinish={handleFinishExam}
            onReview={handleReviewAll}
          />
        )}
      </TestContainer>
      <Footer />
    </PageContainer>
  );
};

export default TestPage;
