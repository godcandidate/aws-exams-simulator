import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  flex: 1;
`;

const WelcomeSection = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const WelcomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const WelcomeTitle = styled.h1`
  font-size: 1.8rem;
  color: #333;
`;

const AdminTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  padding: 1rem 1.5rem;
  background: ${props => props.active ? 'white' : 'transparent'};
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#0066cc' : 'transparent'};
  color: ${props => props.active ? '#0066cc' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    color: #0066cc;
  }
`;

const ContentSection = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const TableTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  border-bottom: 2px solid #ddd;
  color: #555;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  color: #666;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #0066cc;
  cursor: pointer;
  margin-right: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

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
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const OptionInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-right: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const RadioInput = styled.input`
  margin-right: 0.5rem;
`;

// Mock exam data
const mockExams = [
  {
    id: 1,
    title: 'AWS Core Services',
    description: 'Practice questions covering fundamental AWS services like EC2, S3, RDS, and more.',
    questions: 20,
    timeLimit: 30,
    difficulty: 'Beginner'
  },
  {
    id: 2,
    title: 'AWS Networking',
    description: 'Test your knowledge of VPC, subnets, security groups, and other networking concepts.',
    questions: 15,
    timeLimit: 25,
    difficulty: 'Intermediate'
  },
  {
    id: 3,
    title: 'AWS Security',
    description: 'Security-focused questions about IAM, encryption, compliance, and best practices.',
    questions: 25,
    timeLimit: 40,
    difficulty: 'Advanced'
  },
  {
    id: 4,
    title: 'AWS Database Services',
    description: 'Questions about RDS, DynamoDB, Aurora, Redshift, and other database offerings.',
    questions: 18,
    timeLimit: 30,
    difficulty: 'Intermediate'
  }
];

