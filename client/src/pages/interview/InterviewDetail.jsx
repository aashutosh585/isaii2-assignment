import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  UserCircleIcon,
  Bars3Icon,
  CodeBracketIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PencilSquareIcon,
  PlayIcon,
  FolderIcon
} from '@heroicons/react/24/outline'

const InterviewDetail = () => {
  const { interviewId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Topics Required')

  const tabs = ['Topics Required', 'Past Questions', 'Candidate Tips']

  // Mock data based on the image
  const interviewData = {
    candidate: {
      name: 'Alex Johnson',
      email: 'alex.j@email.com'
    },
    interview: {
      title: 'Google - SDE 1',
      date: 'Interview on 24 Aug, 2024',
      package: '$150,000 / year',
      description: 'Complete your Placement Assessment Questionnaire (PAQ) for tailored tips.'
    },
    topics: [
      {
        id: 1,
        name: 'Data Structures & Algorithms',
        type: 'Core',
        completed: false
      },
      {
        id: 2,
        name: 'System Design',
        type: 'Core',
        completed: false
      },
      {
        id: 3,
        name: 'Behavioral Questions',
        type: 'Important',
        completed: true
      },
      {
        id: 4,
        name: 'Object-Oriented Design',
        type: 'Core',
        completed: false
      }
    ]
  }

  const sidebarItems = [
    { icon: Bars3Icon, label: 'Dashboard', active: false },
    { icon: ClipboardDocumentListIcon, label: 'Interviews', active: true },
    { icon: CodeBracketIcon, label: 'Practice', active: false },
    { icon: PencilSquareIcon, label: 'My Notes', active: false },
    { icon: FolderIcon, label: 'Resume Manager', active: false },
    { icon: UserIcon, label: 'Profile', active: false }
  ]

  const handleNavigation = (label) => {
    switch (label) {
      case 'Dashboard':
        navigate('/app/dashboard')
        break
      case 'Interviews':
        navigate('/app/interviews')
        break
      case 'Practice':
        navigate('/app/practice')
        break
      case 'My Notes':
        navigate('/app/my-notes')
        break
      case 'Resume Manager':
        navigate('/app/resume-manager')
        break
      case 'Profile':
        navigate('/app/profile')
        break
      case 'Settings':
        // Handle settings
        break
      case 'Log Out':
        localStorage.removeItem('token')
        navigate('/login')
        break
      default:
        break
    }
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-56 bg-gray-800 border-r border-gray-700">
        {/* User Profile */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-600">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face&auto=format"
                alt="Alex Johnson"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-sm truncate">{interviewData.candidate.name}</h3>
              <p className="text-xs text-gray-400 truncate">{interviewData.candidate.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-3">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={index}
                onClick={() => handleNavigation(item.label)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors mb-1 text-sm ${
                  item.active 
                    ? 'bg-gray-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="font-medium truncate">{item.label}</span>
              </button>
            )
          })}
        </nav>
        
        {/* Bottom Navigation */}
        <div className="mt-auto p-3 border-t border-gray-700">
          <button
            onClick={() => handleNavigation('Settings')}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors mb-1 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Cog6ToothIcon className="h-4 w-4 shrink-0" />
            <span className="font-medium truncate">Settings</span>
          </button>
          <button
            onClick={() => handleNavigation('Log Out')}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4 shrink-0" />
            <span className="font-medium truncate">Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with Profile and Breadcrumb */}
        <div className="bg-gray-800 px-6 py-3 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format"
                  alt="Alex Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm">Alex Johnson</h3>
                <p className="text-xs text-gray-400">alex.j@email.com</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            All Interviews / <span className="text-white">Google SDE-1 Interview</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto">
            {/* Interview Header */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-6">
                {/* Company Logo */}
                <div className="w-24 h-32 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">Google</div>
                    <div className="text-xs text-gray-400">Company</div>
                  </div>
                </div>

                {/* Interview Details */}
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">{interviewData.interview.date}</div>
                  <h1 className="text-3xl font-bold text-white mb-2">{interviewData.interview.title}</h1>
                  <div className="text-lg text-gray-300 mb-4">{interviewData.interview.package}</div>
                  
                  {/* PAQ Banner */}
                  <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 mb-6">
                    <p className="text-blue-200">{interviewData.interview.description}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button className="flex items-center px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                      Start Full Mock
                    </button>
                    <button className="flex items-center px-6 py-3 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition-colors">
                      Practice Rounds
                    </button>
                    <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 mb-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Topics Content */}
            {activeTab === 'Topics Required' && (
              <div className="space-y-4">
                {interviewData.topics.map((topic) => (
                  <div 
                    key={topic.id} 
                    className="bg-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={topic.completed}
                          className="h-5 w-5 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{topic.name}</h3>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        topic.type === 'Core' 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-blue-900 text-blue-300'
                      }`}>
                        {topic.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Past Questions Content */}
            {activeTab === 'Past Questions' && (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-white mb-4">Past Interview Questions</h3>
                <p className="text-gray-400 mb-6">Review commonly asked questions for this position</p>
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  View Questions
                </button>
              </div>
            )}

            {/* Candidate Tips Content */}
            {activeTab === 'Candidate Tips' && (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-white mb-4">Candidate Tips</h3>
                <p className="text-gray-400 mb-6">Get personalized tips from successful candidates</p>
                <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  View Tips
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterviewDetail