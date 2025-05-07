import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  background-color: #f8f9fa;
  min-height: 70vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #6c757d;
  max-width: 600px;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Hero = () => {
  const navigate = useNavigate();
  
  const handleStartExam = () => {
    navigate('/test');
  };
  
  return (
    <HeroContainer>
      <Title>Practice AWS Certification Exams</Title>
      <Subtitle>
        Prepare for your AWS certification with our practice exams. Test your knowledge and get detailed explanations for each question.
      </Subtitle>
      <Button onClick={handleStartExam}>Start Practice Exam</Button>
    </HeroContainer>
  );
};

export default Hero;
