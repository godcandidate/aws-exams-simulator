import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
`;

const AboutHeader = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const AboutSection = styled.div`
  margin-bottom: 2rem;
`;

const AboutTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const AboutText = styled.p`
  font-size: 1rem;
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const AboutPage = () => {
  return (
    <PageContainer className="page-container">
      <Header />
      <AboutContainer>
        <AboutHeader>About AWS Exams Simulator</AboutHeader>
        
        <AboutSection>
          <AboutTitle>Our Mission</AboutTitle>
          <AboutText>
            AWS Exams Simulator is designed to help you prepare for AWS certification exams through realistic practice questions and detailed explanations. Our goal is to make your certification journey smoother and more successful.
          </AboutText>
        </AboutSection>
        
        <AboutSection>
          <AboutTitle>How It Works</AboutTitle>
          <AboutText>
            Our simulator provides a collection of practice questions similar to those you'll encounter in actual AWS certification exams. Each question comes with detailed explanations to help you understand the concepts better.
          </AboutText>
          <AboutText>
            Take practice exams, review your answers, and learn from the explanations to improve your knowledge and increase your chances of passing the certification exam.
          </AboutText>
        </AboutSection>
        
        <AboutSection>
          <AboutTitle>Features</AboutTitle>
          <ul>
            <li>Realistic exam questions similar to AWS certification exams</li>
            <li>Detailed explanations for each answer</li>
            <li>Score tracking to monitor your progress</li>
            <li>Review mode to analyze your answers</li>
            <li>Clean and intuitive user interface</li>
          </ul>
        </AboutSection>
      </AboutContainer>
      <Footer />
    </PageContainer>
  );
};

export default AboutPage;