// Mock questions data
const mockQuestions = [
  {
    id: 1,
    examId: 1,
    question: "Which AWS service is used for storing objects?",
    options: [
      { id: "a", text: "Amazon EC2" },
      { id: "b", text: "Amazon S3" },
      { id: "c", text: "Amazon RDS" },
      { id: "d", text: "Amazon VPC" }
    ],
    correctAnswer: "b",
    explanation: "Amazon S3 (Simple Storage Service) is an object storage service that offers industry-leading scalability, data availability, security, and performance."
  },
  {
    id: 2,
    examId: 1,
    question: "Which AWS service is used for running virtual servers in the cloud?",
    options: [
      { id: "a", text: "Amazon EC2" },
      { id: "b", text: "Amazon S3" },
      { id: "c", text: "Amazon DynamoDB" },
      { id: "d", text: "Amazon CloudFront" }
    ],
    correctAnswer: "a",
    explanation: "Amazon EC2 (Elastic Compute Cloud) provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers."
  },
  {
    id: 3,
    examId: 2,
    question: "Which AWS service provides a virtual network dedicated to your AWS account?",
    options: [
      { id: "a", text: "Amazon Route 53" },
      { id: "b", text: "Amazon VPC" },
      { id: "c", text: "AWS Direct Connect" },
      { id: "d", text: "Amazon CloudFront" }
    ],
    correctAnswer: "b",
    explanation: "Amazon VPC (Virtual Private Cloud) lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define."
  }
];

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('exams');
  const [exams, setExams] = useState(mockExams);
  const [questions, setQuestions] = useState(mockQuestions);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  // Form state for new/edit exam
  const [examForm, setExamForm] = useState({
    title: '',
    description: '',
    difficulty: 'Beginner',
    timeLimit: 30
  });
  
  // Form state for new/edit question
  const [questionForm, setQuestionForm] = useState({
    examId: '',
    question: '',
    options: [
      { id: 'a', text: '' },
      { id: 'b', text: '' },
      { id: 'c', text: '' },
      { id: 'd', text: '' }
    ],
    correctAnswer: 'a',
    explanation: ''
  });
  
  const handleAddExam = () => {
    setCurrentExam(null);
    setExamForm({
      title: '',
      description: '',
      difficulty: 'Beginner',
      timeLimit: 30
    });
    setShowExamModal(true);
  };
  
  const handleEditExam = (exam) => {
    setCurrentExam(exam);
    setExamForm({
      title: exam.title,
      description: exam.description,
      difficulty: exam.difficulty,
      timeLimit: exam.timeLimit
    });
    setShowExamModal(true);
  };
  
  const handleSaveExam = () => {
    if (currentExam) {
      // Edit existing exam
      const updatedExams = exams.map(exam => 
        exam.id === currentExam.id ? { ...exam, ...examForm } : exam
      );
      setExams(updatedExams);
    } else {
      // Add new exam
      const newExam = {
        id: exams.length + 1,
        ...examForm,
        questions: 0
      };
      setExams([...exams, newExam]);
    }
    setShowExamModal(false);
  };
  
  const handleAddQuestion = () => {
    setCurrentQuestion(null);
    setQuestionForm({
      examId: exams[0]?.id || '',
      question: '',
      options: [
        { id: 'a', text: '' },
        { id: 'b', text: '' },
        { id: 'c', text: '' },
        { id: 'd', text: '' }
      ],
      correctAnswer: 'a',
      explanation: ''
    });
    setShowQuestionModal(true);
  };
  
  const handleEditQuestion = (question) => {
    setCurrentQuestion(question);
    setQuestionForm({
      examId: question.examId,
      question: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation
    });
    setShowQuestionModal(true);
  };
  
  const handleSaveQuestion = () => {
    if (currentQuestion) {
      // Edit existing question
      const updatedQuestions = questions.map(question => 
        question.id === currentQuestion.id ? { ...question, ...questionForm } : question
      );
      setQuestions(updatedQuestions);
    } else {
      // Add new question
      const newQuestion = {
        id: questions.length + 1,
        ...questionForm
      };
      setQuestions([...questions, newQuestion]);
      
      // Update the question count for the exam
      const updatedExams = exams.map(exam => 
        exam.id === parseInt(questionForm.examId) 
          ? { ...exam, questions: exam.questions + 1 } 
          : exam
      );
      setExams(updatedExams);
    }
    setShowQuestionModal(false);
  };
  
  const handleExamFormChange = (e) => {
    const { name, value } = e.target;
    setExamForm({
      ...examForm,
      [name]: value
    });
  };
  
  const handleQuestionFormChange = (e) => {
    const { name, value } = e.target;
    setQuestionForm({
      ...questionForm,
      [name]: value
    });
  };
  
  const handleOptionChange = (index, value) => {
    const newOptions = [...questionForm.options];
    newOptions[index].text = value;
    setQuestionForm({
      ...questionForm,
      options: newOptions
    });
  };
  
  return (
    <PageContainer className="page-container">
      <Header />
      <DashboardContainer>
        <WelcomeSection>
          <WelcomeHeader>
            <WelcomeTitle>Admin Dashboard</WelcomeTitle>
          </WelcomeHeader>
          <p>Welcome, {currentUser?.name}! Here you can manage exams and questions for the AWS Exams Simulator.</p>
        </WelcomeSection>
        
        <AdminTabs>
          <TabButton 
            active={activeTab === 'exams'} 
            onClick={() => setActiveTab('exams')}
          >
            Manage Exams
          </TabButton>
          <TabButton 
            active={activeTab === 'questions'} 
            onClick={() => setActiveTab('questions')}
          >
            Manage Questions
          </TabButton>
        </AdminTabs>
        
        <ContentSection>
          {activeTab === 'exams' ? (
            <>
              <TableHeader>
                <TableTitle>Exams</TableTitle>
                <Button onClick={handleAddExam}>Add New Exam</Button>
              </TableHeader>
              
              <Table>
                <thead>
                  <tr>
                    <Th>Title</Th>
                    <Th>Difficulty</Th>
                    <Th>Questions</Th>
                    <Th>Time Limit</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {exams.map((exam) => (
                    <tr key={exam.id}>
                      <Td>{exam.title}</Td>
                      <Td>{exam.difficulty}</Td>
                      <Td>{exam.questions}</Td>
                      <Td>{exam.timeLimit} min</Td>
                      <Td>
                        <ActionButton onClick={() => handleEditExam(exam)}>Edit</ActionButton>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <>
              <TableHeader>
                <TableTitle>Questions</TableTitle>
                <Button onClick={handleAddQuestion}>Add New Question</Button>
              </TableHeader>
              
              <Table>
                <thead>
                  <tr>
                    <Th>Question</Th>
                    <Th>Exam</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question) => (
                    <tr key={question.id}>
                      <Td>{question.question}</Td>
                      <Td>
                        {exams.find(exam => exam.id === question.examId)?.title || 'Unknown'}
                      </Td>
                      <Td>
                        <ActionButton onClick={() => handleEditQuestion(question)}>Edit</ActionButton>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </ContentSection>
      </DashboardContainer>
      <Footer />
      
      {/* Exam Modal */}
      {showExamModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{currentExam ? 'Edit Exam' : 'Add New Exam'}</ModalTitle>
              <CloseButton onClick={() => setShowExamModal(false)}>&times;</CloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label htmlFor="title">Exam Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={examForm.title}
                onChange={handleExamFormChange}
                placeholder="Enter exam title"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={examForm.description}
                onChange={handleExamFormChange}
                placeholder="Enter exam description"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select
                id="difficulty"
                name="difficulty"
                value={examForm.difficulty}
                onChange={handleExamFormChange}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Input
                type="number"
                id="timeLimit"
                name="timeLimit"
                value={examForm.timeLimit}
                onChange={handleExamFormChange}
                min="1"
              />
            </FormGroup>
            
            <Button onClick={handleSaveExam}>Save Exam</Button>
          </ModalContent>
        </ModalOverlay>
      )}
      
      {/* Question Modal */}
      {showQuestionModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{currentQuestion ? 'Edit Question' : 'Add New Question'}</ModalTitle>
              <CloseButton onClick={() => setShowQuestionModal(false)}>&times;</CloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label htmlFor="examId">Select Exam</Label>
              <Select
                id="examId"
                name="examId"
                value={questionForm.examId}
                onChange={handleQuestionFormChange}
              >
                {exams.map(exam => (
                  <option key={exam.id} value={exam.id}>{exam.title}</option>
                ))}
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="question">Question</Label>
              <Textarea
                id="question"
                name="question"
                value={questionForm.question}
                onChange={handleQuestionFormChange}
                placeholder="Enter the question"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Answer Options</Label>
              {questionForm.options.map((option, index) => (
                <OptionContainer key={option.id}>
                  <RadioInput
                    type="radio"
                    id={`option-${option.id}`}
                    name="correctAnswer"
                    value={option.id}
                    checked={questionForm.correctAnswer === option.id}
                    onChange={handleQuestionFormChange}
                  />
                  <Label htmlFor={`option-${option.id}`}>{option.id.toUpperCase()}.</Label>
                  <OptionInput
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${option.id.toUpperCase()}`}
                  />
                </OptionContainer>
              ))}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="explanation">Explanation</Label>
              <Textarea
                id="explanation"
                name="explanation"
                value={questionForm.explanation}
                onChange={handleQuestionFormChange}
                placeholder="Explain why the correct answer is right"
              />
            </FormGroup>
            
            <Button onClick={handleSaveQuestion}>Save Question</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default AdminDashboard;
