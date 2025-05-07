import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

// Pages
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import ExamPage from './pages/ExamPage';
import ExamResultsPage from './pages/ExamResultsPage';
// About page removed as requested

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f9fafb;
    color: #333;
    line-height: 1.5;
  }
  
  /* Add padding only to pages with fixed headers, not for exam pages */
  .with-header {
    padding-top: 80px;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  button, input, select, textarea {
    font-family: inherit;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  /* Make sure the app takes full width */
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
  }
  
  /* Container for main content */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Page container class for consistent spacing */
  .page-container {
    margin-top: 0;
    padding-top: 0;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* User Routes - No longer protected */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/exam/:examId" element={<ExamPage />} />
        <Route path="/exam-results" element={<ExamResultsPage />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
