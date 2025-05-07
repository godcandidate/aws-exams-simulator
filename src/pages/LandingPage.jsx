import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Hero from '../components/LandingPage/Hero';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LandingPage = () => {
  return (
    <PageContainer>
      <Header />
      <Hero />
      <Footer />
    </PageContainer>
  );
};

export default LandingPage;
