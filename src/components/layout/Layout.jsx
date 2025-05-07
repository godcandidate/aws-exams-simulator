import React from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import Footer from '../common/Footer';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const ContentWrapper = styled.main`
  flex: 1;
  margin-top: 60px; /* Reduced margin to bring content closer to navbar */
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <ContentWrapper>
        {children}
      </ContentWrapper>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
