import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Dashboard from './pages/dashboard/Dashboard'
import Interviews from './pages/interview/Interviews'
import InterviewDetail from './pages/interview/InterviewDetail'
import AIInterview from './pages/interview/AIInterview'
import Practice from './pages/Practice'
import TestInterface from './pages/TestInterface'
import TestResults from './pages/TestResults'
import Resume from './pages/resume/Resume'
import ResumeManager from './pages/resume/ResumeManager'
import ResumeEditor from './pages/resume/ResumeEditor'
import Curriculum from './pages/Curriculum'
import Profile from './pages/profile/Profile'
import MyNotes from './pages/profile/MyNotes'
import CoverLetters from './pages/CoverLetters'
import Analytics from './pages/profile/Analytics'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#374151',
                color: '#fff',
                border: '1px solid #4b5563'
              }
            }}
          />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* AI Interview Route (Full Screen) */}
            <Route path="/interview/:interviewId" element={
              <ProtectedRoute>
                <AIInterview />
              </ProtectedRoute>
            } />
            
            {/* Interview Detail Route (With Sidebar) */}
            <Route path="/interview-detail/:interviewId" element={
              <ProtectedRoute>
                <InterviewDetail />
              </ProtectedRoute>
            } />
            
            {/* Protected Routes */}
            <Route path="/app" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="interviews" element={<Interviews />} />
              <Route path="interview/:interviewId" element={<AIInterview />} />
              <Route path="practice" element={<Practice />} />
              <Route path="test/:type/:difficulty" element={<TestInterface />} />
              <Route path="results/:testId" element={<TestResults />} />
              <Route path="resume" element={<Resume />} />
              <Route path="resume-manager" element={<ResumeManager />} />
              <Route path="resume-editor" element={<ResumeEditor />} />
              <Route path="curriculum" element={<Curriculum />} />
              <Route path="profile" element={<Profile />} />
              <Route path="my-notes" element={<MyNotes />} />
              <Route path="cover-letters" element={<CoverLetters />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="ai-assistant" element={<Resume />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
