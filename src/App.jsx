import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import LandingPage from './pages/LandingPage';
import TestPage from './pages/TestPage';
import ResultsPage from './pages/ResultsPage';
import ReviewPage from './pages/ReviewPage';
import AboutPage from './pages/AboutPage';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f8f9fa;
    color: #333;
    line-height: 1.5;
  }
  
  ul, ol {
    list-style-position: inside;
    margin-bottom: 1rem;
    padding-left: 1rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
